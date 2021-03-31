import { IAuthor } from '../interfaces/author.interface';
import { Action, createReducer, on } from '@ngrx/store';
import * as AuthorsActions from './authors.actions';

export const authorsFeatureKey = 'authors';

export interface IAuthorsState {
  authors: IAuthor[];
  isLoading: boolean;
}

export const initialAuthorsState: IAuthorsState = {
  authors: [],
  isLoading: false
};

export const reducer = createReducer(
  initialAuthorsState,

  on(
    AuthorsActions.loadAuthors,
    AuthorsActions.loadAuthorsFailed,
    (state: IAuthorsState) => ({ ...state, isLoading: true })
  ),

  on(
    AuthorsActions.loadAuthorsSuccess,
    (state: IAuthorsState, { authors }) => ({
      ...state,
      authors,
      isLoading: false,
    })
  ),
);

// tslint:disable-next-line:no-any
export function authorsReducer(state: IAuthorsState | undefined, action: Action): any {
  return reducer(state, action);
}
