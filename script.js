// Global variables
let cart = JSON.parse(localStorage.getItem('miChicCart')) || [];
let isLoggedIn = JSON.parse(localStorage.getItem('miChicLoggedIn')) || false;
let currentUser = JSON.parse(localStorage.getItem('miChicCurrentUser')) || null;

// Sample products data
const products = [
    {
        id: 'skincare1',
        name: 'Glow Skincare Set',
        description: 'Complete skincare routine for radiant skin',
        price: 35.00,
        category: 'skincare',
        image: 'images/skin.avif'
    },
    {
        id: 'skincare2',
        name: 'VOL.U.LIFT™ GLP-1 4D Skin Rebound Complex',
        description: 'Visible results starting at 4 weeks & optimal results at 12 weeks with 2x daily use',
        price: 65.00,
        category: 'skincare',
        image: 'images/skin.avif'
    },
    {
        id: 'skincare3',
        name: 'Hydrating Face Mask',
        description: 'Deeply moisturizes and rejuvenates your skin',
        price: 28.00,
        category: 'skincare',
        image: 'images/additional/skincare_new1.jpg'
    },
    {
        id: 'skincare4',
        name: 'Anti-Aging Serum',
        description: 'Reduces fine lines and wrinkles for a youthful glow',
        price: 75.00,
        category: 'skincare',
        image: 'images/additional/skincare_new2.jpg'
    },
    {
        id: 'makeup1',
        name: 'Professional Makeup Kit',
        description: 'Everything you need for a perfect look',
        price: 75.00,
        category: 'makeup',
        image: 'images/make1.avif'
    },
    {
        id: 'makeup2',
        name: 'Waterproof Makeup Products',
        description: 'Having the best waterproof makeup is essential if you\'re the sort of person who wants to be prepared for all scenarios',
        price: 65.00,
        category: 'makeup',
        image: 'images/makeup.avif'
    },
    {
        id: 'makeup3',
        name: 'Vibrant Eyeshadow Palette',
        description: 'Create stunning eye looks with a range of vibrant colors',
        price: 40.00,
        category: 'makeup',
        image: 'images/additional/makeup_new1.jpg'
    },
    {
        id: 'makeup4',
        name: 'Long-Lasting Lipstick',
        description: 'Rich, creamy formula for all-day wear',
        price: 22.00,
        category: 'makeup',
        image: 'images/additional/makeup_new2.jpg'
    },
    {
        id: 'fragrance1',
        name: 'Luxury Perfume',
        description: 'Premium fragrance with long-lasting scent',
        price: 50.00,
        category: 'fragrance',
        image: 'images/perfume1.avif'
    },
    {
        id: 'fragrance2',
        name: 'Rose Garden Perfume',
        description: 'Elegant floral fragrance for special occasions',
        price: 65.00,
        category: 'fragrance',
        image: 'images/perfume2.avif'
    },
    {
        id: 'fragrance3',
        name: 'Ocean Breeze Perfume',
        description: 'A refreshing scent that evokes the ocean',
        price: 55.00,
        category: 'fragrance',
        image: 'images/additional/perfume_new.jpg'
    }
];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize application
function initializeApp() {
    setupNavigationEvents();
    setupAuthenticationEvents();
    setupCartEvents();
    loadProducts();
    updateAuthUI();
    updateCartCount();
    setupContactForm();
}

// Navigation Events
function setupNavigationEvents() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                closeHamburgerMenu();
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                closeHamburgerMenu();
            }
        });
    }
}

// Helper function to close hamburger menu
function closeHamburgerMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// Product category tabs
function setupCategoryTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            filterProducts(category);
            
            // Update active tab
            document.querySelectorAll('.tab-btn').forEach(tab => tab.classList.remove('active'));
            this.classList.add('active');
        });
    });
}

