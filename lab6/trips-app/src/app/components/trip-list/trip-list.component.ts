import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Trip } from 'src/app/models/trip';
import { MoneyTypeService } from 'src/app/services/money-type.service';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit, OnDestroy {

  trips: Array<Trip> = [];

  error: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = "";

  filters: any = {
    country: null,
    minPrice: 0,
    maxPrice: null,
    startDate: null,
    endDate: null,
    rating: null
  }

  tripsSubsribe: Subscription;

  ngSelect: string;

  breakpoint: number;

  constructor(private tripsService: TripsService, private moneyTypeService: MoneyTypeService) { }

  ngOnInit(): void {
    this.setBreakPoint(window.innerWidth);
    this.ngSelect = this.moneyTypeService.getMoneyType();
    this.getTrips();
  }

  setBreakPoint(width: number) {
    this.breakpoint = Math.floor(width / 460);
  }

  onResize(event: any) {
    this.setBreakPoint(event.target.innerWidth);
  }

  ngOnDestroy(): void {
    this.tripsSubsribe.unsubscribe();
  }

  getTrips() {
    this.error = false;
    this.isLoading = true;

    this.tripsSubsribe = this.tripsService.getAllTrips().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ ...c.payload.doc.data(), id: c.payload.doc.id })
        )
      )
    ).subscribe(data => {
      this.trips = data;
      this.setMinMaxForFilters();
      this.isLoading = false;
      this.error = false;
    }, (error) => {
      this.error = true;
      this.errorMessage = error.message;
      this.isLoading = false;
    });
  }

  removeTrip(id: string) {
    this.error = false;

    this.tripsService.removeTrip(id)
      .then(() => {
        this.error = false;
        console.log('Trip delete successfully!');
      })
      .catch((error) => {
        this.error = true;
        this.errorMessage = error.message;
      });
  }

  filtersChange(filters: Object) {
    this.filters = filters;
  }

  setMinMaxForFilters() {
    let min = Infinity;
    let max = -Infinity;

    this.trips.forEach((trip) => {
      min = Math.min(min, trip.unitPrice);
      max = Math.max(max, trip.unitPrice);
    })

    const prices = {
      minPrice: min,
      maxPrice: max
    }

    this.tripsService.editMinMaxPrice(prices);
  }

  updateMoneyType(target: string) {
    this.moneyTypeService.setMoneyType(target);
    this.setMinMaxForFilters();
  }
}
