const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file
const fs = require('fs');
const Question = require("../models/questions");// Require the Question model

// Get MongoDB URI from the environment variables
const dbUri = process.env.SpeakXDB2;

if (!dbUri) {
  console.error('MongoDB URI is not defined in the environment variables');
  process.exit(1); // Exit the application if URI is not defined
}

// Connect to MongoDB using the URI
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// Function to split array into chunks
function chunkArray(arr, chunkSize) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
}

// Function to insert data in chunks
async function insertChunks(chunks) {
  for (let chunk of chunks) {
    try {
      // Insert the chunk into the database (using Question model's insertMany)
      await Question.insertMany(chunk);
      console.log(`Inserted chunk of size ${chunk.length} successfully`);
    } catch (err) {
      console.error('Error inserting chunk:', err);
    }
  }
}

// Read data from the file
const filePath = 'questions_transformed.json'; // Replace with your file path

fs.readFile(filePath, 'utf8', async (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  let questions = JSON.parse(data); // Assuming the file contains a valid JSON array
  let chunkSize = 1000; // Define your chunk size (feel free to adjust)
  let chunks = chunkArray(questions, chunkSize); // Split data into chunks

  // Start inserting data in chunks
  await insertChunks(chunks);
});
