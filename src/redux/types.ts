export type ItemsDisplay = {
  items: Items[];
};
export type ItemDisplay = {
  items: Items;
};
export type TShippingItemsDisplay = {
  items: TShippingItems[];
};
export type ShippingItemDisplay = {
  items: TShippingItems;
};
export type ReviewsDisplay = {
  reviews: IReviewGET[];
};
export type UserDisplay = {
  user: User;
};

export type IReviewGET = {
  _id: string;
  item: string;
  user: string;
  userName: string;
  description: string;
  rating: number;
  replies: TReplyGET[];
  advantages: string;
  disadvantages: string;
  createdAt: string;
  updatedAt: string;
};

export type IReviewPOST = {
  _id: string;
  item: string;
  userName: string;
  description: string;
  rating: number;
  advantages: string;
  replies: TReplyPOST[];
  disadvantages: string;
};

export type Items = {
  _id: string;
  user: string;
  category: string;
  name: string;
  price: number;
  quantity: number;
  sale: number;
  rating: number;
  reviewsAmount: number;
  image: string[];
  description: string;
  fields: any;
  createdAt: string;
};

export type ItemsPOST = {
  category: string;
  name: string;
  price: number;
  sale: number;
  quantity: number;
  rating: number;
  reviewsAmount: number;
  image: string[];
  description: string;
};

export type TShippingItems = {
  _id: string;
  category: string;
  name: string;
  price: number;
  sale: number;
  quantity: number;
  rating: number;
  amount: number;
  image: string[];
  description: string;
  fields: any;
};

export type CombinedItems = Items | TShippingItems;

export type TReplyPOST = {
  user: string;
  userName: string;
  description: string;
};

export type TReplyGET = {
  _id: string;
  user: string;
  userName: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  _id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role: string;
  expences: number;
  avatarUrl: string;
  emailConfirmed: boolean;
};

export type UserUpdate = {
  fullName: string;
  email: string;
  password: string;
  role: string;
  avatarUrl: string;
};

export type UserLogin = {
  email: string;
  password: string;
};

export type UserRegister = {
  email: string;
  fullName: string;
  role: string;
  password: string;
  expences: number;
  avatarUrl: string;
};

export type Status = "success" | "pending" | "error";

export type TLocationCity = {
  display_name: string;
};

export type TLocationNova = {
  data: {
    Description: string;
  }[];
};

export type TPost = {
  _id: string;
  title: string;
  image: string;
  description: string;
  content: any;
  createdAt: string;
  updatedAt: string;
};

export type TPostGET = {
  post: {
    _id: string;
    title: string;
    image: string;
    description: string;
    content: any;
    createdAt: string;
    updatedAt: string;
  };
};
export type TPostPOST = {
  title: string;
  image: string;
  description: string;
  content: any;
};

export type TPostDisplay = {
  posts: TPost[];
};

export type TOrder = {
  user_location: {
    city_location: string;
  };
  receiver: {
    userIsReceiver: boolean;
    contact: {
      name: string;
      surname: string;
      email: string;
      phone: string;
    };
  };
  user_contact: {
    name: string;
    surname: string;
    email: string;
    phone: string;
  };
  delivery: {
    delivery_type: string;
    delivery_cost: number;
    delivery_location: {
      street: string;
      houseNumber: string;
      apartmentNumber: string;
      floorNumber: string;
    };
    novaDepartment: string;
    liftRequired: boolean;
    elevator: boolean;
  };
  payment: {
    payment_type: string;
    uponReceipt: boolean;
    card: {
      number: string;
      date: string;
      cvv: string;
    };
  };
  payWithParts: {
    months: number;
    perMonth: number;
    firstPay: number;
  };
  items: Items[];
  total: number;
  numberOfOrder: string;
};

export type TOrders = {
  orders: TOrder[];
};

export type Category = {
  _id: string;
  name: string;
  image: string;
  subcategories: Category[];
};

export type Attribute = {
  _id: any;
  category: string;
  attributes: {name: string, value: string}[];
};

export type AdminProcesses =
  | "none"
  | "add-category"
  | "add-subcategory"
  | "edit-subcategory"
  | "edit-category"
  | "show-one-category"
  | "show-many-items"
  | "edit-one-item"
  | "add-one-item"
  | "show-many-attributes"
  | "show-many-categories"
  | "show-many-reviews"
  | "show-many-users"
  | "add-one-user"
  | "edit-one-user"
  | "show-many-orders"
  | "show-one-order"
;

export interface SelectedSortParams {
  [paramName: string]: string[];
}

export interface BasketState {
  status: Status;
  items: TShippingItems[];
  afterOrder: boolean;
  basketItemCurrent: ShippingItemDisplay;
  itemsAmount: number;
}

export interface HomeState {
  status: Status;
  item_status: Status;
  itemAppendingId: string;
  itemFavoritesId: string;
  itemCompareId: string;
  id: number;
  editItemMode: boolean;
  differencesMode: boolean;
  itemsDisplay: ItemsDisplay;
  itemsSortedParams: ItemsDisplay;
  itemsCategory: any;
  uniqueItemFieldsNames: any;
uniqueItemFieldsValues: any;
  itemsSorted: ItemsDisplay;

  itemsComparison: any;
  itemsFavorites: any;

  itemsPromotionOffer: any;
  itemsNew: any;
  itemsTopSale: any;
  itemsTopRating: any;

  sorted: boolean;
  reset: boolean;
  itemCurrent: any;
  currentImages: any;
  categories: Category[];

  subcategory: string;
  category: string;
}
