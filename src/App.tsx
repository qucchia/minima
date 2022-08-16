import { Component } from "react";
import "./App.css";
import "remixicon/fonts/remixicon.css";
import {
  ClientMessage,
  ConnectionStatus,
  Hover,
  Message,
  ServerMessage,
  User,
  UserStatus,
} from "./types/index";
import Messages from "./components/Messages";
import TextBox from "./components/TextBox";

const SERVER = "wss://minima-server.qucchia0.repl.co";

export type State = {
  user?: User;
  messages: Message[];
  connectionStatus: ConnectionStatus;
  scrolledToBottom: boolean;
  hover?: Hover;
  loadedAll: boolean;
  webSocket: WebSocket;
};

const MAX_MESSAGES = 50;

export default class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props);

    function getCookie(name: string): string | undefined {
      return document.cookie
        .split('; ')
        .find((row) => row.startsWith(name + "="))
        ?.split('=')[1];
    }

    const username = getCookie("username");
    const id = parseInt(getCookie("id"));
    const status =
      parseInt(getCookie("status")) as ConnectionStatus
      || ConnectionStatus.ONLINE;
    
    this.state = {
      user: username ? { username, id, status } : undefined,
      messages: JSON.parse(localStorage.getItem("messages") || "[]"),
      connectionStatus: ConnectionStatus.CONNECTING,
      scrolledToBottom: true,
      loadedAll: false,
      webSocket: new WebSocket(SERVER),
    };
  }

  componentDidMount() {
    this.connect();
  }

  send(message: ClientMessage) {
    this.state.webSocket.send(JSON.stringify(message));
  }

  setUser(user: User) {
    
  }
  
  connect() {
    this.state.webSocket.onerror = () => {
      this.setState({ connectionStatus: ConnectionStatus.ERROR });
    }

    this.state.webSocket.onopen = () => {
      const messages = this.state.messages;
      messages.filter((message) => message.notSent)
        .forEach((message) => {
          message.notSent = false;
          this.send({ type: "message", message });
        });
      
      this.setState({ messages, connectionStatus: ConnectionStatus.OPEN });
      this.send({
        type: "user",
      })
    }
    
    this.state.webSocket.onclose = () => {
      this.setState({ connectionStatus: ConnectionStatus.CLOSED });
      this.reconnect();
    }

    this.state.webSocket.onmessage = (event) => {
      const wsMessage = JSON.parse(event.data) as ServerMessage;

      switch (wsMessage.type) {
        case "messages":
          console.log("Received messages", wsMessage);
          let messages = this.state.messages;
          wsMessage.messages.forEach((msg) => {
            if (!messages.find((m) => m.id === msg.id)) {
              messages.push(msg);
            }
          });
          
          messages = messages.sort((a, b) => a.id - b.id);
          this.setState({ messages });
          
          let storageMessages = messages;
          if (storageMessages.length > MAX_MESSAGES) {
            storageMessages = storageMessages.slice(
              storageMessages.length - MAX_MESSAGES,
              storageMessages.length
            );
          }
          console.log(storageMessages)
          localStorage.setItem("messages", JSON.stringify(storageMessages));
          
          if (wsMessage.start) this.setState({ loadedAll: true });
          break;
      }
    }
  }

  reconnect() {
    this.setState({ webSocket: new WebSocket(SERVER) });
    this.connect();
  }
  
  handleLoadMore = () => {
    this.send({ type: "fetch", before: this.state.messages[0].id });
  }
  
  handleSend = (content?: string, options?: { image?: string }) => {
    if (!this.state.user || !this.state.user.username) {
      const id = this.state.user?.id || Date.now();
      const status = UserStatus.ONLINE;
      document.cookie = `username=${content}; SameSite=None; Secure`;
      document.cookie = `id=${id}; SameSite=None; Secure`;
      document.cookie = `status=${status}; SameSite=None; Secure`;
      return this.setState({
        user: { id, username: content as string, status }
      });
    }
    
    const message: Message= {
      content,
      image: options?.image,
      author: { username: this.state.user.username, id: this.state.user.id },
      id: Date.now(),
      notSent: !this.state.connectionStatus,
    };

    if (this.state.connectionStatus) {
      this.send({ type: "message", message });
    }
    
    this.setState({
      messages: this.state.messages.concat([message])
    });
  }

  handleHover = (hover: Hover, h: boolean) => {
    if (h) {
      this.setState({ hover });
    } else if (this.state.hover === hover) {
      this.setState({ hover: undefined });
    }
  }
  
  render() {
    return (
      <>
        <header>
          <h1>Minima</h1>
        </header>
        <Messages
          messages={this.state.messages}
          user={this.state.user}
          loadedAll={this.state.loadedAll}
          onChangeName={() => this.setState({
            user: {
              username: "",
              id: this.state.user?.id || Date.now(),
              status: this.state.user.status,
            }
          })}
          onHover={this.handleHover}
          onLoadMore={this.handleLoadMore}
          hover={this.state.hover}
        />
        <footer>
          {(() => {
            switch(this.state.connectionStatus) {
              case ConnectionStatus.CONNECTING:
                return <p>Connecting...</p>;
              case ConnectionStatus.ERROR:
                return <p>Could not connect</p>;
              case ConnectionStatus.CLOSED:
                return <p>Connection closed. Reconnecting...</p>;
            }
          })()}
          <TextBox
            onSend={this.handleSend}
            enterName={!this.state.user || !this.state.user.username}
          />
        </footer>
      </>
    )
  }
}

///////////////////////////// 80 characters wide ///////////////////////////////
