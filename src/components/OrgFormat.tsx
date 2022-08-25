import React, { Component, ReactNode } from "react";
import reactStringReplace from "react-string-replace";

const outlineTable = [
  // Headlines
  // https://orgmode.org/manual/Headlines.html#Headlines
  {
    regex: /^[*] (.*)$/m,
    replace: (match: string) => <h1>{formatOrgInline(match)}</h1>
  },
  {
    regex: /^[*]{2} (.*)$/m,
    replace: (match: string) => <h2>{formatOrgInline(match)}</h2>
  },
  {
    regex: /^[*]{3} (.*)$/m,
    replace: (match: string) => <h3>{formatOrgInline(match)}</h3>
  },
  {
    regex: /^[*]{4} (.*)$/m,
    replace: (match: string) => <h4>{formatOrgInline(match)}</h4>
  },
  {
    regex: /^[*]{5,} (.*)$/m,
    replace: (match: string) => <h5>{formatOrgInline(match)}</h5>
  },

  // Plain lists
  // https://orgmode.org/manual/Plain-Lists.html
  // Unordered lists
  {
    regex: /((?: *[-+] .*\n(?:  .*\n)*)+(?: *[-+] .*(?:\n  .*)*))/g,
    replace: (match: string) => (
      <ul>
        {match.match(/ *[-+] .*(?:\n  .*)*/g).map(
          (item, i) => <li key={i}>{
            item.replace(/^ *[-+] /, "").trim().split("\n")
              .map((i) => [i, <br />]).flat().slice(0, -1)
          }</li>
        )}
      </ul>
    ),
  },
  {
    regex: /((?: +[*] .*\n(?:  .*\n)*)+(?: +[*] .*(?:\n  .*)*))/g,
    replace: (match: string) => (
      <ul>
        {match.match(/ +[*] .*(?:\n  .*)*/g).map(
          (item, i) => <li key={i}>{
            item.replace(/^ +[*] /, "").trim().split("\n")
              .map((i) => [i, <br />]).flat().slice(0, -1)
          }</li>
        )}
      </ul>
    )
    ,
  },
];

const inlineTable = [
  // Emphasis and Monospace
  // https://orgmode.org/manual/Emphasis-and-Monospace.html
  {
    // bold
    regex: /\B[*]\b(.*)\b[*]\B/g,
    replace: (match: string) => <b>{formatOrgInline(match)}</b>,
  },
  {
    // italic
    regex: /\B[/]\b(.*)\b[/]\B/g,
    replace: (match: string) => <i>{formatOrgInline(match)}</i>,
  },
  {
    // underline
    regex: /\b[_](.*)[_]\b/g,
    replace: (match: string) => <u>{formatOrgInline(match)}</u>,
  },
  {
    // strikethrough
    regex: /[+]\b(.*)\b[+]/g,
    replace: (match: string) => <del>{formatOrgInline(match)}</del>,
  },
  {
    // verbatim
    regex: /[=]\b(.*)\b[=]/g,
    replace: (match: string) => <q>{formatOrgInline(match)}</q>,
  },
  {
    // code
    regex: /[~]\b(.*)\b[~]/g,
    replace: (match: string) => <code>{formatOrgInline(match)}</code>,
  },
  
  // Subscripts and Superscripts
  // https://orgmode.org/manual/Subscripts-and-Superscripts.html
  {
    regex: /_\{(.*)\}/g,
    replace: (match: string) => <sub>{formatOrgInline(match)}</sub>,
  },
  {
    regex: /\b\^\{(.*)\}/g,
    replace: (match: string) => <sup>{formatOrgInline(match)}</sup>,
  },
  // optional
  {
    regex: /_(.*)\b/g,
    replace: (match: string) => <sub>{formatOrgInline(match)}</sub>,
  },
  {
    regex: /\b\^(.*)\b/g,
    replace: (match: string) => <sup>{formatOrgInline(match)}</sup>,
  },
  {
    // link
    regex: /\[\[(.*\]\[.*)\]\]/g,
    replace: (match: string) =>
      <a
        href={match.split("][")[0]}
        target="_blank"
      >
        {formatOrgInline(match.split("][")[1])}
      </a>,
  },
]

function formatOrg(content: string) {
  let paragraphs: (string | ReactNode)[] = [content];
  outlineTable.forEach(({ regex, replace }) => {
    paragraphs = paragraphs.map(
      (item) => typeof item === "string"
        ? reactStringReplace(
            item, regex, replace
          ).filter((i) => i !== undefined)
        : item
    ).flat()
  });
  return paragraphs.map(
    (paragraph, i) => typeof paragraph === "string"
      ? paragraph.split("\n\n")
        .filter((p) => p)
        .map((paragraph, j) => <p key={`${i}-${j}`}>{formatOrgInline(paragraph)}</p>)
      : React.cloneElement( paragraph, { key: i })
  ).flat();
}

function formatOrgInline(content: string) {
  let items: (string | ReactNode)[] = [content];
  inlineTable.forEach(({ regex, replace }) => {
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
    return formatOrg(this.props.content)
      .map((paragraph) =>
        (Array.isArray(paragraph) || typeof paragraph === "string")
          ? <p>{paragraph}</p>
          : paragraph
      );
  }
}