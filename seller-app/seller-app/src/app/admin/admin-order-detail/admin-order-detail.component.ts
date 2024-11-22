// admin-order-detail.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderDetail } from './../../models/order-detail.model';
import { Product } from './../../models/product.model';

@Component({
  selector: 'app-admin-order-detail',
  templateUrl: './admin-order-detail.component.html',
  styleUrls: ['./admin-order-detail.component.scss']
})
export class AdminOrderDetailComponent implements OnInit {

  @Input() orderDetail: OrderDetail | null = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Simulación de carga de datos
    const orderId = this.route.snapshot.paramMap.get('id');
    this.loadOrderDetail(orderId);
  }

  loadOrderDetail(orderId: string | null) {
    if (orderId) {
      // Aquí cargarías los datos desde tu servicio backend
      // Esto es solo un ejemplo con datos estáticos
      this.orderDetail = {
        orderDetailID: 1,
        orderID: parseInt(orderId),
        productID: 101,
        quantity: 2,
        unitPrice: 29.99,
        product: {
          productID: 101,
          name: 'Sample Product',
          description: 'This is a sample product description.',
          price: 29.99,
          stock: 50,
          categoryID: 1,
          supplierID: 1,
          createdAt: new Date('2024-01-01')
        }
      };
    }
  }

}
