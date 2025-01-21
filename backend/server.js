

const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const mongoose = require("mongoose");
const { register, login } = require('./controllers/auth.controller.js');

require("dotenv").config();

const Question = require("./models/questions"); // Import the model

const PROTO_PATH = "./questions.proto";
const AUTH_PROTO_PATH = "./auth.proto";

const questionPackageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const authPackageDefinition = protoLoader.loadSync(AUTH_PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const questionsProto = grpc.loadPackageDefinition(questionPackageDefinition).QuestionService;
const authProto = grpc.loadPackageDefinition(authPackageDefinition).AuthService;
// console.log(authProto);
// MongoDB connection
const mongoURI = process.env.SpeakXDB2; // or MongoDB URI string
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// gRPC server methods
async function searchQuestions(call, callback) {
  const { query, page = 1, pageSize = 10 } = call.request;
  try {
    const filter = query ? { title: { $regex: query, $options: "i" } } : {};
    const questions = await Question.find(filter)
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    const totalQuestions = await Question.countDocuments(filter);

    const formattedQuestions = questions.map((q) => ({
      type: q.type,
      title: q.title,
      solution: q.solution,
      blocks: q.blocks,
      options: q.options,
      anagramType: q.anagramType,
      siblingId: q.siblingId ? q.siblingId.toString() : null,
    }));

    console.log("Searched Results Size: ",totalQuestions);
    callback(null, {
      questions: formattedQuestions,
      totalQuestions,
    });
  } catch (err) {
    callback(err);
  }
}

// Insert questions
async function insertQuestions(call, callback) {
  const questions = call.request.questions;
  console.log("Incoming questions:", JSON.stringify(questions, null, 2));

  if (questions && questions.length > 0) {
    try {
      const formattedQuestions = questions.map((q) => ({
        _id: new mongoose.Types.ObjectId(), // Auto-generate ObjectId
        type: q.type,
        title: q.title,
        solution: q.solution || "",
        blocks: q.blocks || [],
        options: q.options || [],
        anagramType: q.anagramType || null,
        siblingId: q.siblingId || null,
      }));
      console.log("Formatted Questions:", JSON.stringify(formattedQuestions, null, 2));

      const result = await Question.insertMany(formattedQuestions);

      if (result && result.length > 0) {
        callback(null, { message: "Questions inserted successfully" });
      } else {
        console.log("No questions inserted.");
        callback(null, { message: "No questions inserted" });
      }
    } catch (err) {
      console.error("Error inserting questions:", err);
      callback(err);
    }
  } else {
    console.log("No questions received.");
    callback(null, { message: "No questions to insert" });
  }
}

// Start the gRPC server with increased message size limits
const server = new grpc.Server({
  "grpc.max_send_message_length": 1024 * 1024 * 100, // 100 MB
  "grpc.max_receive_message_length": 1024 * 1024 * 100, // 100 MB
});

server.addService(questionsProto.QuestionService.service, {
  insertQuestions,
  searchQuestions
});
server.addService(authProto.service, { Register: register, Login: login });
// Bind the server to port and start
const PORT = process.env.GRPC_PORT || "50052";
server.bindAsync(
  `0.0.0.0:${PORT}`,
  grpc.ServerCredentials.createInsecure(),
  (err, bindPort) => {
    if (err) {
      console.error("Failed to start gRPC server:", err);
      return;
    }
    console.log(`gRPC server running on port ${bindPort}`);
    server.start(); // Start the server after binding to the port
  }
);
