import React from "react";
import { RouteObject } from "react-router-dom";
import Home from "../view/home/Home";
import DefaultLayout from "../layouts/DefaultLayout";
import ManageUser from "../view/home/user/ManageUser";
import ManageCar from "../view/home/manage-car/ManageCar";
import ManageCarList from "../view/home/manage-car/ManagaCarList";
import CarList from "../view/home/car/CarList";
import CarAddEdit from "../view/home/car/CarAddEdit";


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
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/managecar",
        element: <ManageCarList />,
        index: true,
      },
      {
        path: "/managecar/add",
        element: <ManageCar />,
        index: true,
      },
    ],
  },
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/car",
        element: <CarList />,
        index: true,
      },
      {
        path: "/car/add",
        element: <CarAddEdit />,
        index: true,
      },
      {
        path: "/car/edit",
        element: <CarAddEdit />,
        index: true,
      },
    ],
  },
];
