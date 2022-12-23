import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip';
import { TripsService } from '../services/trips.service';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor(private tripsSerivce: TripsService) { }

  transform(trips: Array<Trip>, filter: { [key: string]: any }): Array<Trip> {
    let list = trips;

    if (filter['country'] != null) {
      list = list.filter(trip => trip.country.toLowerCase().includes(filter['country'].toLowerCase()));
    }

    if (filter['startDate'] != null) {
      list = list.filter(trip => trip.startDate >= filter['startDate']);
    }

    if (filter['endDate'] != null) {
      list = list.filter(trip => trip.endDate <= filter['endDate']);
    }

    if (filter['rating'] != null) {
      list = list.filter(trip => trip.rating <= filter['rating'])
    }

    if (filter['minPrice'] != null) {
      list = list.filter(trip => trip.unitPrice >= filter['minPrice']);
    }

    if (filter['maxPrice'] != null && filter['maxPrice'] !== 0) {
      list = list.filter(trip => trip.unitPrice <= filter['maxPrice']);
    }

    let min = Infinity;
    let max = -Infinity;

    list.forEach((trip) => {
      min = Math.min(min, trip.unitPrice);
      max = Math.max(max, trip.unitPrice);
    })

    let prices = {
      minPrice: min,
      maxPrice: max
    }

    return list.map((trip) => {
      return { ...trip, prices };
    });
  }

}
