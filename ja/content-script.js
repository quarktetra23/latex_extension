// Function to activate the crosshair cursor
function activateCrosshairCursor() {
    document.body.style.cursor = 'crosshair';
}

// Function to deactivate the crosshair cursor
function deactivateCrosshairCursor() {
    document.body.style.cursor = 'default';
}

// Listen for messages from the popup or browser action
browser.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    if (message.action === "activateCrosshair") {
        activateCrosshairCursor();
    } else if (message.action === "deactivateCrosshair") {
        deactivateCrosshairCursor();
    }
});

let startX, startY, endX, endY;
let selectionBox = null;

function createSelectionBox() {
    selectionBox = document.createElement('div');
    selectionBox.style.position = 'absolute';
    selectionBox.style.border = '2px dashed black';
    selectionBox.style.backgroundColor = 'rgba(0, 0, 255, 0.3)';
    document.body.appendChild(selectionBox);
}

function updateSelectionBox(x1, y1, x2, y2) {
    const minX = Math.min(x1, x2);
    const minY = Math.min(y1, y2);
    const maxX = Math.max(x1, x2);
    const maxY = Math.max(y1, y2);
    selectionBox.style.left = minX + 'px';
    selectionBox.style.top = minY + 'px';
    selectionBox.style.width = maxX - minX + 'px';
    selectionBox.style.height = maxY - minY + 'px';
}

document.addEventListener('mousedown', function(e) {
    startX = e.pageX;
    startY = e.pageY;
    createSelectionBox();
});

document.addEventListener('mousemove', function(e) {
    if (selectionBox) {
        updateSelectionBox(startX, startY, e.pageX, e.pageY);
    }
});

document.addEventListener('mouseup', function(e) {
    endX = e.pageX;
    endY = e.pageY;
    // Here you would handle the selection process and LaTeX conversion
    // For now, just remove the selection box
    if (selectionBox) {
        document.body.removeChild(selectionBox);
        selectionBox = null;
    }
});

// ... (existing selection box code) ...

document.addEventListener('mouseup', function(e) {
    endX = e.pageX;
    endY = e.pageY;

    // Calculate the bounds of the selection box
    const selectionBounds = {
        left: Math.min(startX, endX),
        top: Math.min(startY, endY),
        right: Math.max(startX, endX),
        bottom: Math.max(startY, endY)
    };

    // Function to check if an element is within the selection bounds
    function isElementInSelection(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.left < selectionBounds.right &&
            rect.right > selectionBounds.left &&
            rect.top < selectionBounds.bottom &&
            rect.bottom > selectionBounds.top
        );
    }

    // Identify and process elements within the selection
    const elementsInSelection = Array.from(document.querySelectorAll('p, div, span')) // Add other selectors as needed
        .filter(isElementInSelection);

    // TODO: Process the identified elements (e.g., extract text, handle images)

    // Cleanup after selection
    if (selectionBox) {
        document.body.removeChild(selectionBox);
        selectionBox = null;
    }
});

// ... (existing code for identifying elements) ...

// Function to process and convert content to LaTeX
function processContentForLatex(elements) {
    elements.forEach(element => {
        const content = element.innerText; // For text content
        // TODO: Add conversion logic here
        console.log(content); // Placeholder - replace with actual processing
    });
}

// Modify the existing 'mouseup' event listener
document.addEventListener('mouseup', function(e) {
    // ... existing code for identifying elements ...

    // Process the identified elements for LaTeX conversion
    processContentForLatex(elementsInSelection);

    // Cleanup after selection
    if (selectionBox) {
        document.body.removeChild(selectionBox);
        selectionBox = null;
    }
});

function convertToLaTeX(text) {
    // Function to escape special LaTeX characters
    function escapeSpecialChars(latex) {
        const specialChars = {
            '&': '\\&', '%': '\\%', '$': '\\$', '#': '\\#', '_': '\\_', '{': '\\{', '}': '\\}', 
            '~': '\\textasciitilde{}', '^': '\\textasciicircum{}', '\\': '\\textbackslash{}'
        };
        return latex.replace(/[&%$#_{}~^\\]/g, match => specialChars[match] || match);
    }

    // Function to handle basic inline mathematical expressions
    function convertMathExpressions(latex) {
        // Example: converting simple multiplication
        return latex.replace(/(\d+)\s*\*\s*(\d+)/g, '\\($1 \\times $2\\)');
        // Add more rules for other math expressions as needed
    }

    // Function to convert common HTML tags to LaTeX
    function convertHTMLTags(latex) {
        latex = latex.replace(/<b>(.*?)<\/b>/g, '\\textbf{$1}');
        latex = latex.replace(/<i>(.*?)<\/i>/g, '\\textit{$1}');
        latex = latex.replace(/<br>/g, '\\\\ ');
        // Add more rules for other HTML tags as needed
        return latex;
    }
}


function processContentForLatex(elements) {
    elements.forEach(element => {
        try {
            const content = element.innerText;
            const convertedContent = convertToLaTeX(content);
            copyToClipboard(convertedContent);
        } catch (error) {
            console.error("Error processing content for LaTeX: ", error);
            alert("There was an error processing the content. Please try again.");
        }
    });
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        alert("LaTeX content copied to clipboard!");
    }).catch(err => {
        console.error("Failed to copy text: ", err);
        alert("Failed to copy LaTeX content to the clipboard.");
    });
}



