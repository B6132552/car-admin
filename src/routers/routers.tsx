import React from "react";
import { RouteObject } from "react-router-dom";
import Home from "../view/home/Home";
import DefaultLayout from "../layouts/DefaultLayout";
import ManageUser from "../view/home/user/ManageUser";

export interface IRouter {
  path: string;
  name: string;
  authentMenuName: string;
  exact: boolean;
  component: React.FC;
}

export const routers: RouteObject[] = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/usermanagement",
        element: <Home />,
        index: true,
      },
      {
        path: "/usermanagement/add",
        element: <ManageUser />,
        index: true,
      },
      {
        path: "/usermanagement/edit",
        element: <ManageUser />,
        index: true,
      },
    ],
  },
];
