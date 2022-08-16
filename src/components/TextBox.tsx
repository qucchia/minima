import { Component, KeyboardEvent } from "react";

type Props = {
  onSend: (message: string) => void;
  enterName: boolean;
}

export default class TextBox extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  
  render() {
    return (
      <div id="text-box">
        {this.props.enterName && <label htmlFor="text-box">
          Enter&nbsp;a&nbsp;nickname:
        </label>}
        {!this.props.enterName &&
          <>
            <label id="upload-label" htmlFor="upload">Upload</label>
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
          </>}
        <input
            type="text"
            name="text-box"
            autoFocus={true}
            onKeyPress={(e) => {
              if (e.key === "Enter" && e.target.value) {
                this.props.onSend(e.target.value);
                e.target.value = "";
              }
            }}
          />
      </div>
    );
  }
}