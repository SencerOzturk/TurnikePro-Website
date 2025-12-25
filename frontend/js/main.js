// Language management
let currentLanguage = localStorage.getItem('language') || 'tr';

function getCurrentLanguage() {
    return currentLanguage;
}

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updatePageLanguage();
}

function updatePageLanguage() {
    const elements = document.querySelectorAll('[data-tr], [data-en]');
    elements.forEach(element => {
        const text = currentLanguage === 'tr' 
            ? element.getAttribute('data-tr') 
            : element.getAttribute('data-en');
        if (text) {
            element.textContent = text;
        }
    });

    // Update page title
    const titleElement = document.querySelector('title');
    if (titleElement) {
        const titleTr = titleElement.getAttribute('data-tr');
        const titleEn = titleElement.getAttribute('data-en');
        if (titleTr && titleEn) {
            titleElement.textContent = currentLanguage === 'tr' ? titleTr : titleEn;
        }
    }

    // Update lang switcher button
    const langSwitcher = document.getElementById('langSwitcher');
    if (langSwitcher) {
        langSwitcher.textContent = currentLanguage === 'tr' ? 'EN' : 'TR';
    }
}

// Initialize language on page load
document.addEventListener('DOMContentLoaded', () => {
    updatePageLanguage();

    // Language switcher
    const langSwitcher = document.getElementById('langSwitcher');
    if (langSwitcher) {
        langSwitcher.addEventListener('click', () => {
            setLanguage(currentLanguage === 'tr' ? 'en' : 'tr');
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }
});

// Load featured products
async function loadFeaturedProducts() {
    try {
        const products = await getFeaturedProducts();
        const container = document.getElementById('featuredProducts');
        
        if (!container) return;

        if (products.length === 0) {
            container.innerHTML = '<p data-tr="Henüz öne çıkan ürün bulunmamaktadır." data-en="No featured products yet.">Henüz öne çıkan ürün bulunmamaktadır.</p>';
            return;
        }

        container.innerHTML = products.slice(0, 3).map(product => {
            const lang = getCurrentLanguage();
            return `
                <div class="product-card" data-category="${product.category[lang]?.toLowerCase().replace(/\s+/g, '-') || ''}">
                    <div class="product-image">
                        <img src="${product.imageUrl}" alt="${product.name[lang]}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'250\'%3E%3Crect width=\'300\' height=\'250\' fill=\'%23f3f4f6\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%239ca3af\'%3E${encodeURIComponent(product.name[lang])}%3C/text%3E%3C/svg%3E'">
                    </div>
                    <div class="product-content">
                        <h3>${product.name[lang]}</h3>
                        <p>${product.description[lang]}</p>
                        ${product.technicalSpecs?.[lang] ? `<div class="product-specs">${product.technicalSpecs[lang]}</div>` : ''}
                    </div>
                </div>
            `;
        }).join('');

        updatePageLanguage();
    } catch (error) {
        console.error('Error loading featured products:', error);
        const container = document.getElementById('featuredProducts');
        if (container) {
            container.innerHTML = '<p data-tr="Ürünler yüklenirken bir hata oluştu." data-en="An error occurred while loading products.">Ürünler yüklenirken bir hata oluştu.</p>';
        }
    }
}

// Load all products
async function loadAllProducts() {
    try {
        const products = await getAllProducts();
        const container = document.getElementById('productsGrid');
        
        if (!container) return;

        const loadingElement = document.getElementById('loadingProducts');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }

        if (products.length === 0) {
            container.innerHTML = '<p data-tr="Henüz ürün bulunmamaktadır." data-en="No products yet.">Henüz ürün bulunmamaktadır.</p>';
            return;
        }

        const lang = getCurrentLanguage();
        container.innerHTML = products.map(product => {
            const category = product.category[lang]?.toLowerCase().replace(/\s+/g, '-') || '';
            return `
                <div class="product-card" data-category="${category}">
                    <div class="product-image">
                        <img src="${product.imageUrl}" alt="${product.name[lang]}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'300\' height=\'250\'%3E%3Crect width=\'300\' height=\'250\' fill=\'%23f3f4f6\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%239ca3af\'%3E${encodeURIComponent(product.name[lang])}%3C/text%3E%3C/svg%3E'">
                    </div>
                    <div class="product-content">
                        <h3>${product.name[lang]}</h3>
                        <p>${product.description[lang]}</p>
                        ${product.technicalSpecs?.[lang] ? `<div class="product-specs">${product.technicalSpecs[lang]}</div>` : ''}
                    </div>
                </div>
            `;
        }).join('');

        updatePageLanguage();
    } catch (error) {
        console.error('Error loading products:', error);
        const container = document.getElementById('productsGrid');
        if (container) {
            const loadingElement = document.getElementById('loadingProducts');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            container.innerHTML = '<p data-tr="Ürünler yüklenirken bir hata oluştu." data-en="An error occurred while loading products.">Ürünler yüklenirken bir hata oluştu.</p>';
        }
    }
}

// Load references for homepage
async function loadReferences() {
    try {
        const references = await getAllReferences();
        const container = document.getElementById('referencesLogos');
        
        if (!container) return;

        if (references.length === 0) {
            container.innerHTML = '<p data-tr="Henüz referans bulunmamaktadır." data-en="No references yet.">Henüz referans bulunmamaktadır.</p>';
            return;
        }

        const lang = getCurrentLanguage();
        container.innerHTML = references.slice(0, 6).map(reference => {
            return `
                <div class="reference-logo">
                    <img src="${reference.imageUrl}" alt="${reference.name[lang]}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'200\' height=\'100\'%3E%3Crect width=\'200\' height=\'100\' fill=\'%23f3f4f6\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%239ca3af\'%3E${encodeURIComponent(reference.name[lang])}%3C/text%3E%3C/svg%3E'">
                </div>
            `;
        }).join('');

        updatePageLanguage();
    } catch (error) {
        console.error('Error loading references:', error);
    }
}

// Load all references for references page
async function loadAllReferences() {
    try {
        const references = await getAllReferences();
        const container = document.getElementById('referencesGrid');
        
        if (!container) return;

        const loadingElement = document.getElementById('loadingReferences');
        if (loadingElement) {
            loadingElement.style.display = 'none';
        }

        if (references.length === 0) {
            container.innerHTML = '<p data-tr="Henüz referans bulunmamaktadır." data-en="No references yet.">Henüz referans bulunmamaktadır.</p>';
            return;
        }

        const lang = getCurrentLanguage();
        container.innerHTML = references.map(reference => {
            return `
                <div class="reference-card">
                    <div class="reference-image">
                        <img src="${reference.imageUrl}" alt="${reference.name[lang]}" loading="lazy" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'350\' height=\'250\'%3E%3Crect width=\'350\' height=\'250\' fill=\'%23f3f4f6\'/%3E%3Ctext x=\'50%25\' y=\'50%25\' text-anchor=\'middle\' dy=\'.3em\' fill=\'%239ca3af\'%3E${encodeURIComponent(reference.name[lang])}%3C/text%3E%3C/svg%3E'">
                    </div>
                    <div class="reference-content">
                        <h3>${reference.name[lang]}</h3>
                        <p>${reference.description[lang]}</p>
                        ${reference.location?.[lang] ? `<div class="reference-location">📍 ${reference.location[lang]}</div>` : ''}
                    </div>
                </div>
            `;
        }).join('');

        updatePageLanguage();
    } catch (error) {
        console.error('Error loading references:', error);
        const container = document.getElementById('referencesGrid');
        if (container) {
            const loadingElement = document.getElementById('loadingReferences');
            if (loadingElement) {
                loadingElement.style.display = 'none';
            }
            container.innerHTML = '<p data-tr="Referanslar yüklenirken bir hata oluştu." data-en="An error occurred while loading references.">Referanslar yüklenirken bir hata oluştu.</p>';
        }
    }
}

// Make functions available globally
window.getCurrentLanguage = getCurrentLanguage;
window.setLanguage = setLanguage;
window.loadFeaturedProducts = loadFeaturedProducts;
window.loadAllProducts = loadAllProducts;
window.loadReferences = loadReferences;
window.loadAllReferences = loadAllReferences;
// submitContactForm is already available from api.js

