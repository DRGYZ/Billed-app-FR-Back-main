const app = require('./app');

app.listen(5678, '127.0.0.1', () => {
  // eslint-disable-next-line no-console
  console.log('Billed API listening on http://localhost:5678');
});
