// API Base URL
// Production: Netlify environment variable, Development: localhost
const API_BASE_URL = window.API_BASE_URL || 
                     (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
                       ? 'http://localhost:5000/api' 
                       : 'https://turnike-backend.onrender.com/api');

// Get current language from localStorage or default to 'tr'
function getCurrentLanguage() {
    return localStorage.getItem('language') || 'tr';
}

// Fetch helper function
async function fetchAPI(endpoint, options = {}) {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API Error:', error);
        throw error;
    }
}

// Get all products
async function getAllProducts() {
    return await fetchAPI('/products');
}

// Get featured products
async function getFeaturedProducts() {
    return await fetchAPI('/products/featured');
}

// Get single product
async function getProduct(id) {
    return await fetchAPI(`/products/${id}`);
}

// Get all references
async function getAllReferences() {
    return await fetchAPI('/references');
}

// Get single reference
async function getReference(id) {
    return await fetchAPI(`/references/${id}`);
}

// Submit contact form
async function submitContactForm(formData) {
    return await fetchAPI('/contact', {
        method: 'POST',
        body: JSON.stringify(formData)
    });
}

// Export functions for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        getAllProducts,
        getFeaturedProducts,
        getProduct,
        getAllReferences,
        getReference,
        submitContactForm,
        getCurrentLanguage
    };
}

