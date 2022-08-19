import { Component } from "react";
import { User as UserProps } from "../types/index";

type Props = {
  user: UserProps;
}

export default class User extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <li>{this.props.user.username}</li>
    );
  }
}