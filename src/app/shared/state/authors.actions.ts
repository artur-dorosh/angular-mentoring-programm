import { createAction, props } from '@ngrx/store';
import { IAuthor } from '../interfaces/author.interface';

export const loadAuthors = createAction('[Courses Page] Load Authors', props<{ query: string }>());
export const loadAuthorsSuccess = createAction('[Courses Page] Load Authors Success', props<{ authors: IAuthor[] }>());
export const loadAuthorsFailed = createAction('[Courses Page] Load Authors Failed');
