import { CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setLoggedIn } from "../redux/slices/commonSlice";
import { dispatch, RootState } from "../redux/store";
import PublicRoutes from "./routes/PublicRoutes";
import UserRoutes from "./routes/UserRoutes";

export default function Main() {
  const { isLoggedIn } = useSelector((state: RootState) => state.common);

  useEffect(() => {
    if (isLoggedIn === null) {
      // check login here.
      dispatch(setLoggedIn(localStorage.isLogged));
    }
    // eslint-disable-next-line
  }, []);

  if (isLoggedIn === null)
    return (
      <div>
        <CircularProgress />
      </div>
    );
  if (isLoggedIn) return <UserRoutes />;
  return <PublicRoutes />;
}
