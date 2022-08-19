import { Component, KeyboardEvent } from "react";
import ButtonIcon from "./ButtonIcon";
import Icon from "./Icon";

type Props = {
  onSend: (message: string) => void;
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
    console.log(this.state.text);
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
              className="icon-button"
              title="Change nickname"
              onClick={this.props.onChangeName}
            />
          </>}
        <textarea
          rows={this.state.text.split("\n").length}
          autoFocus={true}
          onKeyPress={(e) => {
            console.log(e);
            this.setState({ text: e.value });
            if (e.key === "Enter" && e.target.value && !e.shiftKey) {
              this.props.onSend(e.target.value);
              this.setState({ text: "" });
            }
          }}
          value={this.state.text}
        >
        </textarea>
      </div>
    );
  }
}