import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoneyTypeService {

  private money: string = 'PLN';

  public moneyType = new Subject<string>();

  constructor() { }

  setMoneyType(value: string) {
    this.moneyType.next(value);
    this.money = value;
  }

  getMoneyType() {
    return this.money;
  }

  getMoneyValue(value: number) {
    switch (this.money) {
      case '$': return parseFloat((value * 0.23).toFixed(2));
      case '€': return parseFloat((value * 0.22).toFixed(2));
      default: return value;
    }
  }
}
