import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  tripId: string;

  constructor(private route: ActivatedRoute, private tripsService: TripsService) { }

  ngOnInit(): void {
    this.tripId = this.route.snapshot.params['id'];
    console.log(this.tripId);
  }

}
