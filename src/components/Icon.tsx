import { Component } from "react";

type Props = {
  icon: string;
}

export default class Icon extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <i className={`ri-${this.props.icon}-line`}></i>
    )
  }
}