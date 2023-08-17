import { CombinedItems, Items } from "../redux/types";

export function actualizeFirstRender(data: any, origin: any) {
  if (data !== undefined) {
    const itemIndex = data.findIndex(
      (items: Items) => items.name === origin.name
    );

    if (itemIndex !== -1) {
      for (const key in origin) {
        console.log(key);
        if (origin.hasOwnProperty(key)) {
          if (origin[key as keyof CombinedItems] !== data[itemIndex][key]) {
            data[itemIndex][key] = origin[key as keyof CombinedItems];
          }
        }
      }
    }
  }
}
