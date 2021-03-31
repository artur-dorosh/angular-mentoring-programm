import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DateAdapter, MAT_DATE_FORMATS} from '@angular/material';
import { CustomDateAdapter } from '../../helpers/date-adapter';

export const CUSTOM_DATE_FORMATS = {
  parse: {
    dateInput: 'dd/MM/yyyy'
  },
  display: {
    dateInput: 'dd/MM/yyyy',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'MM',
    monthYearA11yLabel: 'YYYY'
  }
};

@Component({
  selector: 'app-date-control',
  templateUrl: './date-control.component.html',
  styleUrls: ['./date-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateControlComponent),
      multi: true
    },
    {provide: DateAdapter, useClass: CustomDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS},
  ],
})
export class DateControlComponent implements OnInit, OnDestroy, ControlValueAccessor {
  date: FormControl = new FormControl('', Validators.required);

  private onDestroy$: Subject<void> = new Subject<void>();

  onChange: (value: string) => void = () => {};
  onTouch: () => void = () => {};

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  writeValue(value: string): void {
    this.date.setValue(new Date(value));
  }

  ngOnInit(): void {
    this.date.valueChanges.pipe(
      takeUntil(this.onDestroy$),
    ).subscribe((value: string) => {
      if (!value) {
        return this.onChange(null);
      }
      const date = value && new Date(value);
      this.onChange(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`);
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
