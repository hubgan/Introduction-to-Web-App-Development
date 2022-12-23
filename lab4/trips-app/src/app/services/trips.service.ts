import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripsService {
  serviceUrl: string;
  public minPrice = new Subject<number>();
  public maxPrice = new Subject<number>();

  constructor(private http: HttpClient) {
    this.serviceUrl = "http://localhost:3000/trips";
  }

  getAllTrips() {
    return this.http.get<Array<Trip>>(this.serviceUrl);
  }

  removeTrip(id: number) {
    return this.http.delete<Trip>(`${this.serviceUrl}/${id}`);
  }

  addTrip(trip: Trip) {
    return this.http.post<Trip>(this.serviceUrl, trip);
  }

  editTripRating(trip: Trip) {
    return this.http.put<Trip>(this.serviceUrl + '/' + trip.id, trip);
  }

  editMinMaxPrice(prices: any) {
    this.minPrice.next(prices.minPrice);
    this.maxPrice.next(prices.maxPrice);
  }
}
