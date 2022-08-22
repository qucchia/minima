import { Hover, Message as MessageProps } from "../types/index";
import { ReactNode } from "react";
import reactStringReplace from "react-string-replace";

const punctuation = "(?:.*[ .()?!:]|)";

const replaceTable = [
  {
    regex: /\B[*]\b(.*)\b[*]\B/g,
    replace: (match: string) => <b>{formatOrg(match)}</b>,
  },
  {
    regex: /\B[/]\b(.*)\b[/]\B/g,
    replace: (match: string) => <i>{formatOrg(match)}</i>,
  },
  {
    regex: /\b[_](.*)[_]\b/g,
    replace: (match: string) => <u>{formatOrg(match)}</u>,
  },
  {
    regex: /[+]\b(.*)\b[+]/g,
    replace: (match: string) => <del>{formatOrg(match)}</del>,
  },
  {
    regex: /\[\[(.*\]\[.*)\]\]/g,
    replace: (match: string) =>
      <a
        href={match.split("][")[0]}
        target="_blank"
      >
        {formatOrg(match.split("][")[1])}
      </a>,
  },
]

function formatOrg(content: string) {
  let items: (string | ReactNode)[] = [content];
  replaceTable.forEach(({ regex, replace }) => {
    items = items.map(
      (item) => typeof item === "string"
      ? reactStringReplace(
          item, regex, replace
        )
      : item
    ).flat()
  });
  return items;
}

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
          {formatOrg(props.message.content)}
        </span>
        {props.image && <a href={props.message.image} target="_blank">
          <img src={props.message.image} />
        </a>}
    </div>
  )
}