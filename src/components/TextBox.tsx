import { Component } from "react";
import ButtonIcon from "./ui/ButtonIcon";
import UploadButton from "./ui/UploadButton";

type Props = {
  onSend: (message: string | undefined, options?: any) => void;
  enterName: boolean;
  onChangeName: () => void;
  onUploadProfilePicture: (image: string) => void;
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
        {this.props.enterName
          ? <label htmlFor="text-box">
            Enter&nbsp;a&nbsp;nickname:
          </label>
          : <>
            <UploadButton
              name="upload-image"
              title="Upload image"
              icon="image-add"
              accept="image/*"
              onUpload={(image: string) =>
                this.props.onSend(undefined, { image })}
            />
            <ButtonIcon
              icon="edit"
              title="Change nickname"
              onClick={this.props.onChangeName}
            />
            <UploadButton
              name="upload-profile-picture"
              title="Upload profile picture"
              icon="user-add"
              accept="image/*"
              onUpload={(image: string) =>
                this.props.onUploadProfilePicture(image)}
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