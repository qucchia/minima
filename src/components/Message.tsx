import { Hover, Message as MessageProps } from "../types/index";

export default function Message(props: MessageProps & {
  user: boolean;
  onHover: (hover: Hover, h: boolean) => void;
  hover: boolean;
}) {
  return (
    <div
      className="message"
      onMouseEnter={() => props.onHover({ message: props.id }, true)}
      onMouseLeave={() => props.onHover({ message: props.id }, false)}
    >
      <p>
        <span className="author-line">
          <span className="author">{props.author.username}</span>
          <span className="time">{new Date(props.id).toString().substring(16,21)}</span>
          {props.hover && props.user &&
            <button onClick={() => alert("Not implemented")}>
              Delete
            </button>}
        </span>
        <br/>
        <span
          className="message-content"
          style={props.notSent ? { fontStyle: "italic" } : {}}
        >
          {props.content}
        </span>
        {props.image && <a href={props.image} target="_blank">
          <img src={props.image} />
        </a>}
      </p>
    </div>
  )
}