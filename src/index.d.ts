export interface Category {
  categoryId: string;
  categoryLabel: string;
}

export interface Item {
  itemId: string;
  itemLink: string;
  itemLabel: string;
  itemDescription?: string;
  itemPrice: number;
  itemImage?: string;
  categoryId: string;
  isOpen: boolean;
  isReserved: boolean;
  reservedBy: string;
}

export interface ReservePayload {
  itemId: string;
  reservedBy: string;
  isReserved?: boolean;
  isOpen?: boolean;
}

export interface RootState {
  activeCategory: string;
  categories: Category[];
  items: Item[];
}
