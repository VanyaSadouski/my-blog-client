import { createSelector } from "@ngrx/store";
import { ILangState } from "./state";

export const selectLangState = (state: { lang: ILangState }) => state.lang;

export const selectCurrentLang = createSelector(
  selectLangState,
  (state: ILangState) => state.lang
);
