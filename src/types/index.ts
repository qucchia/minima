export type Hover =  { message: number };

export enum ConnectionStatus {
  CONNECTING,
  OPEN,
  ERROR,
  CLOSED,
};

export type User = {
  username: string;
  id: number;
  profilePicture?: string;
  status: UserStatus;
};

export interface APIMessage {
  content?: string;
  image?: string;
  authorId: number;
  id: number;
}

export class Message implements APIMessage {
  content?: string;
  image?: string;
  authorId: number;
  id: number;
  sent: boolean;
  
  constructor({
    content,
    image,
    authorId,
    id,
    sent = true
  }: APIMessage & { sent: boolean }) {
    this.content = content;
    this.image = image;
    this.authorId = authorId;
    this.id = id;
    this.sent = sent;
  }

  export(): APIMessage {
    return {
      content: this.content,
      image: this.image,
      authorId: this.authorId,
      id: this.id,
    };
  }
}


export enum UserStatus {
  ONLINE,
  OFFLINE,
  IDLE,
  DO_NOT_DISTURB,
}

export type ClientMessage =
  | { type: "message", message: APIMessage }
  | { type: "fetch", after: number }
  | { type: "fetch", before: number }
  | { type: "fetch", last: true }
  | { type: "fetch", after: number, before: number }
  | { type: "delete", deleteType: "message", id: number }
  | { type: "user", user: User };

export type ServerMessage = {
  type: "messages",
  messages: APIMessage[],
  start: boolean,
} | {
  type: "users",
  users: User[]
};