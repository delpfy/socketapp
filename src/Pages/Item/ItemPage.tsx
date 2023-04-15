import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IncExpences, SetItemPage } from "../../redux/basket/basketSlice";
import { IBasketItemDisplay, IItemDisplay, IItems } from "../../redux/types";
import NotFoundPage from "../NotFound/NotFoundPage";
import { useNavigate } from "react-router-dom";

export const ItemPage = () => {
  const {itemCurrent, status} = useAppSelector((state) => state.home);
  const {isOnItemPage, basketItemCurrent} = useAppSelector((state) => state.basket);
  const [imageIndex, setImageIndex] = useState(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  let currentItem: IBasketItemDisplay | IItemDisplay = itemCurrent;

  React.useEffect(() => {
    dispatch(SetItemPage(false))
    currentItem = basketItemCurrent;
    
    console.log('CHanged')
    console.log("currentItem.items.name " + currentItem.items)
  }, [isOnItemPage, basketItemCurrent])

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
            src={currentItem.items.image[imageIndex]}
            alt={currentItem.items.name}
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
          <h1 className="item__body_subcontent_name">{currentItem.items.name}</h1>
          <h1 className="item__body_subcontent_price">₴ {currentItem.items.price}</h1>
          <p className="item__body_subcontent_description">
            {currentItem.items.description}
          </p>

          <div className="item__body_basketButtonBlock">
            <button
              className="item__body_basketButton"
              onClick={() => PUSH_BASKET_ITEM(currentItem.items)}
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
