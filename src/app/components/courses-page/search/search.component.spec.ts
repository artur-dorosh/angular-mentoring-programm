import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchComponent } from './search.component';
import { FormsModule } from '@angular/forms';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ SearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should invoke search method after clicking on search button', () => {
    const spy = spyOn(console, 'log');
    const search = fixture.nativeElement.querySelector('.search-block__input');
    const searchBtn = fixture.nativeElement.querySelector('.search-button');

    search.value = 'mock search query';
    search.dispatchEvent(new Event('input'));

    searchBtn.dispatchEvent(new Event('click'));

    expect(component.searchInput).toBe('mock search query');
    expect(spy).toHaveBeenCalledWith('mock search query');
  });
});
