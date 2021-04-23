import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-duration-control',
  templateUrl: './duration-control.component.html',
  styleUrls: ['./duration-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DurationControlComponent),
      multi: true
    },
  ]
})
export class DurationControlComponent implements OnInit, OnDestroy, ControlValueAccessor {
  duration: FormControl = new FormControl('', Validators.required);

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
    this.duration.setValue(value);
  }

  ngOnInit(): void {
    this.trackDuration();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private trackDuration(): void {
    this.duration.valueChanges.pipe(
      takeUntil(this.onDestroy$),
    ).subscribe((value: string) => this.onChange(value));
  }
}
