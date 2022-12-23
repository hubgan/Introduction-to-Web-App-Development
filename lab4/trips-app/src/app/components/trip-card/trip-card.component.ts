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

  @Output() id = new EventEmitter<number>();

  minPrice = 0
  maxPrice = Infinity

  moneyType: string = 'PLN';

  availablePlaces: number = 0;
  currentClasses = {};

  constructor(private tripsService: TripsService, private moneyTypeService: MoneyTypeService, private cartService: CartService) { }

  ngOnInit(): void {
    this.availablePlaces = this.trip.availablePlaces;
    this.setCurrentClasses();

    this.moneyTypeService.moneyType.subscribe((moneyType) => {
      this.moneyType = moneyType;
    })
  }

  removeReservation() {
    this.availablePlaces += 1;

    const tripInfo = {
      id: this.trip.id,
      name: this.trip.name,
      quantity: this.trip.availablePlaces - this.availablePlaces,
      price: this.trip.unitPrice
    }

    this.cartService.cartRemoveReservation(tripInfo);
  }

  addReservation() {
    this.availablePlaces -= 1;

    const tripInfo = {
      id: this.trip.id,
      name: this.trip.name,
      quantity: this.trip.availablePlaces - this.availablePlaces,
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
