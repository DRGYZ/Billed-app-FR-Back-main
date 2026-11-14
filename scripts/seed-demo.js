const { copyFile, mkdir } = require('fs/promises');
const { join } = require('path');
const { uploadDirectory } = require('../config/uploads');
const { User, Bill, sequelize } = require('../models');
const { hash } = require('../services/password');

const demoUsers = [
  {
    name: 'Administration démo', type: 'Admin', email: 'admin@test.tld', password: 'admin',
  },
  {
    name: 'Employé démo', type: 'Employee', email: 'employee@test.tld', password: 'employee',
  },
];

const receiptName = 'justificatif-demo.jpg';
const demoBills = [
  {
    key: 'demo-train', name: 'Train pour Lyon', type: 'Transports', date: '2025-05-12', amount: 49, status: 'pending',
  },
  {
    key: 'demo-lunch', name: 'Déjeuner client', type: 'Restaurants et bars', date: '2025-05-07', amount: 28, status: 'accepted',
  },
];

async function seedDemo() {
  await mkdir(uploadDirectory, { recursive: true });
  await copyFile(join(__dirname, '..', 'tests', 'fixture-cat.jpg'), join(uploadDirectory, receiptName));

  await sequelize.transaction(async (transaction) => {
    const accounts = await Promise.all(demoUsers.map(async ({ password, ...user }) => {
      const existing = await User.findOne({ where: { email: user.email }, transaction });
      if (existing) return existing;
      return User.create({ ...user, status: 'disconnected', password: await hash(password) }, { transaction });
    }));
    const employee = accounts.find((account) => account.type === 'Employee');
    const existingBills = await Bill.findAll({
      attributes: ['key'],
      where: { key: demoBills.map((bill) => bill.key) },
      transaction,
    });
    const existingKeys = new Set(existingBills.map((bill) => bill.key));
    await Bill.bulkCreate(demoBills
      .filter((bill) => !existingKeys.has(bill.key))
      .map((bill) => ({
        ...bill,
        email: employee.email,
        pct: 20,
        fileName: receiptName,
        filePath: `public/${receiptName}`,
      })), { transaction });
  });
}

seedDemo()
  .catch((error) => {
    process.stderr.write(`Demo seed failed: ${error.message}\n`);
    process.exitCode = 1;
  })
  .finally(() => sequelize.close());
