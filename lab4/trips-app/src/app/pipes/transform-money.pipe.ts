import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformMoney'
})
export class TransformMoneyPipe implements PipeTransform {

  transform(value: number, moneyType: string): unknown {
    switch (moneyType) {
      case '$': return `${(value * 0.23).toFixed(2)} ${moneyType}`;
      case '€': return `${(value * 0.22).toFixed(2)} ${moneyType}`;
      default: return `${value} ${moneyType}`;
    }
  }

}
