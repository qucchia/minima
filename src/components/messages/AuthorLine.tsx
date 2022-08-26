import { APIMessage, User } from "../types/index";

export default function AuthorLine({
  author,
  message,
  buttons,
}: {
  author?: User,
  message: APIMessage,
  buttons: boolean,
}) {
  return (
    <span className="author-line">
      <span className="author">{author?.username || "Unknown"}</span>
      <span className="time">
        {new Date(message.id).toString().substring(16,21)}
      </span>
      {buttons &&
        <button onClick={() => alert("Not implemented")}>
          Delete
        </button>}
    </span>
  );
}