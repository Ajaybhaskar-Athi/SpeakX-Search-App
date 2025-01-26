import { QuestionServiceClient } from './grpc/QuestionsServiceClientPb';  // Import generated client
// import { GetQuestionsRequest } from './grpc/questions_pb';  // Import request class
// import { SearchQuestionsRequest } from './grpc/questions_pb';  
import * as grpcWeb from 'grpc-web';
import { SearchQuestionsRequest, SearchQuestionsResponse } from './grpc/questions_pb';


const client = new QuestionServiceClient('http://localhost:8081'); // gRPC-Web server URL

export const getQuestions = (query = '', page = 1, pageSize = 10) => {
    return new Promise((resolve, reject) => {
      const request = new SearchQuestionsRequest();
      request.setQuery(query);
      request.setPage(page);
      request.setPageSize(pageSize);
  
      client.searchQuestions(request, {}, (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      });
    });
  };

