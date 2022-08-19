import { Component } from "react";
import { User as UserProps, UserStatus } from "../types/index";
import User from "./User";

type Props = {
  users: UserProps[];
}

export default class Users extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const onlineUsers = this.props.users
      .filter((user) => user && user.status !== UserStatus.OFFLINE);
    const offlineUsers = this.props.users
      .filter((user) => user && user.status === UserStatus.OFFLINE);
    return (
      <div id="users">
        {!!onlineUsers.length && (
            <>
              <p>Online</p>
              <ul>
                {onlineUsers.map((user, i) => <User key={i} user={user}/>)}
              </ul>
            </>
          )}
        {!!offlineUsers.length && (
            <>
              <p>Offline</p>
              <ul>
                {offlineUsers.map((user, i) => <User key={i} user={user}/>)}
              </ul>
            </>
          )}
      </div>
    );
  }
}