import { Component } from "react";
import ButtonIcon from "./ButtonIcon";
import Icon from "./Icon";

type Props = {
  onSend: (message: string | undefined, options?: any) => void;
  enterName: boolean;
  onChangeName: () => void;
}

export default class TextBox extends Component<Props, {
  text: string;
}> {
  constructor(props: Props) {
    super(props);
    
    this.state = {
      text: ""
    };
  }
  
  render() {
    return (
      <div id="text-box">
        {this.props.enterName && <label htmlFor="text-box">
          Enter&nbsp;a&nbsp;nickname:
        </label>}
        {!this.props.enterName &&
          <>
            <label id="upload-label" htmlFor="upload" title="Upload">
              <Icon icon="chat-upload" />
            </label>
            <input
              type="file"
              name="upload"
              id="upload"
              hidden
              accept="image/*"
              onChange={(e) => {
                const reader = new FileReader();
                reader.addEventListener('load', (event) => {
                  this.props.onSend(undefined, {
                    image: event.target?.result as string
                  });
                });
                reader.readAsDataURL((e.target.files as FileList)[0]);
              }}
            />
            <ButtonIcon
              icon="icon-button"
              title="Change nickname"
              onClick={this.props.onChangeName}
            />
          </>}
        <textarea
          autoFocus={true}
          style={{ height: this.state.text.split("\n").length * 16 + "px"}}
          onKeyPress={(e) => {
            if (e.key === "Enter" && e.target.value && !e.shiftKey) {
              e.preventDefault();
              this.props.onSend(e.target.value);
              this.setState({ text: "" });
            }
          }}
          rows={this.state.text.split("\n").length}
          onChange={(e) => {
            this.setState({ text: e.target.value });
          }}
          value={this.state.text}
        >
        </textarea>
      </div>
    );
  }
}