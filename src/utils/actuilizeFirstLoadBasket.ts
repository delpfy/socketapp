import { CombinedItems, Items } from "../redux/types";

export function actualizeFirstRenderBasket(data: any, origin: any) {
  if (data !== undefined) {
    const itemIndex = data.findIndex(
      (items: Items) => items.name === origin.name
    );

    if (itemIndex !== -1) {
      for (const key in origin) {
        console.log(key === "price");
        if (key === "price") {
          if (origin.hasOwnProperty(key)) {
            if (origin[key as keyof CombinedItems] !== data[itemIndex][key]) {
              data[itemIndex][key] =
                origin.price - Math.round((origin.price * origin.sale) / 100);
              console.log(data[itemIndex][key]);
            }
          }
        } else {
          if (origin.hasOwnProperty(key)) {
            if (origin[key as keyof CombinedItems] !== data[itemIndex][key]) {
              data[itemIndex][key] = origin[key as keyof CombinedItems];
            }
          }
        }
      }
    }
  }
}
