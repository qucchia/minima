import { APIMessage, User } from "../types/index";
import Message from "./Message";
import ProfilePicture from "./ProfilePicture";

export default function MessageGroup({ messages, author }: {
  messages: APIMessage[];
  author: User;
}) {
  return (
    <div className="message-group">
      <ProfilePicture image={author.profilePicture} />
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