import { Menu as AntdMenu } from "antd";
import "./menu.css";
import React from "react";

export const Menu = (props) => {
  return <AntdMenu className="menu" {...props} />;
};
