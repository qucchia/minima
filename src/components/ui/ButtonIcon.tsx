import { Component, MouseEvent} from "react";
import Icon from "./Icon";

type Props = {
  icon: string;
  onClick: (e: MouseEvent) => void;
  title: string;
}

export default class ButtonIcon extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <button
        className="icon-button"
        onClick={this.props.onClick} 
        title={this.props.title}
      >
        <Icon icon={this.props.icon} />
      </button>
    )
  }
}