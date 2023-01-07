import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { CartItem } from '../models/cart-item';
import { PurchaseHistoryItem } from '../models/purchase-history-item';

@Injectable({
  providedIn: 'root'
})
export class PurchaseHistoryService {
  private collection = '/purchase-history';
  purchaseHistoryRef: AngularFirestoreCollection<PurchaseHistoryItem>;

  constructor(private db: AngularFirestore) {
    this.purchaseHistoryRef = db.collection(this.collection);
  }

  addPurchase(purchase: PurchaseHistoryItem) {
    return this.purchaseHistoryRef.add({ ...purchase });
  }
}
