// background.js

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ 'timeOn':'18:00' });
    console.log('Default TimeOn sent to 18:00');
    chrome.storage.sync.set({ 'timeOff':'06:00' });
    console.log('Default TimeOn sent to 06:00');
    chrome.storage.sync.set({'onOff':'Off'});
    console.log('Default onOff sent to Off');
  });
  