import {
  ShippingItemDisplay,
  TShippingItemsDisplay,
  Status,
} from "../redux/types";

export const InitialiseBasket = () => {
  return {
    status: "" as Status,
    items: {} as TShippingItemsDisplay,
    basketItemCurrent: {} as ShippingItemDisplay,
    itemsAmount: 0,
  };
};
