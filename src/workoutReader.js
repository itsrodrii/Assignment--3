const fs = require('fs');
const csv = require('csv-parser');

async function readWorkoutData(filepath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filepath)
      .pipe(csv())
      .on('data', (row) => results.push(row))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

async function workoutCalculator(filepath) {
  try {
    const data = await readWorkoutData(filepath);
    const totalWorkouts = data.length;
    let totalMinutes = 0;
    for (let i = 0; i < data.length; i++) {
      totalMinutes += parseFloat(data[i].minutes);
    }
    console.log('Total workouts:', totalWorkouts);
    console.log('Total minutes:', totalMinutes);
    return { totalWorkouts, totalMinutes };
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('❌ CSV file not found, check the file path');
    } else {
      console.log('❌ Error processing CSV file:', error.message);
    }
    return null;
  }
}

module.exports = { readWorkoutData, workoutCalculator };
