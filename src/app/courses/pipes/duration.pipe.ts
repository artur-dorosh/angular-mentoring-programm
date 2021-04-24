import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  constructor(private translateService: TranslateService) {}

  transform(value: number): string {
    if (value >= 60) {
      return `${Math.trunc(
        value / 60
      )}${this.translateService.instant('duration.hour')} ${value % 60}${this.translateService.instant('duration.minute')}`;
    } else {
      return `${value}${this.translateService.instant('duration.minute')}`;
    }
  }

}