// Authentication Events
function setupAuthenticationEvents() {
    const loginBtn = document.getElementById('btn-login');
    const signupBtn = document.getElementById('btn-signup');
    const logoutBtn = document.getElementById('btn-logout');
    const mobileLoginBtn = document.getElementById('mobile-btn-login');
    const mobileSignupBtn = document.getElementById('mobile-btn-signup');
    const mobileLogoutBtn = document.getElementById('mobile-btn-logout');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => openModal('login-modal'));
    }

    if (signupBtn) {
        signupBtn.addEventListener('click', () => openModal('signup-modal'));
    }

    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', () => {
            closeHamburgerMenu();
            openModal('login-modal');
        });
    }

    if (mobileSignupBtn) {
        mobileSignupBtn.addEventListener('click', () => {
            closeHamburgerMenu();
            openModal('signup-modal');
        });
    }

    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    if (mobileLogoutBtn) {
        mobileLogoutBtn.addEventListener('click', () => {
            closeHamburgerMenu();
            logout();
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }
}

// Cart Events
function setupCartEvents() {
    const cartIcon = document.getElementById('cart-icon');
    const mobileCartIcon = document.getElementById('mobile-cart-icon');
    
    if (cartIcon) {
        cartIcon.addEventListener('click', openCart);
    }

    if (mobileCartIcon) {
        mobileCartIcon.addEventListener('click', () => {
            closeHamburgerMenu();
            openCart();
        });
    }
}

// Contact Form
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show success message
            showNotification('Message sent successfully! We\'ll get back to you soon.', 'success');
            
            // Reset form
            this.reset();
        });
    }
}

// Load and display products
function loadProducts(category = 'all') {
    console.log('Loading products for category:', category);
    console.log('Current page:', window.currentPage);
    console.log('Products array:', products);
    displayProducts(category);
}
function displayProducts(category = 'all') {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    let filteredProducts;
    
    // Check if we're on a specific product page
    if (window.currentPage) {
        filteredProducts = products.filter(p => p.category === window.currentPage);
    } else {
        // Default behavior for index page
        filteredProducts = category === 'all' ? products : products.filter(p => p.category === category);
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     style="width: 100%; height: 100%; object-fit: cover; border-radius: 15px;"
                     onerror="console.error('Failed to load image:', this.src); this.style.display='none';"
                     onload="console.log('Image loaded successfully:', this.src);">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="add-to-cart" onclick="addToCart('${product.id}')">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Filter products by category
function filterProducts(category) {
    loadProducts(category);
}

// Authentication functions
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Simple validation (in real app, this would be server-side)
    const users = JSON.parse(localStorage.getItem('miChicUsers')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        isLoggedIn = true;
        currentUser = user;
        localStorage.setItem('miChicLoggedIn', JSON.stringify(true));
        localStorage.setItem('miChicCurrentUser', JSON.stringify(user));
        
        updateAuthUI();
        closeModal('login-modal');
        showNotification(`Welcome back, ${user.name}!`, 'success');
    } else {
        showNotification('Invalid email or password', 'error');
    }
}

function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    if (!name || !email || !password) {
        showNotification('Please fill in all fields', 'error');
        return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('miChicUsers')) || [];
    if (users.find(u => u.email === email)) {
        showNotification('User with this email already exists', 'error');
        return;
    }

    // Create new user
    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('miChicUsers', JSON.stringify(users));
    
    // Auto login
    isLoggedIn = true;
    currentUser = newUser;
    localStorage.setItem('miChicLoggedIn', JSON.stringify(true));
    localStorage.setItem('miChicCurrentUser', JSON.stringify(newUser));
    
    updateAuthUI();
    closeModal('signup-modal');
    showNotification(`Welcome to Mi Chic, ${newUser.name}!`, 'success');
}

function logout() {
    isLoggedIn = false;
    currentUser = null;
    localStorage.setItem('miChicLoggedIn', JSON.stringify(false));
    localStorage.removeItem('miChicCurrentUser');
    
    updateAuthUI();
    showNotification('Logged out successfully', 'success');
}

