import { Action } from "@ngrx/store";
import { Lang } from "./enums/lang.enum";

export enum LangActionTypes {
  SetLang = "[Lang] Set Language"
}

export class SetLang implements Action {
  public readonly type = LangActionTypes.SetLang;

  constructor(public payload: { lang: Lang }) {}
}

export type LangActions = SetLang;
