import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { TripComment } from '../models/trip-comment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  private collection = '/comments';
  commentsRef: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore) {
    this.commentsRef = db.collection(this.collection);
  }

  getComments(id: string) {
    return this.commentsRef.doc(id);
  }

  createComments(id: string, comment: TripComment) {
    const obj = {
      comments: [{ ...comment }]
    };

    return this.commentsRef.doc(id).set(obj);
  }

  addComments(id: string, comments: TripComment) {
    return this.commentsRef.doc(id).update({ ...comments });
  }
}
