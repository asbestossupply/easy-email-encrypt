chrome.runtime.onInstalled.addListener(function(object details) {
  if (details.reason === 'install') {
    chrome.tabs.create({
      url: '/runonce/index.html'
    });
  }
});