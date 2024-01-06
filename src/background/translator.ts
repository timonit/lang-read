import type { TranslateResponse } from '../types';
import { TextEmptyError } from './errors';

export class Translator {
  sl: string;

  dl: string;

  constructor(sl: string, dl: string) {
    this.sl = sl;
    this.dl = dl;
  }

  async translate(text: string) {
    if (!text.trim()) throw new TextEmptyError();

    const {sl, dl} = this;

    const result = await fetch(
      `https://ftapi.pythonanywhere.com/translate?sl=${sl}&dl=${dl}&text=${encodeURIComponent(text)}`,
    );
    if (!result.ok) throw result;

    const translateResult = await result.json() as TranslateResponse;

    return translateResult;
  }
}
