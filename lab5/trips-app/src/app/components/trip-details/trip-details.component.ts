import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TripComment } from 'src/app/models/trip-comment';
import { Trip } from 'src/app/models/trip';
import { MoneyTypeService } from 'src/app/services/money-type.service';
import { TripsService } from 'src/app/services/trips.service';
import { CommentsService } from 'src/app/services/comments.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit {

  error: boolean = false;
  isLoadingTrip: boolean = false;
  isLoadingComments: boolean = false;
  errorMessage: string;

  tripId: string;
  trip: Trip = new Trip();

  imageObjects: Array<Object> = [];

  form: FormGroup;
  comments: Array<TripComment> = [];

  moneyType: string = this.moneyTypeService.getMoneyType();

  reservationAmount: number;

  constructor(private route: ActivatedRoute,
    private tripsService: TripsService,
    private moneyTypeService: MoneyTypeService,
    private commentsService: CommentsService,
    private cartService: CartService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.error = false;
    this.initForm();
    this.errorMessage = '';
    this.isLoadingTrip = true;
    this.isLoadingComments = true;

    this.tripId = this.route.snapshot.params['id'];
    this.setReservationAmount();

    this.getTrip();
    this.getComments();

    this.moneyTypeService.moneyType.subscribe((moneyType) => {
      this.moneyType = moneyType;
    })
  }

  setReservationAmount() {
    const cartItems = this.cartService.getCartItems();
    const cartIndex = cartItems.findIndex((item) => item.id === this.tripId);

    if (cartIndex !== -1) {
      this.reservationAmount = cartItems[cartIndex].quantity;
    }
    else {
      this.reservationAmount = 0;
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      nickname: [null, [Validators.required]],
      tripname: [null, [Validators.required]],
      comment: [null, [Validators.required, Validators.minLength(50), Validators.maxLength(500)]],
      date: [null]
    })
  }

  createComment(tripComment: TripComment) {
    tripComment.nickname = this.form.value.nickname;
    tripComment.tripname = this.form.value.tripname;
    tripComment.comment = this.form.value.comment;
    tripComment.date = this.form.value.date;
  }

  clearForm() {
    this.form.reset();
  }

  onSubmit() {
    const comment = new TripComment();
    this.createComment(comment);

    this.commentsService.getComments(this.tripId).get().subscribe((data) => {
      if (data && data.exists) {
        const newComments = { ...data.data() };
        newComments.comments.push({ ...comment });
        this.commentsService.addComments(this.tripId, newComments);
      }
      else {
        this.commentsService.createComments(this.tripId, comment);
      }

      this.clearForm();
    })
  }

  getTrip() {
    this.tripsService.getTrip(this.tripId).valueChanges().subscribe((data) => {
      const trip = { ...data, id: this.tripId };
      this.initTrip(trip);
      this.error = false;
      this.isLoadingTrip = false;
    }, (error) => {
      this.error = true;
      this.isLoadingTrip = false;
      this.errorMessage = error.message;
    });
  }

  initTrip(trip: any) {
    this.trip.id = trip.id;
    this.trip.country = trip.country;
    this.trip.name = trip.name;
    this.trip.startDate = trip.startDate;
    this.trip.endDate = trip.endDate;
    this.trip.unitPrice = trip.unitPrice;
    this.trip.availablePlaces = trip.availablePlaces;
    this.trip.rating = trip.rating;
    this.trip.numberOfRatings = trip.numberOfRatings;
    this.trip.description = trip.description;
    this.trip.images = trip.images;

    if (this.imageObjects.length === 0) {
      this.initSlider(trip);
    }
  }

  initSlider(trip: any) {
    const imageObjects: Array<Object> = [];
    const images = trip.images;

    images.forEach((image: string) => {
      imageObjects.push({
        image: image,
        thumbImage: image,
        alt: `${trip.country}, ${trip.name} image`,
        title: `${trip.name}`
      });
    })

    this.imageObjects = imageObjects;
  }

  getComments() {
    this.commentsService.getComments(this.tripId).valueChanges().subscribe((data) => {
      if (data) {
        this.comments = data.comments;
      }

      this.isLoadingComments = false;
      this.error = false;
    }, (error) => {
      this.error = true;
      this.errorMessage = error.message;
      this.isLoadingComments = false;
    })
  }

  removeReservation() {
    this.reservationAmount -= 1;

    const tripInfo = {
      id: this.trip.id,
      name: this.trip.name,
      quantity: this.reservationAmount,
      price: this.trip.unitPrice,
      totalPlaces: this.trip.availablePlaces
    }

    this.cartService.cartRemoveReservation(tripInfo);
  }

  addReservation() {
    this.reservationAmount += 1;

    const tripInfo = {
      id: this.trip.id,
      name: this.trip.name,
      quantity: this.reservationAmount,
      price: this.trip.unitPrice,
      totalPlaces: this.trip.availablePlaces
    }

    this.cartService.cartAddReservation(tripInfo);
  }
}
