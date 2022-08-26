import { Component } from "react";
import { User as UserProps } from "../types/index";
import ProfilePicture from "./ProfilePicture";

type Props = {
  user: UserProps;
}

export default function User({ user }: { user: UserProps }) {
  return (
    <li className="user">
      <ProfilePicture image={user.profilePicture} />
      <span>{user.username}</span>
    </li>
  );
}