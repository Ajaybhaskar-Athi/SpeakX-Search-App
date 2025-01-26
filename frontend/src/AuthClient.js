import { AuthServiceClient } from './grpc/AuthServiceClientPb';

import { LoginRequest, RegisterRequest } from './grpc/auth_pb.js';

// import { AuthServiceClient } from './grpc/auth_grpc_web_pb';
// import { LoginRequest, RegisterRequest } from './grpc/auth_pb';




const client = new AuthServiceClient('http://localhost:8081', null, null);

export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    const request = new LoginRequest();
    request.setEmail(email);
    request.setPassword(password);

    client.login(request, {}, (err, response) => {
      if (err) {
        reject(err.message);
      } else {
        resolve({
          token: response.getToken(),
          message: response.getMessage(),
        });
      }
    });
  });
};

export const register = async (name, email, password) => {
  return new Promise((resolve, reject) => {
    const request = new RegisterRequest();
    request.setName(name);
    request.setEmail(email);
    request.setPassword(password);

    client.register(request, {}, (err, response) => {
      if (err) {
        reject(err.message);
      } else {
        resolve(response.getMessage());
      }
    });
  });
};
