chrome.tabs.onUpdated.addListener((tabId, tab) => {
  if (tab.url && tab.url.includes("linkedin.com/messaging/thread/2")) {
    const queryParameters = tab.url.split("-");
    console.log(queryParameters);
    const urlParameter = queryParameters[1];
    chrome.tabs.sendMessage(tabId, {
      type: "NEW",
      personId: urlParameter,
    });
  }
});
