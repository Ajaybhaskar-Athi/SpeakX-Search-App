const mongoose = require('mongoose');

// Define a schema for blocks (used in ANAGRAM)
const blockSchema = new mongoose.Schema({
  text: String,
  showInOption: Boolean,
  isAnswer: Boolean,
});

// Define a schema for options (used in MCQ)
const optionSchema = new mongoose.Schema({
  text: String,
  isCorrectAnswer: Boolean,
});

// Define the main question schema
const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['MCQ', 'READ_ALONG', 'ANAGRAM','CONTENT_ONLY','CONVERSATION'],
  },
  title: { type: String, required: true },
  blocks: [blockSchema], // Used for ANAGRAM
  options: [optionSchema], // Used for MCQ
  anagramType: { type: String, enum: ['WORD', 'SENTENCE'] }, // Only for ANAGRAM
  siblingId: { type: String, ref: 'Question' },
  solution: String, // Solution for ANAGRAM
  _id: String, //mongoose.Schema.Types.ObjectId
});

// Create a model
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
