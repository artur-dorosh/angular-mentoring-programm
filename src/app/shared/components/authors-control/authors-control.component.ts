import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, HostListener, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, FormArray, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';
import { IAuthor } from '../../interfaces/author.interface';
import { INPUT_DEBOUNCE_TIME } from '../../../courses/components/courses-page/search/search.component';
import { IAuthorsState } from '../../state/authors.reducer';
import { select, Store } from '@ngrx/store';
import { selectAuthors, selectAuthorsLoading } from '../../state/authors.selectors';
import { loadAuthors } from '../../state/authors.actions';

@Component({
  selector: 'app-authors-control',
  templateUrl: './authors-control.component.html',
  styleUrls: ['./authors-control.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AuthorsControlComponent),
      multi: true
    },
  ]
})
export class AuthorsControlComponent implements OnInit, OnDestroy, ControlValueAccessor {
  authorInput: FormControl = new FormControl();
  pickedAuthors: FormArray = new FormArray([], Validators.required);

  showAuthors: boolean;

  fetchedAuthors$: Observable<IAuthor[]>;

  private onDestroy$: Subject<void> = new Subject<void>();

  @HostListener('document:click', ['$event']) onBlur(event): void {
    if (!this.elementRef.nativeElement.contains(event.target) && this.showAuthors) {
      this.toggleAuthorsList();
    }
  }

  constructor(
    private elementRef: ElementRef,
    private store: Store<IAuthorsState>
  ) {}

  onChange: (value: IAuthor[]) => void = () => {};
  onTouch: () => void = () => {};

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }

  writeValue(value: IAuthor[]): void {
    value.forEach((item: IAuthor) => this.pickedAuthors.push(new FormControl(item)));
  }

  ngOnInit(): void {
    this.trackAuthorInput();
    this.trackPickedAuthors();

    this.fetchedAuthors$ = this.store.pipe(
      select(selectAuthors),
      map((authors: IAuthor[]) => authors.filter(
        (author: IAuthor) => !this.pickedAuthors.value.some((item: IAuthor) => item.id === author.id)
      )),
      takeUntil(this.onDestroy$),
    );

    this.store.dispatch(loadAuthors({ query: '' }));
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  toggleAuthorsList(): void {
    this.showAuthors = !this.showAuthors;
  }

  getFilteredAuthors(query: string): void {
    this.store.dispatch(loadAuthors({ query }));
  }

  chooseAuthor(author: IAuthor): void {
    this.pickedAuthors.push(new FormControl(author));
    this.pickedAuthors.markAsDirty();

    this.authorInput.setValue('');
    this.toggleAuthorsList();
  }

  removeAuthor(author: IAuthor): void {
    this.pickedAuthors.value.forEach((pickedAuthor: IAuthor, index: number) => {
      if (pickedAuthor.id === author.id) {
        this.pickedAuthors.removeAt(index);
      }
    });
  }

  private trackAuthorInput(): void {
    this.authorInput.valueChanges.pipe(
      debounceTime(INPUT_DEBOUNCE_TIME),
      takeUntil(this.onDestroy$),
    ).subscribe((value: string) => this.getFilteredAuthors(value.toLocaleLowerCase()));
  }

  private trackPickedAuthors(): void {
    this.pickedAuthors.valueChanges.pipe(
      takeUntil(this.onDestroy$),
    ).subscribe((authors: IAuthor[]) => {
      this.onChange(authors);
    });
  }
}
