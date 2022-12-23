import { Pipe, PipeTransform } from '@angular/core';
import { Trip } from '../models/trip';
import { MoneyTypeService } from '../services/money-type.service';
import { TripsService } from '../services/trips.service';

interface countries {
  item_id: number,
  item_text: string,
  group: string
}

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  constructor(private moneyTypeService: MoneyTypeService) { }

  transform(trips: Array<Trip>, filter: { [key: string]: any }): Array<Trip> {
    let list = trips;

    if (filter['country'] != null && filter['country'].length !== 0) {
      list = list.filter((trip) => {
        return filter['country'].some((element: countries) => {
          return element.item_text == trip.country;
        })
      })
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

    if (filter['price'] != null && filter['price'][0] != null) {
      list = list.filter(trip => this.moneyTypeService.getMoneyValue(trip.unitPrice) >= filter['price'][0]);
    }

    if (filter['price'] != null && filter['price'][1] != null && filter['price'][1] !== 0) {
      list = list.filter(trip => this.moneyTypeService.getMoneyValue(trip.unitPrice) <= filter['price'][1]);
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
