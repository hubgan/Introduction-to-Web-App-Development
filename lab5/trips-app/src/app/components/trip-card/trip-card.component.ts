import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { CartService } from 'src/app/services/cart.service';
import { MoneyTypeService } from 'src/app/services/money-type.service';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent implements OnInit {
  @Input() trip!: Trip;

  @Output() id = new EventEmitter<string>();

  minPrice = 0;
  maxPrice = Infinity;

  moneyType: string = this.moneyTypeService.getMoneyType();

  reservationAmount: number = 0;
  currentClasses = {};

  constructor(private moneyTypeService: MoneyTypeService, private cartService: CartService) { }

  ngOnInit(): void {
    this.setReservationAmount();
    this.setCurrentClasses();

    this.moneyTypeService.moneyType.subscribe((moneyType) => {
      this.moneyType = moneyType;
    })
  }

  setReservationAmount() {
    const cartItems = this.cartService.getCartItems();
    const cartIndex = cartItems.findIndex((item) => item.id === this.trip.id);

    if (cartIndex !== -1) {
      this.reservationAmount = cartItems[cartIndex].quantity;
    }
    else {
      this.reservationAmount = 0;
    }
  }

  removeReservation() {
    this.reservationAmount -= 1;

    const tripInfo = {
      id: this.trip.id,
      name: this.trip.name,
      quantity: this.reservationAmount,
      price: this.trip.unitPrice
    }

    this.cartService.cartRemoveReservation(tripInfo);
  }

  addReservation() {
    this.reservationAmount += 1;

    const tripInfo = {
      id: this.trip.id,
      name: this.trip.name,
      quantity: this.reservationAmount,
      price: this.trip.unitPrice
    }

    this.cartService.cartAddReservation(tripInfo);
  }

  setCurrentClasses() {
    this.currentClasses = {
      min: this.trip.prices?.minPrice == this.trip.unitPrice,
      max: this.trip.prices?.maxPrice == this.trip.unitPrice
    }
  }

  delete() {
    this.id.emit(this.trip.id);
  }
}
