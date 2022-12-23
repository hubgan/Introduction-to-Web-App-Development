import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { MoneyTypeService } from 'src/app/services/money-type.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  showCartDetails: boolean = false;
  cartItems: Array<CartItem> = [];
  totalPrice: number = 0;

  moneyType: string = 'PLN';

  constructor(private cartService: CartService, private moneyTypeService: MoneyTypeService) { }

  ngOnInit(): void {
    this.cartService.cartItemsSubject.subscribe((cartItems) => {
      this.cartItems = cartItems;

      this.totalPrice = this.cartItems.reduce((sum, item) => {
        return item.price * item.quantity + sum;
      }, 0);
    })

    this.moneyTypeService.moneyType.subscribe((moneyType) => {
      this.moneyType = moneyType;
    })
  }

  switchCartDetailsVisibility() {
    this.showCartDetails = !this.showCartDetails;
  }
}
