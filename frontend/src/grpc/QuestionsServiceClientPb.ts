/**
 * @fileoverview gRPC-Web generated client stub for QuestionService
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v5.29.3
// source: questions.proto


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as questions_pb from './questions_pb'; // proto import: "questions.proto"


export class QuestionServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname.replace(/\/+$/, '');
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorsearchQuestions = new grpcWeb.MethodDescriptor(
    '/QuestionService.QuestionService/searchQuestions',
    grpcWeb.MethodType.UNARY,
    questions_pb.SearchQuestionsRequest,
    questions_pb.SearchQuestionsResponse,
    (request: questions_pb.SearchQuestionsRequest) => {
      return request.serializeBinary();
    },
    // questions_pb.SearchQuestionsResponse.deserializeBinary
  );

  searchQuestions(
    request: questions_pb.SearchQuestionsRequest,
    metadata?: grpcWeb.Metadata | null): Promise<questions_pb.SearchQuestionsResponse>;

  searchQuestions(
    request: questions_pb.SearchQuestionsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: questions_pb.SearchQuestionsResponse) => void): grpcWeb.ClientReadableStream<questions_pb.SearchQuestionsResponse>;

  searchQuestions(
    request: questions_pb.SearchQuestionsRequest,
    metadata?: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: questions_pb.SearchQuestionsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/QuestionService.QuestionService/searchQuestions',
        request,
        metadata || {},
        this.methodDescriptorsearchQuestions,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/QuestionService.QuestionService/searchQuestions',
    request,
    metadata || {},
    this.methodDescriptorsearchQuestions);
  }

  methodDescriptorinsertQuestions = new grpcWeb.MethodDescriptor(
    '/QuestionService.QuestionService/insertQuestions',
    grpcWeb.MethodType.UNARY,
    questions_pb.InsertQuestionsRequest,
    questions_pb.InsertQuestionsResponse,
    (request: questions_pb.InsertQuestionsRequest) => {
      return request.serializeBinary();
    },
    // questions_pb.InsertQuestionsResponse.deserializeBinary
  );

  insertQuestions(
    request: questions_pb.InsertQuestionsRequest,
    metadata?: grpcWeb.Metadata | null): Promise<questions_pb.InsertQuestionsResponse>;

  insertQuestions(
    request: questions_pb.InsertQuestionsRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: questions_pb.InsertQuestionsResponse) => void): grpcWeb.ClientReadableStream<questions_pb.InsertQuestionsResponse>;

  insertQuestions(
    request: questions_pb.InsertQuestionsRequest,
    metadata?: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: questions_pb.InsertQuestionsResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/QuestionService.QuestionService/insertQuestions',
        request,
        metadata || {},
        this.methodDescriptorinsertQuestions,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/QuestionService.QuestionService/insertQuestions',
    request,
    metadata || {},
    this.methodDescriptorinsertQuestions);
  }

}

