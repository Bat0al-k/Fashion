export interface ProductInOrder {
  productId: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  name: string;
  brand?: string;
  image?: string;
  code?: string;
}

export interface Order {
  _id?: string;
  sessionId: string;
  customerEmail: string;
  amountTotal: number;
  currency: string;
  status: string;
  cardLast4: string;
  cardBrand: string;
  products: ProductInOrder[];
  createdAt: string;
}
