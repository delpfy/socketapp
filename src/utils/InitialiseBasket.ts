import {
  ShippingItemDisplay,
  ShippingItemsDisplay,
  Status,
} from "../redux/types";

export const InitialiseBasket = () => {
  return {
    status: "" as Status,
    items: {} as ShippingItemsDisplay,
    basketItemCurrent: {} as ShippingItemDisplay,
    itemsAmount: 0,
    isOnItemPage: false,
  };
};
