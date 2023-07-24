export type ItemsDisplay = {
  items: Items[];
};
export type ItemDisplay = {
  items: Items;
};
export type ShippingItemsDisplay = {
  items: ShippingItems[];
};
export type ShippingItemDisplay = {
  items: ShippingItems;
};
export type ReviewsDisplay = {
  reviews: IReviewGET[];
};
export type UserDisplay = {
  user: User;
};

export type IReviewGET = {
  _id: string,
  item: string,
  user: string,
  userName: string,
  description: string,
  rating: number,
  advantages: string,
  disadvantages: string,
  createdAt: string,
  updatedAt: string,
};

export type IReviewPOST = {
  _id: string
  item: string,
  userName: string,
  description: string,
  rating: number,
  advantages: string,
  disadvantages: string,
};

export type Items = {
  _id: string;
  category: string;
  name: string;
  price: number;
  sale: number;
  rating: number;
  image: string[];
  description: string;
};

export type ShippingItems = {
  _id: string;
  category: string;
  name: string;
  price: number;
  sale: number;
  rating: number;
  amount: number;
  image: string[];
  description: string;
};

export type User = {
  _id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role: string;
  expences: number;
  avatarUrl: string;
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

export interface BasketState {
  status: Status;
  items: ShippingItemsDisplay;
  basketItemCurrent: ShippingItemDisplay;
  itemsAmount: number;
  isOnItemPage: boolean;
}

export interface HomeState {
  status: Status;
  id: number;
  itemsDisplay: ItemsDisplay;
  itemsCategory: ItemsDisplay;
  itemCurrent: ShippingItems | Items;
  categories: { id: number; name: string, image: string}[];
  category: string;
}
