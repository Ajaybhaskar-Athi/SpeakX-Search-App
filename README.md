# Project Documentation

## Project Overview
This project demonstrates the implementation of a full-stack application with authentication and question management using gRPC and MongoDB. It covers:

- Backend: Authentication and question services using gRPC.
- Frontend: gRPC-Web client integration to communicate with the backend.
- Database: MongoDB for storing user data and questions.

---

## Features

### Backend
1. **Data Insertion**:
   - Inserted 1,00,000 question documents into MongoDB.
   - Created a scalable backend architecture using gRPC.

2. **Protobuf Definitions**:
   - **Auth.proto**: Handles user authentication.
   - **Questions.proto**: Manages questions with pagination and insertion functionalities.

3. **Authentication**:
   - Register and login features using hashed passwords.
   - JWT token generation for secure session handling.

4. **Questions Management**:
   - Supports CRUD operations for questions.
   - Pagination for efficient data retrieval.

5. **gRPC Clients**:
   - Implemented gRPC clients for handling authentication and question-related operations.
   - Used protobuf-generated files for message structure and service definitions.

---

### Frontend
1. **gRPC-Web Integration**:
   - Leveraged `grpc-web` to connect the frontend with the gRPC backend.
   - Protobuf files generated for `auth.proto` and `questions.proto` included.

2. **Authentication Flow**:
   - Login and registration integrated with backend gRPC services.
   - Protected routes ensure only authenticated users can access the main page.

3. **Questions Interface**:
   - Fetch and display paginated questions from MongoDB.
   - Search and filter questions with dynamic queries.

---

## Technical Highlights

- **Backend**:
  - Node.js with gRPC for scalable microservices.
  - MongoDB for high-performance document storage.

- **Frontend**:
  - React with `grpc-web` for seamless gRPC communication.

- **gRPC Protobuf**:
  - `Auth.proto` for user authentication.
  - `Questions.proto` for questions handling.

- **Tooling**:
  - Protobuf generation using:
    ```
    protoc -I=backend --js_out=import_style=es6:frontend/src/grpc --grpc-web_out=import_style=typescript,mode=grpcwebtext:frontend/src/grpc backend/auth.proto
    protoc -I=backend --js_out=import_style=es6:frontend/src/grpc --grpc-web_out=import_style=typescript,mode=grpcwebtext:frontend/src/grpc backend/questions.proto
    ```

- **gRPC Web Proxy**:
  - Used `grpcwebproxy` to enable gRPC communication from browser to backend:
    ```
    grpcwebproxy.exe --backend_addr=localhost:50052 --run_tls_server=false --server_bind_address=localhost --server_http_debug_port=8081
    ```

---

## Prerequisites

- **Tools Required**:
  - Node.js
  - MongoDB
  - Protocol Buffers (`protoc` compiler)
  - gRPC-Web Proxy

- **Setup Commands**:
  - Install dependencies:
    ```
    npm install
    ```
  - Run gRPC-Web proxy server:
    ```
    grpcwebproxy.exe --backend_addr=localhost:50052 --run_tls_server=false --server_bind_address=localhost --server_http_debug_port=8081
    ```

---

## Setup Instructions

### Backend
1. Install dependencies:
   ```
   npm install
   ```
2. Start the server:
   ```
   node server.js
   ```

### Frontend
1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm start
   ```

---

## Usage

1. Run the MongoDB server.
2. Start the backend server.
3. Run the gRPC-Web Proxy.
4. Launch the frontend application and access the features:
   - Register/Login.
   - View, search, and manage questions.

---

## Future Enhancements

- Implement advanced filtering and sorting for questions.
- Add more detailed analytics and metrics on user activity.
- Enhance security features with OAuth and multi-factor authentication.

---

### Acknowledgments

Special thanks to all contributors and the open-source community for supporting this project.

