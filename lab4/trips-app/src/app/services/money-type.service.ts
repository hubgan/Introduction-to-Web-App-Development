import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoneyTypeService {

  public moneyType = new Subject<string>();

  constructor() { }

  setMoneyType(value: string) {
    this.moneyType.next(value);
  }
}
