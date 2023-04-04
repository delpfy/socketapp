import React from "react";
import BasketItemBlock from "../../Components/BasketElements/Item/BasketItemBlock";
import { useAppSelector } from "../../redux/hooks";

import "./basketpage.scss";
export const BasketPage = () => {
  const {items} = useAppSelector((state) => state.basket.items);

  return (
    <div className="basket_background">
      <div className="content">
        <div>
          {items.map((item) => {
            return <BasketItemBlock key={item._id} {...item} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default BasketPage;
