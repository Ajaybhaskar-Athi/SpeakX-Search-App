// const grpc = require('@grpc/grpc-js');
// const protoLoader = require('@grpc/proto-loader');
// const PROTO_PATH = './questions.proto';

// const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
//   keepCase: true,
//   longs: String,
//   enums: String,
//   defaults: true,
//   oneofs: true,
// });

// const questionsProto = grpc.loadPackageDefinition(packageDefinition).QuestionService;

// const client = new questionsProto.QuestionService('localhost:50052', grpc.credentials.createInsecure());

// const request = {
//   questions: [
//     {
//       type: 'ANAGRAM',
//       anagramType: 'WORD',
//       blocks: [
//         { text: 'T', showInOption: true, isAnswer: true },
//         { text: 'O', showInOption: true, isAnswer: true },
//         { text: 'Y', showInOption: true, isAnswer: true },
//       ],
//       siblingId: '66555f1a3735a7caf45b6f09',
//       solution: 'TOY',
//       title: 'Rearrange the letters to form a word',
//     },
//   ],
// };

// client.insertQuestions(request, (error, response) => {
//   if (error) {
//     console.error('Error:', error);
//   } else {
//     console.log('Response:', response);
//   }
// });

/*const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const fs = require('fs');
const path = require('path');

const PROTO_PATH = './questions.proto';

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const questionsProto = grpc.loadPackageDefinition(packageDefinition).QuestionService;

 // Create a gRPC client
const client = new questionsProto.QuestionService('localhost:50052', grpc.credentials.createInsecure());

// Read questions.json
const questionsFilePath = path.resolve(__dirname, 'questions_transformed.json');
const questionsData = JSON.parse(fs.readFileSync(questionsFilePath, 'utf-8'));

// Create the gRPC request
const request = {
  questions: questionsData,
};

// Call the gRPC service
client.insertQuestions(request, (error, response) => {
  if (error) {
    console.error('Error:', error);
  } else {
    console.log('Response:', response);
  }
});

*/

/*const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const fs = require("fs");
const path = require("path");

const PROTO_PATH = "./questions.proto";

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const questionsProto =
  grpc.loadPackageDefinition(packageDefinition).QuestionService;

// Create a gRPC client

// const client = new questionsProto.QuestionService(
//   "localhost:50052",
//   grpc.credentials.createInsecure()
// );
const client = new questionsProto.QuestionService(
    "localhost:50052",
    grpc.credentials.createInsecure(),
    {
      "grpc.max_send_message_length": 1024 * 1024 * 10, // 10 MB
      "grpc.max_receive_message_length": 1024 * 1024 * 10, // 10 MB
    }
  );
  

// Read questions.json
const questionsFilePath = path.resolve(__dirname, "questions_transformed.json");
const questionsData = JSON.parse(fs.readFileSync(questionsFilePath, "utf-8"));

// Function to split the array into chunks
function splitArrayIntoChunks(array, chunkCount) {
  const chunkSize = Math.ceil(array.length / chunkCount);
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

// Split the questionsData into 4 parts
const chunks = splitArrayIntoChunks(questionsData, 20);

// Function to send each chunk
function sendChunk(chunk, index) {
  const request = { questions: chunk };
  client.insertQuestions(request, (error, response) => {
    if (error) {
      console.error(`Error in chunk ${index}:`, error);
    } else {
      console.log(`Response for chunk ${index}:`);
    }
  });
}

// Send each chunk
chunks.forEach((chunk, index) => {
  sendChunk(chunk, index + 1);
});
*/

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const fs = require("fs");
const path = require("path");

const PROTO_PATH = "./questions.proto";

// Load the proto file
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const questionsProto = grpc.loadPackageDefinition(packageDefinition).QuestionService;

// Create a gRPC client with increased message size limits
const client = new questionsProto.QuestionService(
  "localhost:50052",
  grpc.credentials.createInsecure(),
  {
    "grpc.max_send_message_length": 1024 * 1024 * 100, // 100 MB
    "grpc.max_receive_message_length": 1024 * 1024 * 100, // 100 MB
  }
);

// Read questions data from the file
const questionsFilePath = path.resolve(__dirname, "questions_transformed.json");
const questionsData = JSON.parse(fs.readFileSync(questionsFilePath, "utf-8"));

// Function to split the array into chunks of a specified size in MB
function splitArrayIntoChunks(array, chunkSizeInMB) {
  const chunkSize = chunkSizeInMB * 1024 * 1024; // Convert MB to bytes
  const chunks = [];
  let currentChunk = [];
  let currentSize = 0;

  array.forEach((item) => {
    const itemSize = Buffer.byteLength(JSON.stringify(item), 'utf8'); // Get size in bytes
    if (currentSize + itemSize > chunkSize) {
      chunks.push(currentChunk);
      currentChunk = [item];
      currentSize = itemSize;
    } else {
      currentChunk.push(item);
      currentSize += itemSize;
    }
  });

  if (currentChunk.length > 0) {
    chunks.push(currentChunk); // Add the remaining items
  }

  return chunks;
}

// Split the questionsData into chunks of 10MB each
const chunks = splitArrayIntoChunks(questionsData, 10);

// Function to send each chunk of questions to the server
function sendChunk(chunk, index) {
  const request = { questions: chunk };
  client.insertQuestions(request, (error, response) => {
    if (error) {
      console.error(`Error in chunk ${index}:`, error);
    } else {
      console.log(`Response for chunk ${index}:`, response.message);
    }
  });
}

// Send each chunk sequentially
// chunks.forEach((chunk, index) => {
//   sendChunk(chunk, index + 1);
// });

