import { Category, ItemsDisplay, Status } from "../redux/types";

export const InitialiseHome = () => {
  const categories = [] as any[];

  const computerPartsSubcategory = [] as any[];

  const gamingSubcategory = [] as any[];

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
    uniqueItemFieldsNames: [] as any,
    uniqueItemFieldsValues: [] as any,
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
    categoriesDisplay: [] as Category[],
    computerPartsSubcategory,
    gamingSubcategory,
    category: "",
    category_slug: "",
    subcategory: "",
    reset: false,
  };
};
