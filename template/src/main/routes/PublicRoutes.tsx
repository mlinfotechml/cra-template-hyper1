import React from "react";
import { Route, Routes } from "react-router";
import { LoginLoadable, RegisterLoadable } from "../LoadableComponents";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterLoadable />}></Route>
      <Route path="*" element={<LoginLoadable />}></Route>
    </Routes>
  );
}
