import React, { useState } from "react";
import { Link } from "react-router-dom";

import cross_sign from "../../../assets/img/cross_sign.png";
import append_icon from "../../../assets/img/append_icon.png";
import reduce_icon from "../../../assets/img/reduce_icon.png";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { IBasketItems, IItems} from "../../../redux/types";
import { SetID, SetCategory } from "../../../redux/home/homeSlice";
import {
  IncExpences,
  DecExpences,
} from "../../../redux/basket/basketSlice";

import "./basketitem.scss";

export const BasketItemBlock = (props: IBasketItems) => {
  const {items} = useAppSelector((state) => state.basket.items);
  const ITEMS = useAppSelector((state) => state.basket.items);

  const dispatch = useAppDispatch();

  const [images] = useState(props.image);

  const INC_EXPENCES = (price: number) => {
    dispatch(IncExpences(price));
  };

  const DEC_EXPENCES = (price: number) => {
    dispatch(DecExpences(price));
  };


  const POP_ITEM = (item: IBasketItems) => {
    
  };

  const PUSH_ITEM = (item: IBasketItems) => {
    
  };

  const REMOVE_ITEM = (id: string) => {
    
  };

 

  



  

  return (
    <div className="item_body">
      <Link
        to="/marketplace_soket/item"
        className="item_link"
        onClick={() => {
          dispatch(SetCategory(props.category));
        }}
      >
        <img src={images[0]} className="images" />
        <div className="info">
          <div className="info_name"> Назва: {props.name} </div>
          <div>Ціна: {props.price} </div>
          <div>
            У кошику:{props.amount}
          </div>
        </div>
      </Link>
      <div className="AppendReduseCross">
        <div className="AppendReduse">
          <div className="plus_bkgr">
            <img
              className="plus"
              src={append_icon}
              alt="plus"
              onClick={() => PUSH_ITEM(props)}
            />
          </div>

          <div className="minus_bkgr">
            <Link
              to={
                items.length === 1
                  ? "/marketplace_soket"
                  : "/marketplace_soket/basket"
              }
              className="minus_link"
            >
              <img
                className="minus"
                src={reduce_icon}
                alt="minus"
                onClick={() => POP_ITEM(props)}
              />
            </Link>
          </div>
        </div>

        <div className="cross">
          <Link
            to={
              items.length === 1
                ? "/marketplace_soket"
                : "/marketplace_soket/basket"
            }
            className="cross_link"
          >
            <img src={cross_sign} alt="cross" onClick={() => REMOVE_ITEM(props._id)} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BasketItemBlock;
