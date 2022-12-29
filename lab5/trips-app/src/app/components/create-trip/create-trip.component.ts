import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router';
import { Trip } from 'src/app/models/trip';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-create-trip',
  templateUrl: './create-trip.component.html',
  styleUrls: ['./create-trip.component.css']
})
export class CreateTripComponent implements OnInit {

  error: boolean = false;
  isLoading: boolean = false;
  errorMessage: string = "";

  tripForm = new FormGroup({
    country: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    unitPrice: new FormControl(0, [Validators.required, Validators.min(0)]),
    availablePlaces: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required, Validators.minLength(30)]),
    imageUrl: new FormControl('', Validators.required)
  }, {
    validators: this.isDateCorrect()
  })

  constructor(private tripsService: TripsService, private router: Router) { }

  ngOnInit(): void {
  }

  isDateCorrect(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const startDate = control.get('startDate')?.value;
      const endDate = control.get('endDate')?.value;

      if (startDate > endDate) {
        return { wrongDates: true };
      }

      return null
    }
  }

  createTrip(trip: Trip) {
    trip.country = this.tripForm.value.country || "";
    trip.name = this.tripForm.value.name || "";
    trip.startDate = this.tripForm.value.startDate || "";
    trip.endDate = this.tripForm.value.endDate || "";
    trip.unitPrice = this.tripForm.value.unitPrice || 0;
    trip.rating = 0;
    trip.availablePlaces = this.tripForm.value.availablePlaces || 0;
    trip.description = this.tripForm.value.description || "";
    trip.imageUrl = this.tripForm.value.imageUrl || "";
  }

  onSubmit() {
    this.error = false;
    this.isLoading = true;

    const trip = new Trip();
    this.createTrip(trip);

    this.tripsService.addTrip(trip).then(() => {
      console.log('Created new student succesfully!');
      this.error = false;
      this.isLoading = false;
      this.router.navigate(['/']);
    }, (error) => {
      this.error = true;
      this.errorMessage = error.message;
      this.isLoading = false;
    });
  }
}