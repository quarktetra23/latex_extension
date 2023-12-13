// In your popup's JavaScript
document.getElementById("activateButton").addEventListener("click", function() {
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {action: "activateCrosshair"});
    });
});

document.getElementById("deactivateButton").addEventListener("click", function() {
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
        browser.tabs.sendMessage(tabs[0].id, {action: "deactivateCrosshair"});
    });
});
