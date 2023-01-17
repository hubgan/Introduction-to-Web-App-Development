import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { TripsService } from 'src/app/services/trips.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private tripsService: TripsService, private route: ActivatedRoute, private formBuilder: FormBuilder,
    private storageService: StorageService, private router: Router) { }

  error: boolean = false;
  fileError: boolean = false;
  isLoading: boolean = false;
  isUpdateLoading: boolean = false;
  errorMessage: string;

  tripId: string;
  tripForm: FormGroup;
  imagesDownloadURL: Array<string>;
  filesToDelete: Array<string> = [];
  files: Array<File> = [];

  ngOnInit(): void {
    this.error = false;
    this.isLoading = true;
    this.errorMessage = '';
    this.tripId = this.tripId = this.route.snapshot.params['id'];

    this.tripsService.getTrip(this.tripId).valueChanges().subscribe((data) => {
      const trip = { ...data, id: this.tripId };
      this.initForm(trip);
      this.error = false;
      this.isLoading = false;
    }, (error) => {
      this.error = true;
      this.isLoading = false;
      this.errorMessage = error.message;
    });
  }

  initForm(trip: any) {
    this.imagesDownloadURL = trip.images;

    this.tripForm = this.formBuilder.group({
      country: [trip.country, [Validators.required]],
      name: [trip.name, [Validators.required]],
      startDate: [trip.startDate, [Validators.required]],
      endDate: [trip.endDate, [Validators.required]],
      unitPrice: [trip.unitPrice, [Validators.required, Validators.min(0)]],
      availablePlaces: [trip.availablePlaces, [Validators.required, Validators.min(0)]],
      description: [trip.description, [Validators.required, Validators.minLength(30)]],
      images: [''],
    }, {
      validators: this.isDateCorrect()
    })
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

  deleteFile(url: string) {
    this.filesToDelete.push(url);
    this.imagesDownloadURL = this.imagesDownloadURL.filter((img) => img !== url);
  }

  selectFile(event: any) {
    this.fileError = false;
    this.errorMessage = '';
    const files: Array<File> = [...event.target.files];

    files.forEach((file) => {
      if (!file.type.includes('image')) {
        this.fileError = true;
        this.errorMessage = 'Musisz wybrać zdjęcia';
        return;
      }

      if (file.size > 200000) {
        this.fileError = true;
        this.errorMessage = 'Każdy z obrazów musi mieć mniej niż 200kb'
        return;
      }
    });

    this.files = files;
  }

  initUpdatedTrip(images: Array<string>) {
    return {
      country: this.tripForm.value.country,
      name: this.tripForm.value.name,
      startDate: this.tripForm.value.startDate,
      endDate: this.tripForm.value.endDate,
      unitPrice: this.tripForm.value.unitPrice,
      availablePlaces: this.tripForm.value.availablePlaces,
      description: this.tripForm.value.description,
      images: images
    }
  }

  updateTrip() {
    if (this.files.length > 0) {
      this.updateTripWithNewFiles();
    }
    else {
      this.updateTripWithoutNewFiles();
    }
  }

  updateTripWithNewFiles() {
    Promise.all(this.files.map((file) => this.storageService.uploadFileToStorage(this.tripId, file)))
      .then((imgs) => {
        Promise.all(imgs.map((img) => img.ref.getDownloadURL()))
          .then((imagesURLS) => {
            const images = [...this.imagesDownloadURL, ...imagesURLS];
            const trip = this.initUpdatedTrip(images);

            this.updateTripUtil(trip);
          })
          .catch((error) => {
            this.error = true;
            this.isUpdateLoading = false;
            this.errorMessage = error.message;
          })
      })
      .catch((error) => {
        this.error = true;
        this.isUpdateLoading = false;
        this.errorMessage = error.message;
      })
  }

  updateTripWithoutNewFiles() {
    const images = [...this.imagesDownloadURL];
    const trip = this.initUpdatedTrip(images);

    this.updateTripUtil(trip);
  }

  updateTripUtil(trip: Object) {
    this.tripsService.updateTrip(this.tripId, trip).then(() => {
      console.log("Updated succesfully");
      this.error = false;
      this.isUpdateLoading = false;
      this.router.navigate(['/dashboard']);
    }).catch((error) => {
      this.error = true;
      this.isUpdateLoading = false;
      this.errorMessage = error.message;
    })
  }

  onSubmit() {
    this.error = false;
    this.fileError = false;
    this.isUpdateLoading = true;

    if (this.imagesDownloadURL.length + this.files.length === 0) {
      this.fileError = true;
      this.errorMessage = 'There has to be at least one image upload'
      this.isUpdateLoading = false;
      return;
    }

    if (this.filesToDelete.length > 0) {
      Promise.all(this.filesToDelete.map((file) => this.storageService.getStorage().refFromURL(file).delete()))
        .then(() => {
          this.updateTrip();
        })
        .catch((error) => {
          this.error = true;
          this.isUpdateLoading = false;
          this.errorMessage = error.message;
        })
    }
    else {
      this.updateTrip();
    }
  }
}
