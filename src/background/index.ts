import { TextEmptyError } from './errors';
import { Translator } from './translator';


const state = {
  enabled: false,
  sl: 'en',
  dl: 'ru'
}

const translator = new Translator(state.sl, state.dl);

const changeEnableState = (value: boolean) => {
  state.enabled = value;
  chrome.storage.local.set({enabled: value});

  chrome.action.setBadgeText({
    text: state.enabled ? "on" : "off",
  });
}

chrome.runtime.onStartup.addListener(() => {
  changeEnableState(false);
});

chrome.runtime.onInstalled.addListener(() => {
  changeEnableState(false);
});

chrome.action.onClicked.addListener(async (tab) => {  
  changeEnableState(!state.enabled);
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse): boolean => {
  translator.translate(message)
    .then((translatedText) => {
      console.log('translate', translatedText);
      sendResponse(translatedText);
    })
    .catch((err) => {
      if (err instanceof TextEmptyError) {
        console.log(err);
        return;
      }
    });

  return true;
});
