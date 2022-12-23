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

  trip: Trip = new Trip();

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

  isLoading: boolean = false;

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

  onSubmit() {
    const trip = {
      id: Math.floor(Math.random() * 10000000),
      country: this.tripForm.value.country!,
      name: this.tripForm.value.name!,
      startDate: this.tripForm.value.startDate!,
      endDate: this.tripForm.value.endDate!,
      unitPrice: this.tripForm.value.unitPrice!,
      availablePlaces: this.tripForm.value.availablePlaces!,
      rating: 0,
      description: this.tripForm.value.description!,
      imageUrl: this.tripForm.value.imageUrl!,
    };

    this.tripsService.addTrip(trip).subscribe(data => {
      // localStorage.setItem('newTrip', JSON.stringify(trip));
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
    })
  }
}