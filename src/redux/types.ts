


export type IItemsDisplay = {
  items: IItems[];
};
export type IItemDisplay = {
  items: IItems;
};
export type IBasketItemsDisplay = {
  items: IBasketItems[];
};
export type IBasketItemDisplay = {
  items: IBasketItems;
};
export type IUserDisplay = {
  user: IUser
}




export type IItems = {
  _id: string;
  category: string;
  name: string;
  price: number;
  rating: number;
  image: string[];
  description: string;
};

export type IBasketItems = {
  _id: string;
  category: string;
  name: string;
  price: number;
  rating: number;
  amount: number;
  image: string[];
  description: string;
};

export type IUser = {
  _id: string;
  fullName: string;
  email: string;
  passwordHash: string;
  role : string;
  avatarUrl: string;
}

export type IUserLogin = {
  email : string;
  
  password : string;
}

export type IUserRegister = {
  email : string;
  fullName: string;
  role: string;
  password : string;
}

export type Status = 'success' | 'pending' | 'error'

export interface BasketState {
  status: Status;
  items: IBasketItemsDisplay;
  basketItemCurrent: IBasketItemDisplay;
  expences: number;
  isOnItemPage: boolean;
}

export interface HomeState {
  status: Status;
  id: number;
  itemsDisplay: IItemsDisplay;
  itemsCategory: IItemsDisplay;
  itemCurrent: IItemDisplay;
  categories: {id: number, name: string}[] ;
  category: string;
}
