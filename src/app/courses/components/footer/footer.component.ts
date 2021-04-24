import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent implements OnInit, OnDestroy {
  languageControl: FormControl = new FormControl(environment.defaultLocale);

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(private translateService: TranslateService) {}

  ngOnInit(): void {
    this.languageControl.valueChanges.pipe(
      takeUntil(this.onDestroy$),
    ).subscribe((language: string) => this.translateService.use(language));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
