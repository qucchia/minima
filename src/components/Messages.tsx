import { Component, useRef, useEffect, useState } from "react";
import Message from "./Message";
import LoadMore from "./LoadMore";
import { Hover, Message as MessageProps, User } from "../types/index";

const MAX_TIME_BETWEEN_GROUPED_MESSAGES = 5 * 60 * 1000; // 5 minutes

export default function Messages(props: {
  user?: User;
  messages: MessageProps[];
  notSentMessages: MessageProps[];
  loadedAll: boolean;
  onHover: (hover: Hover, h: boolean) => void;
  hover?: Hover;
  onLoadMore: () => void;
}) {
  const bottomRef = useRef(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(true);
  
  let lastAuthorId = NaN;
  let lastMessageId = NaN;
  
  useEffect(() => {
    if (scrolledToBottom) {
      bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }
  });

  const getMessages = (messages: MessageProps[], notSent: boolean) => {
    return messages.map(
      (message, i) => {
        const m = (
          <Message
            notSent={notSent}
            key={i}
            message={message}
            author={
              message.author.id !== lastAuthorId ||
              (message.id - lastMessageId) > MAX_TIME_BETWEEN_GROUPED_MESSAGES
            }
            user={!!props.user && message.author.id === props.user.id}
            onHover={props.onHover}
            hover={!!props.hover &&
              "message" in props.hover &&
              props.hover.message === message.id}
          />
        )
        lastAuthorId = message.author.id;
        lastMessageId = message.id;
        return m;
    });
  }
  
  return (
    <main
      onScroll={(e) => {
        setScrolledToBottom(e.target.scrollTop === e.target.scrollTopMax);
      }}
      >
      {props.loadedAll
        ? <p>Beginning of chat</p>
        : <LoadMore onClick={props.onLoadMore} />}
      {getMessages(props.messages, false)}
      {getMessages(props.notSentMessages, true)}
      <div ref={bottomRef} />
    </main>
  );
}