import { Pipe, PipeTransform } from '@angular/core';
import { PurchaseHistoryItem } from '../models/purchase-history-item';

@Pipe({
  name: 'purchaseStatusFilter'
})
export class PurchaseStatusFilterPipe implements PipeTransform {

  transform(purchases: Array<PurchaseHistoryItem>, statuses: Array<{ [key: string]: any }>): Array<PurchaseHistoryItem> {
    if (statuses.length === 0) {
      return purchases;
    }

    const filteredPurchases = purchases.filter((purchase) => {
      return statuses.some((status) => {
        return status['item_text'] === purchase.status;
      });
    });

    return filteredPurchases;
  }

}
