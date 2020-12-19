import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Output() searchQuery: EventEmitter<string> = new EventEmitter<string>();

  public searchInput = '';

  constructor() { }

  ngOnInit(): void {
  }

  search(): void {
    this.searchQuery.emit(this.searchInput);
  }
}
