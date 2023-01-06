import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartItemsSubject = new BehaviorSubject<Array<CartItem>>([]);

  private cartItems: Array<CartItem> = [];

  constructor() { }

  cartAddReservation(information: CartItem) {
    const itemIndex = this.cartItems.findIndex((item) => item.id == information.id);

    if (itemIndex === -1) {
      this.cartItems.push(information);
    }
    else {
      this.cartItems[itemIndex].quantity += 1;
    }

    this.cartItemsSubject.next(this.cartItems);
  }

  cartRemoveReservation(information: CartItem) {
    const itemIndex = this.cartItems.findIndex((item) => item.id == information.id);

    if (itemIndex === -1) return;

    this.cartItems[itemIndex].quantity -= 1;

    if (this.cartItems[itemIndex].quantity === 0) {
      this.cartItems.splice(itemIndex, 1);
    }

    this.cartItemsSubject.next(this.cartItems);
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsSubject.next(this.cartItems);
  }
}
