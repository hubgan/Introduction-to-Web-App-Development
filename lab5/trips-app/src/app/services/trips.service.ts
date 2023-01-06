import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Subject } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripsService {

  private collection = '/trips';
  tripsRef: AngularFirestoreCollection<Trip>;

  public minPrice = new Subject<number>();
  public maxPrice = new Subject<number>();

  constructor(private db: AngularFirestore) {
    this.tripsRef = db.collection(this.collection);
  }

  getAllTrips() {
    return this.tripsRef;
  }

  getTrip(id: string) {
    return this.tripsRef.doc(id).get();
  }

  removeTrip(id: string) {
    return this.tripsRef.doc(id).delete();
  }

  addTrip(trip: Trip) {
    return this.tripsRef.add({ ...trip });
  }

  updateTrip(id: string, data: any) {
    return this.tripsRef.doc(id).update(data);
  }

  editMinMaxPrice(prices: any) {
    this.minPrice.next(prices.minPrice);
    this.maxPrice.next(prices.maxPrice);
  }
}
