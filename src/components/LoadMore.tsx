import { Component } from "react";

type Props = {
  onClick: () => void;
}

export default class LoadMore extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return <button onClick={this.props.onClick}>Load more</button>
  }
}