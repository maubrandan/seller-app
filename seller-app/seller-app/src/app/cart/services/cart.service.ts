import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './../../models/product.model';  // Asegúrate de tener un modelo de Producto

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cart = new BehaviorSubject<Product[]>([]);
  cart$ = this.cart.asObservable();

  constructor() {}

  addToCart(product: Product): void {
    const currentCart = this.cart.value;
    const updatedCart = [...currentCart, product];
    this.cart.next(updatedCart);
  }

  removeFromCart(productId: number): void {
    const currentCart = this.cart.value;
    const updatedCart = currentCart.filter(product => product.productID !== productId);
    this.cart.next(updatedCart);
  }

  clearCart(): void {
    this.cart.next([]);
  }
}
