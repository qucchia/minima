import { Component } from "react";
import Message from "./Message";
import LoadMore from "./LoadMore";
import { Hover, Message as MessageProps, User } from "../types/index";

const MAX_TIME_BETWEEN_GROUPED_MESSAGES = 5 * 60 * 1000; // 5 minutes

type Props = {
  user?: User;
  messages: MessageProps[];
  loadedAll: boolean;
  onHover: (hover: Hover, h: boolean) => void;
  hover?: Hover;
  onLoadMore: () => void;
}

type State = {
  scrolledToBottom: boolean;
}

export default class Messages extends Component<Props, State> {
  constructor(
  props: Props
) {
    super(props);
    this.state = {
      scrolledToBottom: true
    }
  }
  
  render() {
    let lastAuthorId = NaN;
    let lastMessageId = NaN;
    
    return (
      <div id="messages">
        {this.props.loadedAll
          ? <p>Beginning of chat</p>
          : <LoadMore onClick={this.props.onLoadMore} />}
        {this.props.messages.map(
          (message, i) => {
            const m = (
              <Message
                key={i}
                message={message}
                author={
                  message.author.id !== lastAuthorId ||
                  (message.id - lastMessageId) > MAX_TIME_BETWEEN_GROUPED_MESSAGES
                }
                user={!!this.props.user && message.author.id === this.props.user.id}
                onHover={this.props.onHover}
                hover={!!this.props.hover &&
                  "message" in this.props.hover &&
                  this.props.hover.message === message.id}
              />
            )
            lastAuthorId = message.author.id;
            lastMessageId = message.id;
            return m;
        })}
      </div>
    );
  }
}