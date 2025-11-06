const path = require('path');
const fs = require('fs');
const { readHealthData, healthMetricsCounter } = require('../src/healthReader');

const TEST_JSON_FILE = path.join(__dirname, 'test-health.json');
const testJsonData = JSON.stringify([
  { date: '2024-01-01', sleep: 7 },
  { date: '2024-01-02', sleep: 6 }
]);

beforeAll(() => {
  fs.writeFileSync(TEST_JSON_FILE, testJsonData);
});

afterAll(() => {
  fs.unlinkSync(TEST_JSON_FILE);
});

test('reads and counts JSON health data', async () => {
  const data = await readHealthData(TEST_JSON_FILE);
  expect(Array.isArray(data)).toBe(true);
  const count = await healthMetricsCounter(TEST_JSON_FILE);
  expect(count).toBe(2);
});
