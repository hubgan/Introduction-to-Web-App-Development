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
}
