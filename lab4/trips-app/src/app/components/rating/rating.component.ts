import { Component, Input, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/trip';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  @Input() trip!: Trip;

  stars = [1, 2, 3, 4, 5];
  rating: number = 1;
  hoverState = 0;

  constructor(private tripsService: TripsService) { }

  ngOnInit(): void {
    this.rating = this.trip.rating;
  }

  onStarEnter(starId: number) {
    this.hoverState = starId;
  }

  onStarLeave() {
    this.hoverState = 0;
  }

  onStarClicked(starId: number) {
    this.rating = starId;
    const editedTrip = { ...this.trip, rating: this.rating };

    this.tripsService.editTripRating(editedTrip).subscribe(res => {
      console.log("Edited succesfully");
    }, error => {
      console.log(error);
    })
  }
}
