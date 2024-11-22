import { OrderDetail } from './order-detail.model';

export interface Order {
  orderID: number;
  userID: number;
  orderDate: Date;
  total: number;
  status: string;
  orderDetails: OrderDetail[];
}
