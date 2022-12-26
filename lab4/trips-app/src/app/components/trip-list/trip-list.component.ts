import { Component, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { MoneyTypeService } from 'src/app/services/money-type.service';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {

  trips: Array<Trip> = [];
  error: boolean = false;

  filters: any = {
    country: null,
    minPrice: 0,
    maxPrice: null,
    startDate: null,
    endDate: null,
    rating: null
  }

  constructor(private tripsService: TripsService, private moneyTypeService: MoneyTypeService) { }

  ngOnInit(): void {
    this.getTrips();
  }

  getTrips() {
    this.error = false;
    this.tripsService.getAllTrips().subscribe(data => {
      this.trips = data;
      this.setMinMaxForFilters();
    }, error => {
      this.error = true;
    });
  }

  removeTrip(id: number) {
    console.log(id);
    this.tripsService.removeTrip(id).subscribe(data => {

      this.getTrips();
    }, error => {
      console.log("Could not delete trip");
    })
  }

  filtersChange(filters: Object) {
    this.filters = filters;
    this.getTrips();
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

  updateMoneyType(target: any) {
    this.moneyTypeService.setMoneyType(target.value);
  }
}
