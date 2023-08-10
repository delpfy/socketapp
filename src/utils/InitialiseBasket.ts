import {
  ShippingItemDisplay,
  TShippingItemsDisplay,
  Status,
  TShippingItems,
} from "../redux/types";

export const InitialiseBasket = () => {
  return {
    status: "" as Status,
    items: [],
    afterOrder: false,
    basketItemCurrent: {} as ShippingItemDisplay,
    itemsAmount: 0,
  };
};
