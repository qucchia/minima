import Icon from "./Icon";

export default function UploadButton({
  name,
  title,
  icon,
  accept = "*",
  onUpload,
}: {
  name: string;
  title: string;
  icon: string;
  accept: string;
  onUpload: (contents: string) => void;
}) {
  return (
    <>
      <label htmlFor={name} title={title} className="upload-label">
        <Icon icon={icon} />
      </label>
      <input
        type="file"
        id={name}
        name={name}
        accept={accept}
        hidden
        onChange={(e) => {
          const reader = new FileReader();
          reader.addEventListener("load", (event) => {
            onUpload(event.target?.result as string);
          });
          reader.readAsDataURL((e.target.files as FileList)[0]);
        }}
      />
    </>
  );
}