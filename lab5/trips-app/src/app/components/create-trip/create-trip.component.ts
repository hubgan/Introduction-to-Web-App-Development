import { group } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormGroup, FormControl, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms'
import { Router } from '@angular/router';
import { Trip } from 'src/app/models/trip';
import { FileUploadService } from 'src/app/services/file-upload.service';
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

  files: Array<File>;
  tripForm = new FormGroup({
    country: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    unitPrice: new FormControl(0, [Validators.required, Validators.min(0)]),
    availablePlaces: new FormControl(0, [Validators.required, Validators.min(0)]),
    description: new FormControl('', [Validators.required, Validators.minLength(30)]),
    images: new FormControl('', Validators.required)
  }, {
    validators: this.isDateCorrect()
  })

  constructor(private tripsService: TripsService, private router: Router, private storageService: FileUploadService) { }

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
    trip.numberOfRatings = 0;
    trip.availablePlaces = this.tripForm.value.availablePlaces || 0;
    trip.description = this.tripForm.value.description || "";
  }

  selectFile(event: any) {
    this.error = false;
    this.errorMessage = '';
    const files: Array<File> = [...event.target.files];

    files.forEach((file) => {
      if (!file.type.includes('image')) {
        this.error = true;
        this.errorMessage = 'Musisz wybrać zdjęcia';
        return;
      }

      if (file.size > 200000) {
        this.error = true;
        this.errorMessage = 'Każdy z obrazów musi mieć mniej niż 200kb'
        return;
      }
    });

    this.files = files;
  }

  onSubmit() {
    this.error = false;
    this.isLoading = true;

    const trip = new Trip();
    this.createTrip(trip);

    this.tripsService.addTrip(trip).then((respond) => {
      const id = respond.id;

      Promise.all(this.files.map(file => this.storageService.uploadFileToStorage(id, file)))
        .then((imgs) => {
          Promise.all(imgs.map(img => img.ref.getDownloadURL()))
            .then((images) => {
              const updatedTrip = { ...trip, images };

              this.tripsService.updateTrip(id, updatedTrip).then(() => {
                console.log("Updated succesfully");
                this.error = false;
                this.isLoading = false;
                this.router.navigate(['/trips']);
              })
            });
        });
    }, (error) => {
      this.error = true;
      this.errorMessage = error.message;
      this.isLoading = false;
    });
  }
}