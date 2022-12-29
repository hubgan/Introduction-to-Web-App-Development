import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateTripComponent } from './components/create-trip/create-trip.component';
import { TripListComponent } from './components/trip-list/trip-list.component';

const routes: Routes = [
  { path: '', component: TripListComponent },
  { path: 'create', component: CreateTripComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
