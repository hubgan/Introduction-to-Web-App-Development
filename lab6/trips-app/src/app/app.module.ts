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
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditComponent } from './components/edit/edit.component';
import { FileDetailsComponent } from './components/file-details/file-details.component';
import { NotificationComponent } from './components/notification/notification.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

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
    PurchaseStatusFilterPipe,
    NotFoundComponent,
    EditComponent,
    FileDetailsComponent,
    NotificationComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent
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
    AngularFireStorageModule,
    AngularFireAuthModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatSelectModule,
    MatToolbarModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatBadgeModule,
    MatListModule,
    MatDividerModule,
    MatGridListModule,
    MatButtonToggleModule
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
