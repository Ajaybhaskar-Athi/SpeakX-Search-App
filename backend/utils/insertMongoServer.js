const mongoose = require('mongoose');
require('dotenv').config(); 
const fs = require('fs');
const Question = require("../models/questions");


const dbUri = process.env.SpeakXDB2;

if (!dbUri) {
  console.error('MongoDB URI is not defined in the environment variables');
  process.exit(1); 
}

mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

// fun for spliting array into chunks

function chunkArray(arr, chunkSize) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
}


async function insertChunks(chunks) {
  for (let chunk of chunks) {
    try {
//this chunk consists more then 1 document
      await Question.insertMany(chunk);
      console.log(`Inserted chunk of size ${chunk.length} successfully`);
    } catch (err) {
      console.error('Error inserting chunk:', err);
    }
  }
}

const filePath = 'questions_transformed.json'; 

fs.readFile(filePath, 'utf8', async (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  let questions = JSON.parse(data); 
  let chunkSize = 1000; 
  let chunks = chunkArray(questions, chunkSize); // Split data into chunks

  // insert data in chunks
  await insertChunks(chunks);
});
