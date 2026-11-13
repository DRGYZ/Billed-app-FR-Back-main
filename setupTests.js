const { mkdtempSync, rmSync } = require("fs");
const { tmpdir } = require("os");
const { join } = require("path");
const fixtures = require("./tests/fixtures");

const uploadDirectory = mkdtempSync(join(tmpdir(), "billed-test-"));
process.env.BILLED_UPLOAD_DIR = uploadDirectory;

beforeEach(async () => {
  await fixtures.reset();
});

afterAll(() => {
  rmSync(uploadDirectory, { recursive: true, force: true });
  delete process.env.BILLED_UPLOAD_DIR;
});
