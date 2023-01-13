import { Component, OnDestroy, OnInit } from '@angular/core';
import { PurchaseHistoryItem } from 'src/app/models/purchase-history-item';
import { PurchaseHistoryService } from 'src/app/services/purchase-history.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MoneyTypeService } from 'src/app/services/money-type.service';

@Component({
  selector: 'app-purchase-history',
  templateUrl: './purchase-history.component.html',
  styleUrls: ['./purchase-history.component.css']
})
export class PurchaseHistoryComponent implements OnInit, OnDestroy {

  purchases: Array<PurchaseHistoryItem>
  error: boolean = false;
  errorMessage: string;
  isLoading: boolean = false;

  moneyType: string = this.moneyTypeService.getMoneyType();

  subscription: Subscription;

  settings = {
    "singleSelection": false,
    "defaultOpen": false,
    "idField": "item_id",
    "textField": "item_text",
    "selectAllText": "Select All",
    "unSelectAllText": "UnSelect All",
    "enableCheckAll": false,
    "itemsShowLimit": 3,
    "allowSearchFilter": false
  }

  dropdownData = [
    { item_id: 1, item_text: 'Waiting to start' },
    { item_id: 2, item_text: 'Active' },
    { item_id: 3, item_text: 'Finished' }
  ];

  statusFilters: Array<Object> = [];

  constructor(private purchaseHistoryService: PurchaseHistoryService, private moneyTypeService: MoneyTypeService) { }

  ngOnInit(): void {
    this.error = false;
    this.isLoading = true;
    const userUID = JSON.parse(localStorage.getItem('user')!).uid;

    this.subscription = this.purchaseHistoryService.getPurchases(userUID).valueChanges().subscribe((data) => {
      this.purchases = data.map((purchase) => {
        let status = this.createPurchaseStatus(purchase.startDate, purchase.endDate);

        return { ...purchase, status: status };
      });

      this.error = false;
      this.isLoading = false;
    }, (error) => {
      this.error = true;
      this.errorMessage = error.message;
      this.isLoading = false;
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
