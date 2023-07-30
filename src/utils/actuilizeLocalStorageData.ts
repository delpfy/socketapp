import { CombinedItems, Items } from "../redux/types";

export function actualizeData(data: any, origin: any){

    if (data !== undefined) {
        const itemIndex = data.findIndex(
          (item: Items) => item.name === origin.item.name
        );

        if (itemIndex !== -1) {
          for (const key in origin.item) {
            if (origin.item.hasOwnProperty(key)) {
              if (
                origin.item[key as keyof CombinedItems] !==
                data[itemIndex][key]
              ) {
                data[itemIndex][key] =
                  origin.item[key as keyof CombinedItems];
              }
            }
          }

          for (const key in data[itemIndex]) {
            if (
                data[itemIndex].hasOwnProperty(key) &&
              !origin.item.hasOwnProperty(key)
            ) {
              delete data[itemIndex][key];
            }
          }

        }
      }
}