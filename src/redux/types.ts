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

export type Combinedreply = TReplyGET | TReplyPOST;

export type Items = {
  _id: string;
  category: string;
  name: string;
  price: number;
  sale: number;
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
  rating: number;
  amount: number;
  image: string[];
  description: string;
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
  items: TShippingItemsDisplay;
  basketItemCurrent: ShippingItemDisplay;
  itemsAmount: number;
}

export interface HomeState {
  status: Status;
  id: number;
  itemsDisplay: ItemsDisplay;
  itemsCategory: ItemsDisplay;
  itemCurrent: TShippingItems | Items;
  categories: { id: number; name: string; image: string }[];
  category: string;
}
