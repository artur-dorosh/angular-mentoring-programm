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

  it('should emit searchQuery event after click search button', () => {
    const spy = spyOn(component.searchQuery, 'emit');
    const searchInput = fixture.nativeElement.querySelector('.search-block__input');
    const searchBtn = fixture.nativeElement.querySelector('.search-button');

    searchInput.value = 'mock search query';
    searchInput.dispatchEvent(new Event('input'));

    searchBtn.dispatchEvent(new Event('click'));

    expect(component.searchInput).toBe('mock search query');
    expect(spy).toHaveBeenCalledWith('mock search query');
  });
});
