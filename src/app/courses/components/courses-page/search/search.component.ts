import { ChangeDetectionStrategy, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

export const INPUT_DEBOUNCE_TIME = 500;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();

  searchControl: FormControl = new FormControl();

  private onDestroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      filter((query: string) => query.length >= 3 || !query.length),
      debounceTime(INPUT_DEBOUNCE_TIME),
      takeUntil(this.onDestroy$),
    ).subscribe((query: string) => this.searchQuery.emit(query));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
