import React from "react";
import { setLoggedIn } from "../../redux/slices/commonSlice";
import { dispatch } from "../../redux/store";

export default function Login() {
  return (
    <div>
      login Render your loing logic here
      <button
        onClick={() => {
          localStorage.isLogged = "yes";
          dispatch(setLoggedIn(true));
        }}
      >
        Login
      </button>
    </div>
  );
}
