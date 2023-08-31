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
      name: "Комп'ютери",
      image:
      require("../img/categories/computers.png"),
    },
    {
      id: 3,
      name: "Комп'ютерні комплектуючі",
      image:
      require("../img/categories/compl.png"),},
    
    {
      id: 4,
      name: "Геймінг",
      image:
      require("../img/categories/gayming.png"),},
      {
        id: 5,
        name: "Монітори",
        image:
        require("../img/categories/monitors.png"),
      },
    {
      id: 6,
      name: "Мережеве обладнання",
      image:
      require("../img/categories/network.png"),},
    {
      id: 7,
      name: "Аксесуари для електроніки",
      image:
      require("../img/categories/electronic.png"),},
    {
      id: 8,
      name: "Кабелі та перехідники",
      image:
      require("../img/categories/cabels.png"),},
  ];

  return {
    id: 0,
    status: "" as Status,
    item_status: "" as Status,
    itemAppendingId: "",
    itemFavoritesId: "",
    itemCompareId: "",
    itemsDisplay: {} as ItemsDisplay,
    itemsSortedParams: {} as ItemsDisplay,
    itemsCategory: {} as any,
    itemsSorted: {} as ItemsDisplay,
    sorted: false,
    editItemMode: false,
    itemsComparison: [],
    itemsFavorites: [],
    itemCurrent: {} as any,
    itemsPromotionOffer: {} as any,
    itemsNew: {} as any,
    itemsTopSale: {} as any,
    itemsTopRating: {} as any,
    currentImages: [] as any,
    differencesMode: false,
    categories,
    category: "Монітори",
  };
};
