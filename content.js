// content.js
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("mouseup", function () {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText) {
      browser.runtime.sendMessage({ text: selectedText });
    }
  });
});
