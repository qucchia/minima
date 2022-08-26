import { useEffect, useRef, useState } from "react";
import MessageGroup from "./MessageGroup";
import LoadMore from "./LoadMore";
import { Hover, APIMessage, Message, User } from "../types/index";

const MAX_TIME_BETWEEN_GROUPED_MESSAGES = 5 * 60 * 1000; // 5 minutes

export default function Messages({
  user, users, messages, loadedAll, onHover, hover, onLoadMore
}: {
  user?: User;
  users: User[];
  messages: Message[];
  loadedAll: boolean;
  onHover: (hover: Hover, h: boolean) => void;
  hover?: Hover;
  onLoadMore: () => void;
}) {
  const bottomRef = useRef(null);
  const [scrolledToBottom, setScrolledToBottom] = useState(true);
  
  useEffect(() => {
    if (scrolledToBottom) {
      bottomRef.current?.scrollIntoView({behavior: 'smooth'});
    }
  });

  const messageGroups: Message[][] = [];
  let currentGroup: Message[] = [];
  let lastAuthorId = NaN;
  let lastMessageId = NaN;

  messages.forEach((message) => {
    if (
      message.authorId !== lastAuthorId ||
        (message.id - lastMessageId) > MAX_TIME_BETWEEN_GROUPED_MESSAGES
    ) {
      if (currentGroup.length) messageGroups.push(currentGroup);
      currentGroup = [message];
    } else {
      currentGroup.push(message);
    }
    lastAuthorId = message.authorId;
    lastMessageId = message.id;
  })
  if (currentGroup.length) messageGroups.push(currentGroup);

  return (
    <main
      onScroll={(e) => {
        setScrolledToBottom(e.target.scrollTop === e.target.scrollTopMax);
      }}
      >
      {loadedAll
        ? <p>Beginning of chat</p>
        : <LoadMore onClick={onLoadMore} />}
      {messageGroups.map((messageGroup, i) =>
        <MessageGroup
          key={i}
          messages={messageGroup}
          author={users.find((user) => user.id === messageGroup[0].authorId)}
        />
      )}
      <div ref={bottomRef} />
    </main>
  );
}