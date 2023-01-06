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
  @Input() isUserOpinion: boolean = false;

  stars = [1, 2, 3, 4, 5];
  rating: number;
  hoverState = 0;

  constructor(private tripsService: TripsService) { }

  ngOnInit(): void {
    this.rating = 0
  }

  onStarEnter(starId: number) {
    this.hoverState = starId;
  }

  onStarLeave() {
    this.hoverState = 0;
  }

  onStarClicked(starId: number) {
    this.rating = starId;
    const editedTrip = { ...this.trip, images: this.trip.images, rating: this.trip.rating + this.rating, numberOfRatings: this.trip.numberOfRatings + 1 };

    this.tripsService.updateTrip(editedTrip.id, editedTrip)
      .then(() => {
        console.log("Edited succesfuly");
      }, (error) => {
        console.log(error);
      });
  }
}
