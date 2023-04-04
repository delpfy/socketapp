import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IncExpences } from "../../redux/basket/basketSlice";
import { IItems } from "../../redux/types";
import NotFoundPage from "../NotFound/NotFoundPage";

export const ItemPage = () => {
  const {itemCurrent, status} = useAppSelector((state) => state.home);
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useAppDispatch();


  const INC_EXPENCES = (price: number) => {
    dispatch(IncExpences(price));
  };

  const PUSH_BASKET_ITEM = (item: IItems) => {
    
  };
  
  const Item = () => {
    return (
      <div className="item__body">
        <div className="item__body_image_block">
          <div
            onClick={() =>
              setImageIndex(imageIndex - 1 !== -1 ? imageIndex - 1 : 2)
            }
            className="item__body_image_changeBackward"
          >
            <button className="item__body_image_changeBackward_button">
              {" "}
              {"<"}{" "}
            </button>
          </div>
          <img
            className="item__body_image"
            src={itemCurrent.items.image[imageIndex]}
            alt={itemCurrent.items.name}
          ></img>
          <div
            onClick={() =>
              setImageIndex(imageIndex + 1 !== 3 ? imageIndex + 1 : 0)
            }
            className="item__body_image_changeForward"
          >
            <button className="item__body_image_changeForward_button">
              {" "}
              {">"}{" "}
            </button>
          </div>
        </div>

        <div className="item__body_subcontent">
          <h1 className="item__body_subcontent_name">{itemCurrent.items.name}</h1>
          <h1 className="item__body_subcontent_price">₴ {itemCurrent.items.price}</h1>
          <p className="item__body_subcontent_description">
            {itemCurrent.items.description}
          </p>

          <div className="item__body_basketButtonBlock">
            <button
              className="item__body_basketButton"
              onClick={() => PUSH_BASKET_ITEM(itemCurrent.items)}
            >
              Додати до кошика
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    status === 'success' ? <Item/> : <NotFoundPage/>
  );
};

export default ItemPage;
