import React from "react";

import Logo from "../LogotypeArea/Logo";
import Basket from "../BasketArea/Basket";
import Search from "../SearchArea/Search";

import "./menu.scss";

export const MenuField = () => {
  return (
    <>
      <div className="header">
        <div className="menu">
          <div className="LogoSearch">
            <Logo />
            <Search />
          </div>

          <Basket />
        </div>
      </div>
    </>
  );
};

export default MenuField;
