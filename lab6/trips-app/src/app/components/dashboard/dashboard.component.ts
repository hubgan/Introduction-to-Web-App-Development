import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TripsService } from 'src/app/services/trips.service';
import { map } from 'rxjs/operators';
import { Trip } from 'src/app/models/trip';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  subscriptions: Array<Subscription> = [];

  isLoadingTrips: boolean = false;
  isLoadingUsers: boolean = false;
  isLoading: boolean = false;
  error: boolean = false;
  errorMessage: string;

  trips: Array<Trip>;
  users: Array<User>;

  displayScreen: string = 'trips';
  displayedUserColumns: string[] = ['uid', 'display-name', 'email', 'role', 'ban-status', 'ban-user', 'change-roles']
  displayedTripColumns: string[] = ['id', 'name', 'delete-trip', 'edit-trip'];

  constructor(private tripsService: TripsService, public authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.error = false;
    this.errorMessage = '';
    this.isLoadingTrips = true;
    this.isLoadingUsers = true;

    if (!this.authService.userData) {
      this.router.navigate(['login']);
      return;
    }

    this.getTrips();
    this.getUsers();
  }

  getTrips() {
    const subscription = this.tripsService.getAllTrips().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ ...c.payload.doc.data(), id: c.payload.doc.id })
        )
      )
    ).subscribe(data => {
      this.trips = data;
      this.isLoadingTrips = false;
      this.error = false;
    }, (error) => {
      this.error = true;
      this.errorMessage = error.message;
      this.isLoadingTrips = false;
    });

    this.subscriptions.push(subscription);
  }

  getUsers() {
    const subscription = this.authService.getUsers().valueChanges().subscribe((data) => {
      this.users = data;
      this.isLoadingUsers = false;
      this.error = false;
    }, (error) => {
      this.error = true;
      this.errorMessage = error.message;
      this.isLoadingUsers = false;
    })

    this.subscriptions.push(subscription);
  }

  banUser(userUID: string, isBanned: boolean) {
    this.error = false;
    this.isLoading = true;

    this.authService.updateUser(userUID, { isBanned: !isBanned }).then(() => {
      console.log(`User with UID: ${userUID} has been ${isBanned ? 'unbanned' : 'banned'}`);
      this.error = false;
      this.isLoading = false;
    }).catch((error) => {
      this.error = true;
      this.errorMessage = error.message;
      this.isLoading = false;
    })
  }

  changeUserRole(userUID: string, role: string) {
    console.log(userUID, role)
    this.error = false;
    this.isLoading = true;

    this.authService.updateUser(userUID, { role: role }).then(() => {
      console.log(`User with UID: ${userUID} now has role ${role}`);
      this.error = false;
      this.isLoading = false;
    }).catch((error) => {
      this.error = true;
      this.errorMessage = error.message;
      this.isLoading = false;
    })
  }

  deleteTrip(id: string) {
    this.error = false;
    this.isLoading = true;

    this.tripsService.removeTrip(id)
      .then(() => {
        this.error = false;
        this.isLoading = false;
        console.log('Trip delete successfully!');
      })
      .catch((error) => {
        this.error = true;
        this.errorMessage = error.message;
        this.isLoading = false;
      });
  }

  editTrip(id: string) {
    this.router.navigate([`edit/${id}`]);
  }

  changeVisibility(value: string) {
    this.displayScreen = value;
  }

  changePersistance(event: string) {
    this.authService.changePersistance(event);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    })
  }
}
