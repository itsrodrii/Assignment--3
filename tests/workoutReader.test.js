// Test your workoutReader.js module here
const path = require('path');
const fs = require('fs');
const { readWorkoutData, workoutCalculator } = require('../src/workoutReader');

const TEST_CSV_FILE = path.join(__dirname, 'test-workouts.csv');
const testCsvData = `date,minutes,type
2024-01-01,45,Running
2024-01-02,30,Yoga`;

beforeAll(() => {
  fs.writeFileSync(TEST_CSV_FILE, testCsvData);
});

afterAll(() => {
  fs.unlinkSync(TEST_CSV_FILE);
});

test('reads and calculates workout data', async () => {
  const result = await workoutCalculator(TEST_CSV_FILE);
  expect(result.totalWorkouts).toBe(2);
  expect(result.totalMinutes).toBe(75);
});
