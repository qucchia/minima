import { Component } from "react";
import { ReactNode } from "react";
import reactStringReplace from "react-string-replace";

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

type Props = {
  content: string;
  hideSyntax?: boolean;
};

export default class OrgFormat extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <p>{formatOrg(this.props.content)}</p>
  }
}