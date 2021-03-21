import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, filter, takeUntil } from 'rxjs/operators';

export const INPUT_DEBOUNCE_TIME = 500;

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {
  @Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();

  searchInput = '';
  query$: Subject<string> = new Subject<string>();

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor() { }

  ngOnInit(): void {
    this.query$.pipe(
      filter((query: string) => query.length >= 3 || !query.length),
      debounceTime(INPUT_DEBOUNCE_TIME),
      takeUntil(this.onDestroy$),
    ).subscribe((query: string) => this.searchQuery.emit(query));
  }

  search(): void {
    this.query$.next(this.searchInput);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
