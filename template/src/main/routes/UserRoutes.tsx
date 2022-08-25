import React from "react";
import { Route, Routes } from "react-router";
import Page404 from "../../components/Page404";
import { HomeLoadable } from "../LoadableComponents";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomeLoadable />}></Route>
      <Route path="/home" element={<HomeLoadable />}></Route>
      <Route path="*" element={<Page404 />}></Route>
    </Routes>
  );
}
