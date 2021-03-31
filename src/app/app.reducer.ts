import { Action, ActionReducer, MetaReducer, State } from '@ngrx/store';
import * as authActions from './auth/state/auth.actions';

// tslint:disable-next-line:no-any
export function logout(reducer: ActionReducer<any>): ActionReducer<any> {
  // tslint:disable-next-line:no-any
  return (state: State<any> | undefined, action: Action) => {
    if (action.type === authActions.logoutSuccess.type) {
      state = undefined;
    }

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer[] = [ logout ];
