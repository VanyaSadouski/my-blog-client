import { LangActions, LangActionTypes } from "./actions";
import { ILangState, initialState } from "./state";

export function langReducer(
  state = initialState,
  action: LangActions
): ILangState {
  switch (action.type) {
    case LangActionTypes.SetLang:
      return {
        ...state,
        lang: action.payload.lang
      };

    default:
      return state;
  }
}
