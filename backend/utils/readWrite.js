const fs = require('fs');

// Function to recursively convert ObjectId to string
const convertObjectIdsToString = (data) => {
  if (Array.isArray(data)) {
    return data.map(convertObjectIdsToString); // If it's an array, recurse over its elements
  } else if (typeof data === 'object' && data !== null) {
    // If it's an object, iterate over its keys
    for (const key in data) {
      if (data[key] && data[key].$oid) {
        // If the key is an ObjectId (has the $oid property), convert to string
        data[key] = data[key].$oid;
      } else {
        // Otherwise, recurse into the value
        data[key] = convertObjectIdsToString(data[key]);
      }
    }
  }
  return data;
};

// Read the JSON data from 'questions.json'
fs.readFile('questions.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  try {
    // Parse the JSON data
    const questionsData = JSON.parse(data);

    // Convert all ObjectId fields to strings
    const convertedData = convertObjectIdsToString(questionsData);

    // Write the converted data to a new file 'questions_transformed.json'
    fs.writeFile('questions_transformed.json', JSON.stringify(convertedData, null, 2), (err) => {
      if (err) {
        console.error('Error writing the file:', err);
      } else {
        console.log('Data successfully transformed and saved to questions_transformed.json');
      }
    });
  } catch (parseError) {
    console.error('Error parsing JSON:', parseError);
  }
});
