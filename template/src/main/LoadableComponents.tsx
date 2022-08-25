import loadable from "@loadable/component";

export const LoginLoadable = loadable(() => import("../pages/Login/Login"));
export const RegisterLoadable = loadable(
  () => import("../pages/Register/Register")
);

export const HomeLoadable = loadable(
    () => import("../pages/Home/Home")
  );
