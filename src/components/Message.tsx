import { Hover, Message as MessageProps } from "../types/index";

export default function Message(props: {
  message: MessageProps;
  user: boolean;
  author: boolean;
  onHover: (hover: Hover, h: boolean) => void;
  hover: boolean;
}) {
  return (
    <div
      className="message"
      onMouseEnter={() => props.onHover({ message: props.message.id }, true)}
      onMouseLeave={() => props.onHover({ message: props.message.id }, false)}
    >
        {props.author && 
        <span className="author-line">
          <span className="author">{props.message.author.username}</span>
          <span className="time">{new Date(props.message.id).toString().substring(16,21)}</span>
          {props.hover && props.user &&
            <button onClick={() => alert("Not implemented")}>
              Delete
            </button>}
        </span>}
        <span
          className="message-content"
          style={props.message.notSent ? { fontStyle: "italic" } : {}}
        >
          {props.message.content}
        </span>
        {props.image && <a href={props.message.image} target="_blank">
          <img src={props.message.image} />
        </a>}
    </div>
  )
}