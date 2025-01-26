import * as jspb from 'google-protobuf'
import * as questions_pb from './questions_pb'; // Adjust the path based on your structure



export class SearchQuestionsRequest extends jspb.Message {
  getQuery(): string;
  setQuery(value: string): SearchQuestionsRequest;

  getPage(): number;
  setPage(value: number): SearchQuestionsRequest;

  getPagesize(): number;
  setPagesize(value: number): SearchQuestionsRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchQuestionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SearchQuestionsRequest): SearchQuestionsRequest.AsObject;
  static serializeBinaryToWriter(message: SearchQuestionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchQuestionsRequest;
  static deserializeBinaryFromReader(message: SearchQuestionsRequest, reader: jspb.BinaryReader): SearchQuestionsRequest;
}

export namespace SearchQuestionsRequest {
  export type AsObject = {
    query: string,
    page: number,
    pagesize: number,
  }
}

export class SearchQuestionsResponse extends jspb.Message {
  getQuestionsList(): Array<Question>;
  setQuestionsList(value: Array<Question>): SearchQuestionsResponse;
  clearQuestionsList(): SearchQuestionsResponse;
  addQuestions(value?: Question, index?: number): Question;

  getTotalquestions(): number;
  setTotalquestions(value: number): SearchQuestionsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SearchQuestionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: SearchQuestionsResponse): SearchQuestionsResponse.AsObject;
  static serializeBinaryToWriter(message: SearchQuestionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SearchQuestionsResponse;
  static deserializeBinaryFromReader(message: SearchQuestionsResponse, reader: jspb.BinaryReader): SearchQuestionsResponse;
}

export namespace SearchQuestionsResponse {
  export type AsObject = {
    questionsList: Array<Question.AsObject>,
    totalquestions: number,
  }
}

export class InsertQuestionsRequest extends jspb.Message {
  getQuestionsList(): Array<Question>;
  setQuestionsList(value: Array<Question>): InsertQuestionsRequest;
  clearQuestionsList(): InsertQuestionsRequest;
  addQuestions(value?: Question, index?: number): Question;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InsertQuestionsRequest.AsObject;
  static toObject(includeInstance: boolean, msg: InsertQuestionsRequest): InsertQuestionsRequest.AsObject;
  static serializeBinaryToWriter(message: InsertQuestionsRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InsertQuestionsRequest;
  static deserializeBinaryFromReader(message: InsertQuestionsRequest, reader: jspb.BinaryReader): InsertQuestionsRequest;
}

export namespace InsertQuestionsRequest {
  export type AsObject = {
    questionsList: Array<Question.AsObject>,
  }
}

export class InsertQuestionsResponse extends jspb.Message {
  getMessage(): string;
  setMessage(value: string): InsertQuestionsResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): InsertQuestionsResponse.AsObject;
  static toObject(includeInstance: boolean, msg: InsertQuestionsResponse): InsertQuestionsResponse.AsObject;
  static serializeBinaryToWriter(message: InsertQuestionsResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): InsertQuestionsResponse;
  static deserializeBinaryFromReader(message: InsertQuestionsResponse, reader: jspb.BinaryReader): InsertQuestionsResponse;
}

export namespace InsertQuestionsResponse {
  export type AsObject = {
    message: string,
  }
}

export class Question extends jspb.Message {
  getId(): string;
  setId(value: string): Question;

  getType(): string;
  setType(value: string): Question;

  getAnagramtype(): string;
  setAnagramtype(value: string): Question;

  getBlocksList(): Array<Block>;
  setBlocksList(value: Array<Block>): Question;
  clearBlocksList(): Question;
  addBlocks(value?: Block, index?: number): Block;

  getOptionsList(): Array<Option>;
  setOptionsList(value: Array<Option>): Question;
  clearOptionsList(): Question;
  addOptions(value?: Option, index?: number): Option;

  getSiblingid(): string;
  setSiblingid(value: string): Question;

  getSolution(): string;
  setSolution(value: string): Question;

  getTitle(): string;
  setTitle(value: string): Question;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Question.AsObject;
  static toObject(includeInstance: boolean, msg: Question): Question.AsObject;
  static serializeBinaryToWriter(message: Question, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Question;
  static deserializeBinaryFromReader(message: Question, reader: jspb.BinaryReader): Question;
}

export namespace Question {
  export type AsObject = {
    id: string,
    type: string,
    anagramtype: string,
    blocksList: Array<Block.AsObject>,
    optionsList: Array<Option.AsObject>,
    siblingid: string,
    solution: string,
    title: string,
  }
}

export class Block extends jspb.Message {
  getText(): string;
  setText(value: string): Block;

  getShowinoption(): boolean;
  setShowinoption(value: boolean): Block;

  getIsanswer(): boolean;
  setIsanswer(value: boolean): Block;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Block.AsObject;
  static toObject(includeInstance: boolean, msg: Block): Block.AsObject;
  static serializeBinaryToWriter(message: Block, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Block;
  static deserializeBinaryFromReader(message: Block, reader: jspb.BinaryReader): Block;
}

export namespace Block {
  export type AsObject = {
    text: string,
    showinoption: boolean,
    isanswer: boolean,
  }
}

export class Option extends jspb.Message {
  getText(): string;
  setText(value: string): Option;

  getIscorrectanswer(): boolean;
  setIscorrectanswer(value: boolean): Option;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Option.AsObject;
  static toObject(includeInstance: boolean, msg: Option): Option.AsObject;
  static serializeBinaryToWriter(message: Option, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Option;
  static deserializeBinaryFromReader(message: Option, reader: jspb.BinaryReader): Option;
}

export namespace Option {
  export type AsObject = {
    text: string,
    iscorrectanswer: boolean,
  }
}

