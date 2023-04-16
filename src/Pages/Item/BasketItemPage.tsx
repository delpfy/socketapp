import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { IncExpences, SetItemPage } from "../../redux/basket/basketSlice";
import {
  IBasketItemDisplay,
  IItemDisplay,
  IItems,
  Status,
} from "../../redux/types";
import NotFoundPage from "../NotFound/NotFoundPage";
import { useNavigate } from "react-router-dom";
import { DialogProps } from "@mui/material";

export const BasketItemPage = (props: IItems) => {
  const { status } = useAppSelector((state) => state.home);
  const [imageIndex, setImageIndex] = useState(0);

  const dispatch = useAppDispatch();

  /*  React.useEffect(() => {
      dispatch(getItemById(props.id))
    }, []) */

 

  const INC_EXPENCES = (price: number) => {
    dispatch(IncExpences(price));
  };

  const PUSH_BASKET_ITEM = (item: IItems) => {};

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
            src={props.image[imageIndex]}
            alt={props.name}
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
          <h1 className="item__body_subcontent_name">{props.name}</h1>
          <h1 className="item__body_subcontent_price">₴ {props.price}</h1>
          <p className="item__body_subcontent_description">
            {props.description}
          </p>

          <div className="item__body_basketButtonBlock">
            <button
              className="item__body_basketButton"
              onClick={() => PUSH_BASKET_ITEM(props)}
            >
              Додати до кошика
            </button>
          </div>
        </div>
      </div>
    );
  };

  function StatusHandler(status: Status) {
    switch (status) {
      case "success":
        if (props !== undefined) {
          return <Item />;
        } else {
          return <NotFoundPage />;
        }
      case "pending":
        return <NotFoundPage />;
      case "error":
        return <NotFoundPage />;
      default:
        return <NotFoundPage />;
    }
  }

  return StatusHandler(status);
};

export default BasketItemPage;
