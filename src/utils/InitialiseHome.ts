import {  ItemsDisplay, Status } from "../redux/types";

export const InitialiseHome = () => {
  const categories = [
    {
      id: 1,
      name: "Ноутбуки",
      image:
        "https://thumb.tildacdn.com/tild6333-6535-4966-b363-653165623661/-/format/webp/premium_photo-168166.jpg",
    },
    {
      id: 2,
      name: "Монітори",
      image:
        "https://static.tildacdn.info/lib/unsplash/9916f556-1129-f104-39d1-4cfb1aa87941/photo.jpg",
    },
    {
      id: 3,
      name: "Планшети",
      image:
        "https://thumb.tildacdn.com/tild3065-3839-4132-b038-343138333930/-/format/webp/premium_photo-168037.jpg",
    },
  ];

  return {
    id: 0,
    status: "" as Status,
    item_status: "" as Status,
    itemAppendingId: "",
    itemsDisplay: {} as ItemsDisplay,
    itemsSortedParams: {} as ItemsDisplay,
    itemsCategory: {} as any,
    itemsSorted: {} as ItemsDisplay,
    sorted: false,
  
   
    
    itemCurrent: {} as any,
    
    categories,
    category: "Монітори",
  };
};
