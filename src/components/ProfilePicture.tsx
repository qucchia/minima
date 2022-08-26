import Icon from "./Icon";

export default function ProfilePicture({ image }: { image?: string }) {
  return (
    <div className="profile-picture">
      {image
        ? <img src={image} />
        : <Icon icon="user" />}
    </div>
  );
}