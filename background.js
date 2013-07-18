var providers = [
  {url: "https://mail.google.com", script: 'gmail.js'}
];
var tabs = [];

var updateActionForTab = function(tabId) {
  if (tabs[tabId] == 'plaintext') {
    chrome.pageAction.setTitle({tabId: tabId, title: 'Email will be sent in plain text'});
    chrome.pageAction.setIcon({tabId: tabId, path: 'plaintext.png'});
  } else {
    chrome.pageAction.setTitle({tabId: tabId, title: 'Email will be sent encrypted'});
    chrome.pageAction.setIcon({tabId: tabId, path: 'encrypted.png'});
  }
  chrome.pageAction.show(tabId);
};

chrome.tabs.onUpdated.addListener(function(tabId, change, tab) {
  if (change.status == "complete") {
    // is there a provider for this page?
    for(var i = providers.length - 1; i >=0; i--) {
      var prov = providers[i];
      var regex = new RegExp(prov.url, 'i');
      if (regex.test(tab.url)) {
        if (!tabs[tabId]) {
          tabs[tabId] = 'plaintext';
        }
        updateActionForTab(tabId);
        return;
      }
    }
    if (tabs[tabId]) {
      tabs[tabId] = false;
    }
    chrome.pageAction.hide(tabId);
  }
});

chrome.pageAction.onClicked.addListener(function(tab) {
  switch(tabs[tab.id]) {
    case 'encrypted':
    tabs[tab.id] = 'plaintext';
    updateActionForTab(tab.id);
    break;
    case 'plaintext':
    tabs[tab.id] = 'encrypted';
    updateActionForTab(tab.id);
    break;
  }
});