import { Product } from './product.model';

export interface OrderDetail {
  orderDetailID: number;
  orderID: number;
  productID: number;
  quantity: number;
  unitPrice: number;
  product: Product;
}
