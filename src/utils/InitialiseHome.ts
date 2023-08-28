import { ItemsDisplay, Status } from "../redux/types";

export const InitialiseHome = () => {
  const categories = [
    {
      id: 1,
      name: "Ноутбуки",
      image:
        require("../img/categories/laptops.png"),
    },
    {
      id: 2,
      name: "Монітори",
      image:
      require("../img/categories/monitors.png"),
    },
    /* {
      id: 3,
      name: "Планшети",
      image:
        "https://thumb.tildacdn.com/tild3065-3839-4132-b038-343138333930/-/format/webp/premium_photo-168037.jpg",
    }, */
    {
      id: 4,
      name: "Комп'ютери",
      image:
      require("../img/categories/computers.png"),
    },
    {
      id: 5,
      name: "Комп'ютерні комплектуючі",
      image:
      require("../img/categories/computers.png"),},
    
    {
      id: 6,
      name: "Геймінг",
      image:
      require("../img/categories/computers.png"),},
    {
      id: 7,
      name: "Мережеве обладнання",
      image:
      require("../img/categories/network.png"),},
    {
      id: 8,
      name: "Аксесуари для електроніки",
      image:
      require("../img/categories/electronic.png"),},
    {
      id: 9,
      name: "Кабелі та перехідники",
      image:
      require("../img/categories/cabels.png"),},
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
    editItemMode: false,
    itemsComparison: [],
    itemsFavorites: [],
    itemCurrent: {} as any,
    differencesMode: false,
    categories,
    category: "Монітори",
  };
};
