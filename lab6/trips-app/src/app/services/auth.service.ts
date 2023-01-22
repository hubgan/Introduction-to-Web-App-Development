import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';

interface persistance {
  persistance: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  isLoading: boolean = true;
  subscritpion: Subscription;
  usersRef: AngularFirestoreCollection<User> = this.afs.collection('users');
  persistanceRef: AngularFirestoreCollection<persistance> = this.afs.collection('persistance');
  persistanceID: string;

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.isLoading = true;

      this.persistanceRef.snapshotChanges().pipe(
        map(changes =>
          changes.map(c =>
            ({ ...c.payload.doc.data(), id: c.payload.doc.id })
          )
        )
      ).subscribe((data) => {
        this.persistanceID = data[0].id;
        this.setPersistance(data[0].persistance);
      })

      if (user) {
        this.subscritpion = this.afs.doc(`users/${user.uid}`).valueChanges().subscribe((data) => {
          this.userData = data;
          localStorage.setItem('user', JSON.stringify(this.userData));
          this.isLoading = false;
        });
      } else {
        this.userData = null;
        localStorage.setItem('user', 'null');
        this.isLoading = false;
      }
    });
  }

  signIn(email: string, password: string) {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        this.afAuth.authState.subscribe((user) => {
          if (user) {
            this.router.navigate(['trips']);
          }
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  signUp(email: string, password: string, displayName: string) {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        result.user?.updateProfile({ displayName: displayName }).then(() => {
          this.setUserData(result.user);
          this.router.navigate(['/']);
        });
      })
      .catch((error) => {
        window.alert(error.message);
      });
  }

  getIsLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  setUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );

    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      role: 'client',
      isBanned: false
    };

    localStorage.setItem('user', JSON.stringify(userData));

    return userRef.set(userData, {
      merge: true,
    });
  }

  signOut() {
    this.subscritpion.unsubscribe();
    this.isLoading = true;

    return this.afAuth.signOut().then(() => {
      localStorage.setItem('user', 'null');
      this.router.navigate(['signup']);
      this.isLoading = false;
    });
  }

  getUsers() {
    return this.usersRef;
  }

  changePersistance(persistance: string) {
    this.persistanceRef.doc(this.persistanceID).update({ persistance: persistance }).then(() => {
      console.log(`Persistance is now set to ${persistance}`);
    })
  }

  setPersistance(persistance: string) {
    console.log('setting')
    return this.afAuth.setPersistence(persistance);
  }

  updateUser(uid: string, data: any) {
    return this.usersRef.doc(uid).update(data);
  }
}
