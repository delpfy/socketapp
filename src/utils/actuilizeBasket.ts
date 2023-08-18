import { synchronizeBasket } from "../redux/basket/basketSlice";
import { useAppDispatch } from "../redux/hooks";
import { CombinedItems, Items } from "../redux/types";

export function actualizeBasket(data: any, origin: any) {
  if (data !== undefined) {
    const itemIndex = data.findIndex(
      (items: Items) => items.name === origin.items.name
    );

    if (itemIndex !== -1) {
      for (const key in origin.items) {
        
        if (key === "price") {
          if (origin.items.hasOwnProperty(key)) {
            if (
              origin.items[key as keyof CombinedItems] !== data[itemIndex][key]
            ) {
              data[itemIndex][key] =
                origin.items.price -
                Math.round((origin.items.price * origin.items.sale) / 100);
              console.log(data[itemIndex][key]);
            }
          }
        } else {
          if (origin.items.hasOwnProperty(key)) {
            if (
              origin.items[key as keyof CombinedItems] !== data[itemIndex][key]
            ) {
              data[itemIndex][key] = origin.items[key as keyof CombinedItems];
            }
          }
        }
      }
    }
  }
  
}
