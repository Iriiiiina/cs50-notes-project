chrome.runtime?.onMessage.addListener((message, sender) => {
  if (message.action === "highlight") {
    chrome.storage.local.get(["autoSaveOn"], (result) => {
      if (result.autoSaveOn) {
        chrome.storage.local.get(["notes"], (result) => {
          const notes = Array.isArray(result.notes) ? result.notes : [];
          notes.unshift(
            {
              text: message.text,
              timestamp: Date.now(),
              origin: sender.origin,
              title: sender?.tab?.title,
              url: sender.tab.url
            }
          );

          chrome.storage.local.set({ notes });
          chrome?.runtime?.sendMessage({
            action: "highlightSaved"
          });
        });
      }
    });
  }
});

chrome.runtime?.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "saveSelectedText",
    title: "Save to notes",
    contexts: ["selection"]
  });
  chrome.contextMenus.create({
    id: "turnAutoSaveOn",
    title: "Turn ON autosave selected text",
    contexts: ["selection"]
  });
  chrome.contextMenus.create({
    id: "turnAutoSaveOff",
    title: "Turn Off autosave selected text",
    contexts: ["selection"]
  });
});

chrome.contextMenus?.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "saveSelectedText") {
    const url = new URL(info.pageUrl);

    const newNote = {
      text: info.selectionText,
      timestamp: Date.now(),
      origin: url.origin,
      title: tab?.title,
      url: info.pageUrl
    };

    chrome.storage.local.get(["notes"], (result) => {
      const notes = Array.isArray(result.notes) ? result.notes : [];
      notes.unshift(
        newNote
      );

      chrome.storage.local.set({ notes });
      chrome?.runtime?.sendMessage({
        action: "highlightSaved"
      });
    });
  }

  if (info.menuItemId === "turnAutoSaveOn") {
    chrome.storage.local.set({ autoSaveOn: true });
  }

  if (info.menuItemId === "turnAutoSaveOff") {
    chrome.storage.local.set({ autoSaveOn: false });
  }
});
