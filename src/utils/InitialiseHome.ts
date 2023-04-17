import { IItemDisplay, IItemsDisplay, Status } from "../redux/types";

export const InitialiseHome = () => {
  const categories = [
    { id: 1, name: "Ноутбуки" },
    { id: 2, name: "Монітори" },
    { id: 3, name: "Планшети" },
  ];

  return {
    id: 0,
    status: "" as Status,
    itemsDisplay: {} as IItemsDisplay,
    itemsCategory: {} as IItemsDisplay,
    itemCurrent: {} as IItemDisplay,
    categories,
    category: "Монітори",
  };
};