function updateAuthUI() {
    const authButtons = document.getElementById('auth-buttons');
    const userWelcome = document.getElementById('user-welcome');
    const welcomeText = document.getElementById('welcome-text');
    const mobileAuthButtons = document.getElementById('mobile-auth-buttons');
    const mobileUserWelcome = document.getElementById('mobile-user-welcome');
    const mobileWelcomeText = document.getElementById('mobile-welcome-text');
    const cartIcon = document.getElementById('cart-icon');
    const mobileCartIcon = document.getElementById('mobile-cart-icon');
    
    if (isLoggedIn && currentUser) {
        // Desktop UI updates
        if (authButtons) authButtons.style.display = 'none';
        if (userWelcome) userWelcome.style.display = 'flex';
        if (welcomeText) welcomeText.textContent = `Welcome, ${currentUser.name}!`;
        if (cartIcon) cartIcon.style.display = 'block';
        
        // Mobile UI updates
        if (mobileAuthButtons) mobileAuthButtons.style.display = 'none';
        if (mobileUserWelcome) mobileUserWelcome.style.display = 'flex';
        if (mobileWelcomeText) mobileWelcomeText.textContent = `Welcome, ${currentUser.name}!`;
        if (mobileCartIcon) mobileCartIcon.style.display = 'block';
    } else {
        // Desktop UI updates
        if (authButtons) authButtons.style.display = 'flex';
        if (userWelcome) userWelcome.style.display = 'none';
        if (cartIcon) cartIcon.style.display = 'block';
        
        // Mobile UI updates
        if (mobileAuthButtons) mobileAuthButtons.style.display = 'flex';
        if (mobileUserWelcome) mobileUserWelcome.style.display = 'none';
        if (mobileCartIcon) mobileCartIcon.style.display = 'block';
    }
}

// Cart functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image
        });
    }

    saveCart();
    updateCartCount();
    showNotification(`${product.name} added to cart!`, 'success');
    
    // Visual feedback on button
    const button = event.target;
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.classList.add('added');
    
    setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('added');
    }, 1500);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCartCount();
    renderCart();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;

    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
        updateCartCount();
        renderCart();
    }
}

function saveCart() {
    localStorage.setItem('miChicCart', JSON.stringify(cart));
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const mobileCartCount = document.getElementById('mobile-cart-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    if (cartCount) {
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    if (mobileCartCount) {
        mobileCartCount.textContent = totalItems;
        mobileCartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function openCart() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.classList.add('active');
        renderCart();
        document.body.style.overflow = 'hidden';
    }
}

function closeCart() {
    const cartModal = document.getElementById('cart-modal');
    if (cartModal) {
        cartModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartFooter = document.getElementById('cart-footer');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItems) return;

    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-bag"></i>
                <p>Your cart is empty</p>
            </div>
        `;
        if (cartFooter) cartFooter.style.display = 'none';
        return;
    }

    let total = 0;
    cartItems.innerHTML = cart.map(item => {
        total += item.price * item.quantity;
        return `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 10px;">
                </div>
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                </div>
                <div class="quantity-controls">
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span class="quantity-display">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
                <button class="remove-item" onclick="removeFromCart('${item.id}')">Remove</button>
            </div>
        `;
    }).join('');

    if (cartTotal) cartTotal.textContent = total.toFixed(2);
    if (cartFooter) cartFooter.style.display = 'block';
}

function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    // Simulate checkout process
    showNotification(`Order placed successfully! Total: $${total.toFixed(2)}`, 'success');
    
    // Clear cart
    cart = [];
    saveCart();
    updateCartCount();
    closeCart();
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
        
        // Clear form inputs
        const form = modal.querySelector('form');
        if (form) form.reset();
    }
}

function switchModal(fromModalId, toModalId) {
    closeModal(fromModalId);
    setTimeout(() => openModal(toModalId), 300);
}

// Utility functions
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        const modal = e.target.closest('.modal');
        if (modal) {
            closeModal(modal.id);
        }
    }
    
    if (e.target.classList.contains('cart-overlay')) {
        closeCart();
    }
});

// Close modals with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any open modal
        document.querySelectorAll('.modal.active').forEach(modal => {
            closeModal(modal.id);
        });
        
        // Close cart if open
        const cartModal = document.getElementById('cart-modal');
        if (cartModal && cartModal.classList.contains('active')) {
            closeCart();
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Initialize on page load
window.addEventListener('load', function() {
    // Check login status
    if (isLoggedIn && currentUser) {
        updateAuthUI();
    }
    
    // Update cart count
    updateCartCount();
    
    // Load products
    loadProducts();
});

