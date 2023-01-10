import { Pipe, PipeTransform } from '@angular/core';
// switch (moneyType) {
//   case '$': return `${(money * 0.23).toFixed(2)} ${moneyType}`;
//   case '€': return `${(money * 0.22).toFixed(2)} ${moneyType}`;
//   default: return `${money} ${moneyType}`;
// }
@Pipe({
  name: 'transformMoney'
})
export class TransformMoneyPipe implements PipeTransform {

  transform(value: number, moneyType: string, isReturnTypeString: boolean = true): any {
    let money = value;
    switch (moneyType) {
      case '$':
        money = parseFloat((money * 0.23).toFixed(2));
        break;
      case '€':
        money = parseFloat((money * 0.22).toFixed(2));
        break;
      default:
        money = parseFloat(money.toFixed(2));
        break;
    }

    if (isReturnTypeString) {
      return `${money} ${moneyType}`;
    }

    return money;
  }
}
