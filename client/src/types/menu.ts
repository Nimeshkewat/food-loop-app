export interface Menu {
  _id: string;
  restaurant: string;
  name: string;
  description: string;
  price: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface MenuInputState {
  name: string;
  description: string;
  price: string;
}

export interface MenuResponse {
  success: boolean;
  message: string;
  menu: Menu;
}

export interface GetMenuResponse {
  success: boolean;
  message: string;
  menus: Menu[];
}
