/// <reference lib="dom" />
import _ from 'lodash';
import { TranslateManager } from './translateManager';

const translateManager = new TranslateManager();

const translate = _.debounce<() => void>(async () => {
  await translateManager.translate();
}, 500);

document.addEventListener('selectionchange', async () => {
  translateManager.popup.removeAllPopup();
  translate();
});
