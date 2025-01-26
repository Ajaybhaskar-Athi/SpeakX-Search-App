// Import the JSON file directly
const questions = require('./questions_transformed.json');

// Loop through the data and display based on types
// questions.forEach((question) => {
//   console.log(`Title: ${question.title}`);
//   console.log(`Type: ${question.type}`);

//   if (question.type === 'ANAGRAM') {
//     console.log(`Anagram Type: ${question.anagramType}`);
//     if (question.blocks) {
//       console.log('Blocks:');
//       question.blocks.forEach((block) => {
//         console.log(`- Text: ${block.text}`);
//       });
//     }
//   } else if (question.type === 'MCQ') {
//     console.log('Options:');
//     question.options.forEach((option) => {
//       console.log(`- ${option.text} (Correct: ${option.isCorrectAnswer})`);
//     });
//   } else if (question.type === 'READ_ALONG') {
//     console.log('Read Along type question.');
//   }

//   console.log('Sibling ID:', question.siblingId?.$oid || 'N/A');
//   console.log('----------------------------------');
// });


console.log(questions.length);

// const User = require('../models/User.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const fun=async()=>{
    const plainPassword = 'examplePassword';

const hashedPassword = await bcrypt.hash(plainPassword, 10);
console.log(hashedPassword);
const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
console.log('Match:', isMatch); // Should print true
}
fun();