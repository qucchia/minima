import { Message as MessageClass, User } from "../types/index";
import AuthorLine from "./AuthorLine";
import OrgFormat from "../OrgFormat";

export default function Message({
  showAuthor,
  author,
  message,
}: {
  showAuthor: boolean;
  author: User;
  message: MessageClass;
}) {
  return (
    <>
      <span
        className="message"
        style={message.sent ? {} : { fontStyle: "italic" }}
      >
        {showAuthor &&
          <AuthorLine
            author={author}
            message={message}
            buttons={false}
          />
        }
        {message.content && <OrgFormat content={message.content} />}
      </span>
      {message.image && (
        <a href={message.image} target="_blank">
          <img src={message.image} />
        </a>
      )}
    </>
  )
}