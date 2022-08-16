import { Hover, Message as MessageProps } from "../types/index";

export default function Message(props: MessageProps & {
  user: boolean;
  onChangeName: () => void;
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
            <button onClick={props.onChangeName}>
              Change name
            </button>}
        </span>
        <br/>
        <span
          className="message-content"
          style={props.notSent ? { fontStyle: "italic" } : {}}
        >
          {props.content}
        </span>
        {props.image && <img src={props.image} />}
      </p>
    </div>
  )
}