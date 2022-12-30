import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTripComponent } from './components/create-trip/create-trip.component';
import { HomeComponent } from './components/home/home.component';
import { TripDetailsComponent } from './components/trip-details/trip-details.component';
import { TripListComponent } from './components/trip-list/trip-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'trips', component: TripListComponent },
  { path: 'trip/:id', component: TripDetailsComponent },
  { path: 'create', component: CreateTripComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
