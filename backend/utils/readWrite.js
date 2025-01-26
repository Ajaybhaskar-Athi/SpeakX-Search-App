const fs = require('fs');

const convertObjectIdsToString = (data) => {
  if (Array.isArray(data)) {
    return data.map(convertObjectIdsToString); 
  } else if (typeof data === 'object' && data !== null) {
    for (const key in data) {
      if (data[key] && data[key].$oid) {
        data[key] = data[key].$oid;
      } else {
        data[key] = convertObjectIdsToString(data[key]);
      }
    }
  }
  return data;
};

fs.readFile('questions.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    const questionsData = JSON.parse(data);
    const convertedData = convertObjectIdsToString(questionsData);
    fs.writeFile('questions_transformed.json', JSON.stringify(convertedData, null, 2), (err) => {
      if (err) {
        console.error('Error writing the file:', err);
      } else {
        console.log('Data successfully copied & saved as questions_transformed.json');
      }
    });
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});
