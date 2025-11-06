const fs = require('fs').promises;

async function readHealthData(filepath) {
  try {
    const data = await fs.readFile(filepath, 'utf8');
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('❌ JSON file not found, check the file path');
    } else {
      console.log('❌ Error reading JSON file:', error.message);
    }
    throw error;
  }
}

async function healthMetricsCounter(filepath) {
  try {
    const healthData = await readHealthData(filepath);
    const totalEntries = healthData.length;
    console.log('Total health entries:', totalEntries);
    return totalEntries;
  } catch {
    return null;
  }
}

module.exports = { readHealthData, healthMetricsCounter };
