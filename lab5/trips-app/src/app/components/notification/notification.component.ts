import { Component, OnDestroy, OnInit } from '@angular/core';
import { PurchaseHistoryService } from 'src/app/services/purchase-history.service';
import { map, Subscription } from 'rxjs';
import { PurchaseHistoryItem } from 'src/app/models/purchase-history-item';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  notifications: Array<PurchaseHistoryItem> = [];
  showNotification: boolean = false;

  constructor(private purchaseHistoryService: PurchaseHistoryService) { }

  ngOnInit(): void {
    this.subscription = this.purchaseHistoryService.getPurchases().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ ...c.payload.doc.data(), id: c.payload.doc.id })
        )
      )
    ).subscribe((data) => {
      const purchases = data.map((purchase) => {
        let status = this.createPurchaseStatus(purchase.startDate, purchase.endDate);

        return { ...purchase, status: status };
      });

      this.notifications = purchases.filter((purchase) => purchase.status === 'Waiting to start');

      this.notifications.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }, (error) => {
      console.log(error)
    })
  }

  createPurchaseStatus(startDate: string, endDate: string) {
    let status;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
    const day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    const todaysDate = `${year}-${month}-${day}`;

    if (todaysDate < startDate) {
      status = 'Waiting to start';
    }
    else if (todaysDate > endDate) {
      status = 'Finished';
    }
    else {
      status = 'active';
    }

    return status;
  }

  switchNotificationsVisibility() {
    this.showNotification = !this.showNotification;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
