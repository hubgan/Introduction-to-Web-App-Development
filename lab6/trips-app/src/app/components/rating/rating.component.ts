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
    if (!JSON.parse(localStorage.getItem('user')!)) {
      this.rating = 0;
    }
    else {
      const userData = JSON.parse(localStorage.getItem('user')!);
      const userInfo = this.trip.ratingsUsersID.filter((rating) => rating.uid === userData.uid);

      userInfo.length > 0 ? this.rating = userInfo[0].rating : this.rating = 0;
    }
  }

  onStarEnter(starId: number) {
    this.hoverState = starId;
  }

  onStarLeave() {
    this.hoverState = 0;
  }

  onStarClicked(starId: number) {
    const userUID = JSON.parse(localStorage.getItem('user')!).uid;
    let editedTrip;

    if (this.rating === 0) {
      this.rating = starId;
      editedTrip = {
        ...this.trip, rating: this.trip.rating + this.rating, numberOfRatings: this.trip.numberOfRatings + 1,
        ratingsUsersID: [...this.trip.ratingsUsersID, { uid: userUID, rating: this.rating }]
      };
    }
    else {
      const difference = starId - this.rating;
      this.rating = starId;
      editedTrip = { ...this.trip, rating: this.trip.rating + difference };
    }

    this.tripsService.updateTrip(editedTrip.id, editedTrip)
      .then(() => {
        console.log("Edited succesfuly");
      }, (error) => {
        console.log(error);
      });
  }
}
