import { ActionReducer, MetaReducer } from "@ngrx/store";
import { environment } from "environments/environment";
import { langReducer } from "./lang";
import { ILangState } from "./lang/state";

export interface IAppState {
  lang: ILangState;
}

export const APP_STATE_REDUCER = {
  lang: langReducer
};

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    return reducer(state, action);
  };
}

export const metaReducers: Array<MetaReducer<any>> = !environment.production
  ? [logger]
  : [];
