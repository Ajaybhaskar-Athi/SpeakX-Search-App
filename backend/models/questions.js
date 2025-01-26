const mongoose = require('mongoose');

//schema for blocks ( ANAGRAM)
const blockSchema = new mongoose.Schema({
  text: String,
  showInOption: Boolean,
  isAnswer: Boolean,
});

//  schema for options ( mCQ)
const optionSchema = new mongoose.Schema({
  text: String,
  isCorrectAnswer: Boolean,
});

const questionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['MCQ', 'READ_ALONG', 'ANAGRAM','CONTENT_ONLY','CONVERSATION'],
  },
  title: { type: String, required: true },
  blocks: [blockSchema], 
  options: [optionSchema], 
  anagramType: { type: String, enum: ['WORD', 'SENTENCE'] }, // Only for ANAGRAM
  siblingId: { type: String, ref: 'Question' },
  solution: String, // Solution for ANAGRAM
  _id: String, //mongoose.Schema.Types.ObjectId
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
