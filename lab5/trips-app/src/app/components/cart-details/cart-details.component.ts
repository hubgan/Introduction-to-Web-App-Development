import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from 'src/app/models/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { MoneyTypeService } from 'src/app/services/money-type.service';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  constructor(private cartService: CartService, private moneyTypeService: MoneyTypeService, private tripsService: TripsService, private router: Router) { }

  cartItems: Array<CartItem> = [];
  moneyType: string = this.moneyTypeService.getMoneyType();
  totalPrice: number;
  totalQuantity: number;
  isLoading: boolean = true;

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();

    [this.totalPrice, this.totalQuantity] = this.cartItems.reduce((acc, item) => {
      return [item.price * item.quantity + acc[0], acc[1] + item.quantity];
    }, [0, 0]);

    this.moneyTypeService.moneyType.subscribe((moneyType) => {
      this.moneyType = moneyType;
      console.log(this.moneyType)
    })
  }

  onClick() {
    this.isLoading = true;

    if (this.cartItems.length > 0) {
      const valueToUpdate = this.cartItems.map((item) => {
        return {
          id: item.id,
          availablePlaces: item.totalPlaces - item.quantity
        };
      });

      Promise.all((valueToUpdate.map((value) => this.tripsService.updateTrip(value.id, { availablePlaces: value.availablePlaces }))))
        .then(() => {
          this.cartService.clearCart();
          this.isLoading = false;
          this.router.navigate(['/trips']);
        })
        .catch((error) => {
          this.isLoading = false;
          throw error.message;
        })
    }
  }

}
