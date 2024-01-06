import type { TranslateResponse } from '../types';

export class Popup {
  POPUP_CLASS = 'lang-read-popup';

  createPopup(): HTMLElement {
    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.padding = '0.2rem';
    container.style.background = 'rgba(0, 0, 0, .9)';
    container.style.color = 'rgb(220, 220, 220)';
    container.style.boxSizing = 'border-box';
    container.style.display = 'flex';
    container.style.gap = '0.5em'
    container.style.justifyContent = 'space-between';
    container.style.transformOrigin = 'center top';
    container.style.flexWrap = 'wrap';
    container.style.zIndex = '500000';
    container.style.fontFamily = 'sans-serif';
    
    container.classList.add(this.POPUP_CLASS);
    
    return container;
  }

  createTitle(text: string) {
    const span = document.createElement('span');
    span.innerText = text;

    return span;
  }

  createSubtitle(translations: [string, string[]][]) {
    const container = document.createElement('div');
    container.style.display = 'flex';
    container.style.flexWrap = 'wrap';

    container.style.gap = '0.2em'
    container.style.fontSize = '.8em';

    translations.forEach((t, i, arr) => {
      const span = document.createElement('span');
      span.innerText = `${ i ? '' : '(' }${t[0]}${ arr.length-(i+1) ? ', ' : ')' }`;
      span.title = (t[1] || []).join(', ');

      container.appendChild(span);
    });

    return container;
  }
  
  showTranslated(translation: TranslateResponse, selection: Selection) {
    const range = selection.getRangeAt(selection.rangeCount-1);
    const rect = range.getBoundingClientRect();
    const popup = this.createPopup();
    const main = this.createTitle(translation['destination-text']);
    const subtitle = this.createSubtitle(translation.translations['all-translations'] || []);

    popup.append(main, subtitle);
    document.body.appendChild(popup);
    
    popup.style.left = `${rect.left}px`;
    if (rect.top < popup.offsetHeight) {
      popup.style.top = `calc(${rect.bottom}px + .4em)`;
    } else {
      popup.style.top = `calc(${rect.top}px - ${popup.offsetHeight}px - .4em)`;
    }
  }

  removeAllPopup() {
    const elms = document.body.querySelectorAll(`.${this.POPUP_CLASS}`);
    elms.forEach(el => el.remove());
  }
}
