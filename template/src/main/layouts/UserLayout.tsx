import React from "react";
import UserHeader from "./UserHeader";

interface IUserLayout {
  children: any;
}

export default function UserLayout(props: IUserLayout) {
  return (
    <div>
      <UserHeader />
      {props.children}
    </div>
  );
}
