import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TripComment } from 'src/app/models/trip-comment';
import { Trip } from 'src/app/models/trip';
import { MoneyTypeService } from 'src/app/services/money-type.service';
import { TripsService } from 'src/app/services/trips.service';
import { CommentsService } from 'src/app/services/comments.service';
import { CartService } from 'src/app/services/cart.service';
import { PurchaseHistoryService } from 'src/app/services/purchase-history.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit, OnDestroy {

  error: boolean = false;
  isLoadingTrip: boolean = false;
  isLoadingComments: boolean = false;
  isLoadingPermissions: boolean = false;
  errorMessage: string;

  tripId: string;
  trip: Trip = new Trip();

  imageObjects: Array<Object> = [];

  form: FormGroup;
  comments: Array<TripComment> = [];

  commentsPermission: boolean = false;
  ratingPermission: boolean = false;

  moneyType: string = this.moneyTypeService.getMoneyType();

  reservationAmount: number;

  subscriptions: Array<Subscription> = [];

  constructor(private route: ActivatedRoute,
    private tripsService: TripsService,
    private moneyTypeService: MoneyTypeService,
    private commentsService: CommentsService,
    private cartService: CartService,
    private purchaseHistoryService: PurchaseHistoryService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.error = false;
    this.initForm();
    this.errorMessage = '';
    this.isLoadingTrip = true;
    this.isLoadingComments = true;
    this.isLoadingPermissions = true;

    this.tripId = this.route.snapshot.params['id'];
    this.setReservationAmount();

    this.getTrip();
    this.getComments();
    this.checkPermissionsForCommentsAndRating();

    this.moneyTypeService.moneyType.subscribe((moneyType) => {
      this.moneyType = moneyType;
    })
  }

  checkPermissionsForCommentsAndRating() {
    const userUID = JSON.parse(localStorage.getItem('user')!).uid;
    const userRole = JSON.parse(localStorage.getItem('user')!).role;

    if (userRole === 'manager' || userRole === 'admin') {
      this.ratingPermission = false;
      this.commentsPermission = true;
      this.isLoadingPermissions = false;
      return;
    }

    const subscribe = this.purchaseHistoryService.getPurchases(userUID).valueChanges().subscribe((data) => {
      if (data.some((purchase) => purchase.tripID === this.tripId)) {
        this.ratingPermission = true;
        this.commentsPermission = true;
      }

      this.isLoadingPermissions = false;
      this.error = false;
    }, (error) => {
      this.error = true;
      this.errorMessage = error.message;
      this.isLoadingPermissions = false;
    })

    this.subscriptions.push(subscribe);
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
    const subscribe = this.tripsService.getTrip(this.tripId).valueChanges().subscribe((data) => {
      const trip = { ...data, id: this.tripId };
      this.initTrip(trip);
      this.error = false;
      this.isLoadingTrip = false;
    }, (error) => {
      this.error = true;
      this.isLoadingTrip = false;
      this.errorMessage = error.message;
    });

    this.subscriptions.push(subscribe);
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
    this.trip.ratingsUsersID = trip.ratingsUsersID;

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
    const subsribe = this.commentsService.getComments(this.tripId).valueChanges().subscribe((data) => {
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

    this.subscriptions.push(subsribe);
  }

  removeReservation() {
    this.reservationAmount -= 1;

    const tripInfo = this.createTripInfo();

    this.cartService.cartRemoveReservation(tripInfo);
  }

  addReservation() {
    this.reservationAmount += 1;

    const tripInfo = this.createTripInfo();

    this.cartService.cartAddReservation(tripInfo);
  }

  createTripInfo() {
    return {
      id: this.trip.id,
      country: this.trip.country,
      name: this.trip.name,
      quantity: this.reservationAmount,
      price: this.trip.unitPrice,
      totalPlaces: this.trip.availablePlaces,
      startDate: this.trip.startDate,
      endDate: this.trip.endDate
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
