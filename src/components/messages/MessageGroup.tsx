import { APIMessage, User } from "../types/index";
import Message from "./Message";

export default function MessageGroup({ messages, author }: {
  messages: APIMessage[];
  author: User;
}) {
  return (
    <div className="message-group">
      <div className="profile-picture">
      </div>
      <div className="messages">
        {messages.map(
          (message, i) =>
            <Message
              author={author}
              message={message}
              // only show author in first message
              showAuthor={!i}
            />
        )}
      </div>
    </div>
  );
}