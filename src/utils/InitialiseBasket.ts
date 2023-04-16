import { SerializedError } from "@reduxjs/toolkit";
import { IBasketItemDisplay, IBasketItemsDisplay, Status} from "../redux/types";


export const InitialiseBasket = () => {
  return {
    status: '' as Status,
    items: {} as IBasketItemsDisplay,
    basketItemCurrent:  {} as IBasketItemDisplay,
    itemsAmount: 0,
    isOnItemPage: false
  };
};
