import { NativeDateAdapter } from '@angular/material';
import { Injectable } from '@angular/core';

@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {
  private static _to2digit(n: number): string {
    return ('00' + n).slice(-2);
  }

  format(date: Date, displayFormat): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const options = { month: 'long' };

    switch (displayFormat) {
      case 'DD.MM.YY':
        return `${CustomDateAdapter._to2digit(day)}.${CustomDateAdapter._to2digit(month)}.${year.toString().slice(-2)}`;
      case 'dd/MM/yyyy':
        return `${CustomDateAdapter._to2digit(day)}/${CustomDateAdapter._to2digit(month)}/${year}`;
      case 'MMM YYYY':
        return `${date.toLocaleString('default', options)} ${year}`;
      default:
        return date.toDateString();
    }
  }
}
