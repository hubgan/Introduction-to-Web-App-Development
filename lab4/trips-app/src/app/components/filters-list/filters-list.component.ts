import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Trip } from 'src/app/models/trip';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-filters-list',
  templateUrl: './filters-list.component.html',
  styleUrls: ['./filters-list.component.css']
})
export class FiltersListComponent implements OnInit {
  @Input() trips: Array<Trip>;
  @Output() filters: EventEmitter<Object> = new EventEmitter();

  constructor(private tripsService: TripsService, private formBuilder: FormBuilder) { }

  minPrice = 0;
  maxPrice = Infinity;

  form: FormGroup;
  dropdownData: Array<any> = [];

  settings = {
    "singleSelection": false,
    "defaultOpen": false,
    "idField": "item_id",
    "textField": "item_text",
    "selectAllText": "Select All",
    "unSelectAllText": "UnSelect All",
    "enableCheckAll": false,
    "itemsShowLimit": 3,
    "allowSearchFilter": false
  }

  filter = {}

  ngOnInit(): void {
    this.initForm();

    this.tripsService.minPrice.subscribe((value) => {
      this.minPrice = value;
    })

    this.tripsService.maxPrice.subscribe((value) => {
      this.maxPrice = value;
    })

    this.form.valueChanges.subscribe(() => {
      this.updateFilters();
    })
  }

  ngOnChanges() {
    const dataArray: Array<any> = [];
    this.trips.forEach((trip) => {
      dataArray.push({ item_id: trip.id, item_text: trip.country, group: 'G' })
    })

    this.dropdownData = dataArray;
  }

  initForm() {
    this.form = this.formBuilder.group({
      country: [''],
      minPrice: [0],
      maxPrice: [Infinity],
      startDate: [null],
      endDate: [null],
      rating: [null]
    });
  }

  updateFilters() {
    Object.keys(this.form.value).forEach(key => this.form.value[key] === '' ? delete this.form.value[key] : key);
    this.filter = Object.assign({}, this.form.value);
    this.filters.emit(this.filter);
  }

}
