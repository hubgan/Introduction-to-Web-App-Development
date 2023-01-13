import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CreateTripComponent } from './components/create-trip/create-trip.component';
import { EditComponent } from './components/edit/edit.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PurchaseHistoryComponent } from './components/purchase-history/purchase-history.component';
import { SignupComponent } from './components/signup/signup.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { TripListComponent } from './components/trip-list/trip-list.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trip/:id', component: TripDetailsComponent, canActivate: [AuthGuard] },
  { path: 'trips', component: TripListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: CreateTripComponent, canActivate: [AuthGuard] },
  { path: 'cart-details', component: CartDetailsComponent, canActivate: [AuthGuard] },
  { path: 'purchase-history', component: PurchaseHistoryComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: EditComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
  { path: '**', pathMatch: 'full', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
