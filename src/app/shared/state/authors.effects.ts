import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AuthorsActions from './authors.actions';
import { map, switchMap } from 'rxjs/operators';
import { AuthorsService } from '../services/authors.service';
import { IAuthor } from '../interfaces/author.interface';

@Injectable()
export class AuthorsEffects {
  constructor(
    private actions$: Actions,
    private authorsService: AuthorsService,
  ) {}

  loadAuthors$ = createEffect(() => this.actions$.pipe(
    ofType(AuthorsActions.loadAuthors),
    switchMap(({ query }) => this.authorsService.getAuthors(query).pipe(
      map((authors: IAuthor[]) => AuthorsActions.loadAuthorsSuccess({ authors }))
    ))
  ));
}
