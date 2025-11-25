// Inisialisasi Supabase
const supabaseUrl = 'https://zfblpmbfckrnjnoihrds.supabase.co'; // Ganti dengan URL Supabase Anda
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpmYmxwbWJmY2tybmpub2locmRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQwNDk2NDQsImV4cCI6MjA3OTYyNTY0NH0._YFeSvv1sFxDsFroBBtGYjQZk2wWoIaLTvRoy6NAKrY'; // Ganti dengan anon key Anda
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// State aplikasi
let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';
let _lastFocusedElement = null;

// DOM Elements
const productsContainer = document.getElementById('products-container');
const cartCount = document.getElementById('cart-count');
const cartModal = document.getElementById('cart-modal');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const closeModal = document.querySelector('.close');
const checkoutBtn = document.getElementById('checkout-btn');
const filterButtons = document.querySelectorAll('.filter-btn');
const cartIcon = document.querySelector('.cart-icon');
const navLinks = document.querySelectorAll('nav ul li a');

// Event Listeners
document.addEventListener('DOMContentLoaded', initApp);
checkoutBtn.addEventListener('click', checkout);

// Smooth scroll behavior for nav links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href');
        if (targetId.startsWith('#')) {
            e.preventDefault();
            const targetEl = document.querySelector(targetId);
            if (targetEl) {
                window.scrollTo({
                    top: targetEl.offsetTop - 60,
                    behavior: 'smooth'
                });
                // Close mobile nav when a link is clicked
                const mobileNav = document.querySelector('.main-nav');
                const navToggle = document.querySelector('.nav-toggle');
                if (mobileNav && mobileNav.classList.contains('open')) {
                    mobileNav.classList.remove('open');
                    if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }
    });
});

// Highlight active nav link on scroll
function updateActiveNav() {
    const scrollPos = window.scrollY + 70; // offset for fixed header
    let currentId = '';
    document.querySelectorAll('section, footer').forEach(sec => {
        if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
            currentId = '#' + sec.id;
        }
    });
    navLinks.forEach(l => {
        if (l.getAttribute('href') === currentId) {
            l.classList.add('active');
        } else {
            l.classList.remove('active');
        }
    });
}
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// Filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        // Set current filter
        currentFilter = button.dataset.filter;
        // Filter products
        filterProducts();
    });
});

// Inisialisasi aplikasi
async function initApp() {
    await fetchProducts();
    updateCartCount();
}

// Ambil data produk dari Supabase
async function fetchProducts() {
    try {
        const { data, error } = await supabase
            .from('products')
            .select('*');
        
        if (error) {
            throw error;
        }
        
        products = data;
        displayProducts(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        productsContainer.innerHTML = '<p>Terjadi kesalahan saat memuat produk. Silakan refresh halaman.</p>';
    }
}

// Tampilkan produk
function displayProducts(productsToDisplay) {
    if (productsToDisplay.length === 0) {
        productsContainer.innerHTML = '<p>Tidak ada produk yang tersedia.</p>';
        return;
    }
    
    // Build cards with stagger delay via CSS variable
    productsContainer.innerHTML = productsToDisplay.map((product, idx) => `
        <div class="product-card" style="--delay:${idx * 70}ms" data-category="${product.category}">
            <img src="${product.image_url}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">Rp ${product.price.toLocaleString('id-ID')}</p>
                <button class="add-to-cart" data-id="${product.id}">
                    Tambah ke Keranjang
                </button>
            </div>
        </div>
    `).join('');
    
    // Add event listeners to add to cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        });
    });

    // Trigger reveal animations with small timeout to ensure DOM paint
    requestAnimationFrame(() => {
        document.querySelectorAll('.product-card').forEach(card => {
            card.classList.add('reveal');
        });
    });
}

// Filter produk berdasarkan kategori
function filterProducts() {
    if (currentFilter === 'all') {
        displayProducts(products);
    } else {
        const filteredProducts = products.filter(product => product.category === currentFilter);
        displayProducts(filteredProducts);
    }
}

// Tambah produk ke keranjang
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    // Cek apakah produk sudah ada di keranjang
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        // Jika sudah ada, tambah jumlah
        if (existingItem.quantity < product.stock) {
            existingItem.quantity += 1;
        } else {
            alert('Stok produk tidak mencukupi');
            return;
        }
    } else {
        // Jika belum ada, tambah item baru
        if (product.stock > 0) {
            cart.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image_url,
                quantity: 1
            });
        } else {
            alert('Produk sedang habis');
            return;
        }
    }
    
    // Simpan ke localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update tampilan keranjang
    updateCartCount();
    
    // Tampilkan notifikasi
    showNotification(`${product.name} ditambahkan ke keranjang`);

    // Bounce cart icon
    cartIcon.classList.remove('bounce');
    void cartIcon.offsetWidth; // force reflow to restart animation
    cartIcon.classList.add('bounce');
}

