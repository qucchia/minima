import { Component } from "react";
import Message from "./Message";
import LoadMore from "./LoadMore";
import { Hover, Message as MessageProps, User } from "../types/index";

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
    return (
      <div id="messages">
        {this.props.loadedAll
          ? <p>Beginning of chat</p>
          : <LoadMore onClick={this.props.onLoadMore} />}
        {this.props.messages.map(
          (message, i) =>
            <Message
              key={i}
              author={message.author}
              content={message.content}
              image={message.image}
              id={message.id}
              notSent={message.notSent}
              user={!!this.props.user && message.author.id === this.props.user.id}
              onHover={this.props.onHover}
              hover={!!this.props.hover &&
                "message" in this.props.hover &&
                this.props.hover.message === message.id}
            />)}
      </div>
    );
  }
}