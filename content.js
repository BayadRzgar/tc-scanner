function extractPageText() {
  return document.body.innerText || "";
}

function looksLikePolicyPage() {
  const url = location.href.toLowerCase();
  const title = document.title.toLowerCase();
  return /terms|privacy|cookie|legal|tos|policy|rules|paycontent|consumer|guidelines/.test(url) || /terms|privacy|cookie|policy|rules|paycontent|consumer|guidelines/.test(title);
}

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "scan") {
    sendResponse({
      isPolicyPage: looksLikePolicyPage(),
      text: extractPageText()
    });
  }
  return true;
});