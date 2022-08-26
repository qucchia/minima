import { Hover, Message as MessageProps, User } from "../types/index";
import OrgFormat from "./OrgFormat";

export default function Message(props: {
  message: MessageProps;
  author?: User;
  showAuthor: boolean;
  user: boolean;
  onHover: (hover: Hover, h: boolean) => void;
  hover: boolean;
  notSent: boolean;
}) {
  const author = props.author || {
    username: "Unknown"
  }
  return (
    <div
      className="message"
      onMouseEnter={() => props.onHover({ message: props.message.id }, true)}
      onMouseLeave={() => props.onHover({ message: props.message.id }, false)}
    >
        {props.showAuthor && 
          <span className="author-line">
            <span className="author">{author.username}</span>
            <span className="time">{new Date(props.message.id).toString().substring(16,21)}</span>
            {props.hover && props.user &&
              <button onClick={() => alert("Not implemented")}>
                Delete
              </button>}
          </span>}
        <span
          className="message-content"
          style={props.notSent ? { fontStyle: "italic" } : {}}
        >
          {props.message.content &&
            <OrgFormat content={props.message.content} />}
        </span>
        {props.message.image && <a href={props.message.image} target="_blank">
          <img src={props.message.image} />
        </a>}
    </div>
  )
}