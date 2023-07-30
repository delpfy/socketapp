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
    basketItemCurrent: {} as ShippingItemDisplay,
    itemsAmount: 0,
  };
};
