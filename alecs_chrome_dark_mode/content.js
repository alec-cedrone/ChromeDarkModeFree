let darkMode = false;

function isLightColor(rgb) {
  const [r, g, b] = rgb.match(/\d+/g).map(Number);
  // Calculate the luminance to determine if the color is light
  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
  return luminance > 200; // Adjust this threshold as needed
}

function toggleDarkMode() {
  if (darkMode) {
    // Reset styles to default
    document.body.style.backgroundColor = "";
    document.body.style.color = "";
    document.querySelectorAll("img").forEach(img => {
      img.style.filter = ""; // Reset image filter
    });
    document.querySelectorAll("a").forEach(link => {
      link.style.color = ""; // Reset link color
    });
    document.querySelectorAll("button").forEach(button => {
      button.style.backgroundColor = ""; // Reset button background
      button.style.color = ""; // Reset button text color
    });
    document.querySelectorAll("*").forEach(element => {
      element.style.backgroundColor = ""; // Reset all element backgrounds
      element.style.color = ""; // Reset all element text colors
    });
  } else {
    // Apply dark mode styles
    document.body.style.backgroundColor = "#121212";
    document.body.style.color = "#ffffff";
    
    // Adjust specific elements for Rally CSS
    document.querySelectorAll("img").forEach(img => {
      img.style.filter = "brightness(0.8) invert(1)"; // Darken images
    });
    document.querySelectorAll("a").forEach(link => {
      link.style.color = "#bb86fc"; // Change link color
    });
    document.querySelectorAll("button").forEach(button => {
      button.style.backgroundColor = "#333333"; // Dark background for buttons
      button.style.color = "#ffffff"; // Light text color for buttons
    });
    
    // Apply dark mode styles to all elements
    document.querySelectorAll("*").forEach(element => {
      const bgColor = window.getComputedStyle(element).backgroundColor;
      const textColor = window.getComputedStyle(element).color;

      // Invert background colors only if they are light
      if (isLightColor(bgColor)) {
        element.style.backgroundColor = "#121212"; // Dark background
      }

      // Invert text colors only if they are dark
      if (!isLightColor(textColor)) {
        element.style.color = "#ffffff"; // Light text for dark backgrounds
      }
    });
  }
  darkMode = !darkMode;
}

// Listen for messages from the popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "toggleDarkMode") {
    toggleDarkMode();
  }
});
