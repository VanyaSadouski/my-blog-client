import { Lang } from "./enums/lang.enum";

export interface ILangState {
  lang: Lang;
}

export const initialState: ILangState = {
  lang: Lang.EN
};
