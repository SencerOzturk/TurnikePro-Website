// Configuration file for API URL
// This file is loaded before api.js to set the API base URL

(function() {
    // Get API URL from Netlify environment variable or use default
    // Netlify injects environment variables at build time
    // For local development, use localhost
    const isLocalhost = window.location.hostname === 'localhost' || 
                        window.location.hostname === '127.0.0.1' ||
                        window.location.hostname === '';
    
    // Check if we have a Netlify environment variable (set via Netlify dashboard)
    // Netlify doesn't inject env vars into static HTML, so we'll use a script tag approach
    // or check for a global variable set in index.html
    
    // Default API URL
    let apiBaseUrl = 'http://localhost:5000/api';
    
    // Production API URL (will be set via Netlify build or script tag)
    if (!isLocalhost) {
        // Try to get from window object (set via script tag in HTML)
        apiBaseUrl = window.API_BASE_URL || 'https://turnike-backend.onrender.com/api';
    }
    
    // Make it available globally
    window.API_BASE_URL = apiBaseUrl;
})();

