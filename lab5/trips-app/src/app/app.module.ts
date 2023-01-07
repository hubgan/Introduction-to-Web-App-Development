import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TripCardComponent } from './components/trip-card/trip-card.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { TripsService } from './services/trips.service';
import { CreateTripComponent } from './components/create-trip/create-trip.component';
import { FiltersListComponent } from './components/filters-list/filters-list.component';
import { RatingComponent } from './components/rating/rating.component';
import { StarComponent } from './components/star/star.component';
import { FilterPipe } from './pipes/filter.pipe';
import { TransformMoneyPipe } from './pipes/transform-money.pipe';
import { CartComponent } from './components/cart/cart.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { environment } from 'src/environments/environment';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { HomeComponent } from './components/home/home.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { MapComponent } from './components/map/map.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { PurchaseStatusFilterPipe } from './pipes/purchase-status-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TripCardComponent,
    TripListComponent,
    NavBarComponent,
    CreateTripComponent,
    FiltersListComponent,
    RatingComponent,
    StarComponent,
    FilterPipe,
    TransformMoneyPipe,
    CartComponent,
    LoadingSpinnerComponent,
    HomeComponent,
    TripDetailsComponent,
    MapComponent,
    CartDetailsComponent,
    PurchaseHistoryComponent,
    PurchaseStatusFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    NgxSliderModule,
    NgImageSliderModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    TripsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
