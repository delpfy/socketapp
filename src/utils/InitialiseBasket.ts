import { SerializedError } from "@reduxjs/toolkit";
import { IBasketItemsDisplay, Status} from "../redux/types";


export const InitialiseBasket = () => {
  return {
    status: '' as Status,
    items: {} as IBasketItemsDisplay,
    expences: 0,
  };
};
