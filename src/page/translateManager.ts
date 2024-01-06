import type { TranslateResponse } from '../types';
import { Popup } from './popup';

export class TranslateManager {
  popup = new Popup();

  normalizeRow(str: string) {
    return str.trim().replaceAll('\n', '');
  }

  async translate() {
    const { enabled } = await chrome.storage.local.get('enabled');
    if (!enabled) return;
  
    const selection = document.getSelection();
    if (!selection || selection.isCollapsed) return;
    
    const range = selection.getRangeAt(selection.rangeCount-1);
  
    const res = await chrome.runtime.sendMessage(
      this.normalizeRow(range.toString()),
    ) as TranslateResponse;
    console.log('res', res);
  
    this.popup.showTranslated(res, selection);
  };
}