// Update jumlah item di keranjang
function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Tampilkan notifikasi
function showNotification(message) {
    // Reuse existing toast if present
    let toast = document.querySelector('.toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.className = 'toast';
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove('hide');
    toast.classList.add('show');

    // Auto hide
    clearTimeout(toast._hideTimer);
    toast._hideTimer = setTimeout(() => {
        toast.classList.remove('show');
        toast.classList.add('hide');
        // Remove after animation ends
        setTimeout(() => {
            if (toast.classList.contains('hide')) {
                toast.remove();
            }
        }, 300);
    }, 3000);
}

// Tampilkan isi keranjang
function displayCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p>Keranjang belanja Anda kosong.</p>';
        cartTotal.textContent = 'Rp 0';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <p class="cart-item-name">${item.name}</p>
                <p class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</p>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn increase" data-id="${item.id}">+</button>
            </div>
            <button class="remove-item" data-id="${item.id}">Hapus</button>
        </div>
    `).join('');
    
    // Hitung total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Rp ${total.toLocaleString('id-ID')}`;
    
    // Add event listeners untuk tombol di keranjang
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            updateQuantity(productId, -1);
        });
    });
    
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            updateQuantity(productId, 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.dataset.id);
            removeFromCart(productId);
        });
    });
}

// Update jumlah item di keranjang
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    
    if (!item) return;
    
    // Cek stok jika menambah jumlah
    if (change > 0) {
        const product = products.find(p => p.id === productId);
        if (item.quantity >= product.stock) {
            alert('Stok produk tidak mencukupi');
            return;
        }
    }
    
    item.quantity += change;
    
    // Jika jumlah menjadi 0, hapus dari keranjang
    if (item.quantity <= 0) {
        removeFromCart(productId);
        return;
    }
    
    // Simpan ke localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update tampilan
    updateCartCount();
    displayCart();
}

// Hapus item dari keranjang
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    
    // Simpan ke localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update tampilan
    updateCartCount();
    displayCart();
    
    // Tampilkan notifikasi
    showNotification('Produk dihapus dari keranjang');
}

// Proses checkout
function checkout() {
    if (cart.length === 0) {
        alert('Keranjang belanja Anda kosong');
        return;
    }
    
    // Simulasikan proses checkout
    alert('Terima kasih! Pesanan Anda sedang diproses.');
    
    // Kosongkan keranjang
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Update tampilan
    updateCartCount();
    displayCart();
    
    // Tutup modal dengan fungsi yang ada
    closeCartModal();
}

// Event listener untuk membuka modal keranjang dan menampilkan isinya
cartIcon.addEventListener('click', () => {
    openCartModal();
    displayCart();
});

function openCartModal() {
    if (!cartModal) return;
    _lastFocusedElement = document.activeElement;
    cartModal.classList.add('visible');
    cartModal.setAttribute('aria-hidden', 'false');
    // focus the close button for accessibility
    const closeBtn = cartModal.querySelector('.close');
    if (closeBtn) closeBtn.focus();
}

function closeCartModal() {
    const content = cartModal.querySelector('.modal-content');
    if (content) {
        content.classList.add('closing');
        setTimeout(() => {
            content.classList.remove('closing');
            cartModal.classList.remove('visible');
            cartModal.setAttribute('aria-hidden', 'true');
            // restore focus
            try { if (_lastFocusedElement) _lastFocusedElement.focus(); } catch (e) {}
        }, 200);
    } else {
        cartModal.classList.remove('visible');
        cartModal.setAttribute('aria-hidden', 'true');
        try { if (_lastFocusedElement) _lastFocusedElement.focus(); } catch (e) {}
    }
}

closeModal.addEventListener('click', closeCartModal);
window.addEventListener('click', (e) => { if (e.target === cartModal) closeCartModal(); });

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        if (cartModal && cartModal.classList.contains('visible')) {
            closeCartModal();
        }
        // also close mobile nav if open
        const mobileNav = document.querySelector('.main-nav');
        const navToggle = document.querySelector('.nav-toggle');
        if (mobileNav && mobileNav.classList.contains('open')) {
            mobileNav.classList.remove('open');
            if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        }
    }
});

// FAQ Accordion Handler
(function(){
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        if (!toggle) return;
        
        toggle.addEventListener('click', () => {
            const isOpen = item.classList.contains('open');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('open');
            });
            
            // Toggle current item
            if (!isOpen) {
                item.classList.add('open');
            }
        });
    });
})();