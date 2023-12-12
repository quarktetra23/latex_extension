// popup.js
document.addEventListener("DOMContentLoaded", function () {
    // Get references to HTML elements
    const inputElement = document.getElementById("input");
    const convertButton = document.getElementById("convertButton");
    const outputElement = document.getElementById("output");
  
    // Add a click event listener to the Convert button
    convertButton.addEventListener("click", function () {
      // Get the text entered by the user in the textarea
      const text = inputElement.value;
  
      // Call the convertToLatex function to perform the conversion
      const latexText = convertToLatex(text);
  
      // Display the LaTeX output in the outputElement
      outputElement.textContent = latexText;
    });
  });
  
  function convertToLatex(text) {
    // Replace common special characters with LaTeX equivalents
    text = text.replace(/&/g, "\\&")
               .replace(/%/g, "\\%")
               .replace(/\$/g, "\\$")
               .replace(/#/g, "\\#")
               .replace(/_/g, "\\_")
               .replace(/\^/g, "\\^");
  
    // Replace common mathematical symbols with LaTeX equivalents
    text = text.replace(/<=/g, "\\leq")
               .replace(/>=/g, "\\geq")
               .replace(/!=/g, "\\neq")
               .replace(/->/g, "\\rightarrow")
               .replace(/<->/g, "\\leftrightarrow");
  
    // Surround the text with \text{} to indicate it as plain text
    return "\\text{" + text + "}";
  }
  