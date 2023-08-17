import { CombinedItems, Items } from "../redux/types";

export function actualizeData(data: any, origin: any) {
  if (data !== undefined) {
    const itemIndex = data.findIndex(
      (items: Items) => items.name === origin.items.name
    );

    if (itemIndex !== -1) {
      for (const key in origin.items) {
        console.log(key);
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
