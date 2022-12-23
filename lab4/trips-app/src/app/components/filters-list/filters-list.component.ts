import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: ['./filters-list.component.css']
})
export class FiltersListComponent implements OnInit {
  @Output() filters: EventEmitter<Object> = new EventEmitter();

  constructor(private tripsService: TripsService) { }

  minPrice = 0
  maxPrice = Infinity

  fields: any = {
    country: null,
    minPrice: 0,
    maxPrice: null,
    startDate: null,
    endDate: null,
    rating: null
  }

  filter = {}

  ngOnInit(): void {
    this.tripsService.minPrice.subscribe((value) => {
      this.minPrice = value;
    })

    this.tripsService.maxPrice.subscribe((value) => {
      this.maxPrice = value;
    })
  }

  updateFilters() {
    Object.keys(this.fields).forEach(key => this.fields[key] === '' ? delete this.fields[key] : key);
    this.filter = Object.assign({}, this.fields);
    this.filters.emit(this.filter);
  }

}
