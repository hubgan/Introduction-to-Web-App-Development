import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

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

const routes: Routes = [
  { path: '', component: TripListComponent },
  { path: 'create', component: CreateTripComponent }
];

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
    CartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule,
    NgxSliderModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    TripsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
