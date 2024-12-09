chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "highlight") {
      console.log("Received highlighted text:", message.text);
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "highlightSaved") {
      console.log("Saved highlighted text:", message.text);
  }
});

chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.action === "highlight") {
    console.log('sender = ', sender)
    console.log('message = ', message)
    chrome.storage.local.get(["notes"], (result) => {
      const notes = result.notes || [];
      notes.push({ text: message.text, timestamp: Date.now() });
      console.log('message.action === "highlight" notes = ', notes)
      chrome.storage.local.set({ notes });
      chrome?.runtime?.sendMessage({
        action: "highlightSaved"
      });
    });
  }
});
