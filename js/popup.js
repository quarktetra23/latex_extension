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

document.addEventListener('DOMContentLoaded', function() {
    // Copy to Clipboard Functionality
    var copyButton = document.getElementById('copy-to-clipboard');
    copyButton.addEventListener('click', function() {
        var latexContent = document.getElementById('latex-display-area').textContent;
        navigator.clipboard.writeText(latexContent).then(function() {
            console.log('Latex content copied to clipboard');
        }, function(err) {
            console.error('Could not copy text: ', err);
        });
    });

    // Search Functionality
    var searchBox = document.getElementById('latex-search-bar');
    var searchButton = document.getElementById('search-button');

    function performSearch() {
        var query = searchBox.value;
        var url = 'https://www.overleaf.com/learn/latex/Learn_LaTeX_in_30_minutes?search=' + encodeURIComponent(query);
        console.log('Opening URL:', url); // Debugging line
        window.open(url, '_blank');
    }

    searchBox.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    searchButton.addEventListener('click', performSearch);
});

