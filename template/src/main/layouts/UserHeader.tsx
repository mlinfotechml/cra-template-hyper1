import React from "react";
import { Link } from "react-router-dom";
import { setLoggedIn } from "../../redux/slices/commonSlice";
import { dispatch } from "../../redux/store";
import { lstMenu } from "../menuList";

export default function Header() {
  return (
    <div>
      Modify Header
      {lstMenu.map((item) => {
        return <Link to={item.path}>{item.title}</Link>;
      })}
      <button
        onClick={() => {
          localStorage.removeItem("isLogged");
          dispatch(setLoggedIn(false));
        }}
      >
        Logout
      </button>
    </div>
  );
}
