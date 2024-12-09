console.log("Content script loaded");

document.addEventListener("mouseup", () => {
  const selectedText = window.getSelection().toString();

  if (selectedText) {
    try {
      chrome?.runtime?.sendMessage({
        action: "highlight",
        text: selectedText
      });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  }
});
