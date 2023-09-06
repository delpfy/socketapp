import { ItemsDisplay, Status } from "../redux/types";

export const InitialiseHome = () => {
  const categories = [
    {
      id: 1,
      name: "Ноутбуки",
      image: require("../img/categories/laptops.png"),
    },
    {
      id: 2,
      name: "Комп'ютери",
      image: require("../img/categories/computers.png"),
    },
    {
      id: 3,
      name: "Комп'ютерні комплектуючі",
      image: require("../img/categories/compl.png"),
    },

    {
      id: 4,
      name: "Геймінг",
      image: require("../img/categories/gayming.png"),
    },
    {
      id: 5,
      name: "Монітори",
      image: require("../img/categories/monitors.png"),
    },
    {
      id: 6,
      name: "Мережеве обладнання",
      image: require("../img/categories/network.png"),
    },
    {
      id: 7,
      name: "Аксесуари для електроніки",
      image: require("../img/categories/electronic.png"),
    },
    {
      id: 8,
      name: "Кабелі та перехідники",
      image: require("../img/categories/cabels.png"),
    },
  ];

  const computerPartsSubcategory = [
    {
      id: 31,
      name: "Материнські плати",
      image: require("../img/categories/compl-subcategory/mat.png"),
    },
    {
      id: 32,
      name: "Процесори",
      image: require("../img/categories/compl-subcategory/proc.png"),
    },
    {
      id: 33,
      name: "Оперативна пам'ять",
      image: require("../img/categories/compl-subcategory/ram.png"),
    },
    {
      id: 34,
      name: "Відеокарти",
      image: require("../img/categories/compl-subcategory/video.png"),
    },
    {
      id: 35,
      name: "Жорсткі диски",
      image: require("../img/categories/compl-subcategory/hdd.png"),
    },
    {
      id: 36,
      name: "Блоки живлення",
      image: require("../img/categories/compl-subcategory/power.png"),
    },
    {
      id: 37,
      name: "Системи охолодження",
      image: require("../img/categories/compl-subcategory/freeze.png"),
    },
    {
      id: 38,
      name: "SSD диски",
      image: require("../img/categories/compl-subcategory/ssd.png"),
    },
    {
      id: 39,
      name: "Корпуси",
      image: require("../img/categories/compl-subcategory/corpus.png"),
    },
  ];

  const gamingSubcategory = [
    {
      id: 41,
      name: "Миші",
      image: require("../img/categories/gaming-subcategory/mouse.png"),
    },
    {
      id: 42,
      name: "Клавіатури",
      image: require("../img/categories/gaming-subcategory/keyboard.png"),
    },
    {
      id: 43,
      name: "Навушники",
      image: require("../img/categories/gaming-subcategory/head.png"),
    },
    {
      id: 44,
      name: "Килимки",
      image: require("../img/categories/gaming-subcategory/carp.png"),
    },
    {
      id: 45,
      name: "Мікрофони",
      image: require("../img/categories/gaming-subcategory/mic.png"),
    },
   
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
    computerPartsSubcategory,
    gamingSubcategory,
    category: "Монітори",
    subcategory: "",
    reset: false,
  };
};
