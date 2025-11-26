# 🌱 EcoWaste - Toko Online Produk Ramah Lingkungan

[![GitHub](https://img.shields.io/badge/GitHub-ecowaste-green?style=flat-square&logo=github)](https://github.com/RidwanFadillah/ecowaste)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-brightgreen?style=flat-square)]()

Toko online modern untuk produk-produk ramah lingkungan dengan antarmuka yang intuitif, responsif, dan dilengkapi dengan animasi menarik. Platform ini dirancang untuk membantu konsumen melakukan transisi menuju konsumsi yang berkelanjutan.

## ✨ Fitur Utama

### 🎨 Desain & UX
- **Responsive Design**: Sempurna di desktop, tablet, dan mobile
- **Modern UI**: Desain clean dengan gradient, shadow, dan spacing optimal
- **Smooth Animations**: Berbagai animasi menarik untuk meningkatkan user experience
- **Dark Mode Ready**: Struktur CSS siap untuk dark mode (CSS variables)

### 🛍️ Fitur E-Commerce
- **Keranjang Belanja**: Modal keranjang dengan preview produk
- **Filter Produk**: Filter berdasarkan kategori (Fashion, Lifestyle, Personal Care)
- **Product Cards**: Hover effects, zoom images, dan shimmer animations
- **Quantity Management**: Tambah/kurang jumlah produk dengan smooth controls

### 🔄 Integrasi Data
- **Supabase Integration**: Database backend dengan realtime support
- **LocalStorage**: Persist keranjang belanja di browser
- **Product Management**: Kelola produk dari database

### 📱 Mobile Optimized
- **Mobile Navigation**: Hamburger menu toggle untuk navigasi mobile
- **Touch-Friendly**: Controls yang optimal untuk layar sentuh
- **Responsive Grid**: Layout yang beradaptasi dengan ukuran layar

### ❓ Interaksi User
- **FAQ Accordion**: Tanya jawab dengan accordion collapse/expand
- **Toast Notifications**: Notifikasi non-blocking untuk feedback
- **Smooth Scrolling**: Navigasi dengan smooth scroll behavior
- **Keyboard Support**: ESC untuk menutup modal dan hamburger menu

## 🚀 Quick Start

### Prerequisites
- Browser modern (Chrome, Firefox, Safari, Edge)
- Koneksi internet (untuk Supabase)

### Installation

1. **Clone repository**
```bash
git clone https://github.com/RidwanFadillah/ecowaste.git
cd ecowaste_webapp
```

2. **Buka file lokal**
```bash
# Windows PowerShell
Invoke-Item .\index.html

# atau buka langsung di browser
# file:///path/to/ecowaste_webapp/index.html
```

3. **Setup Supabase (Opsional - untuk produk dari database)**
   - Buat akun di [supabase.io](https://supabase.io)
   - Buat project dan table `products`
   - Update kredensial di `script.js`:
   ```javascript
   const supabaseUrl = 'YOUR_SUPABASE_URL';
   const supabaseKey = 'YOUR_SUPABASE_KEY';
   ```

## 📁 Struktur Project

```
ecowaste_webapp/
├── index.html          # HTML utama dengan struktur semantic
├── style.css           # Styling dengan CSS variables dan animations
├── script.js           # JavaScript untuk interaksi dan Supabase
├── database.sql        # Schema database (untuk setup Supabase)
└── README.md           # Dokumentasi ini
```

## 🎯 Fitur Detail

### Header & Navigation
- Fixed header dengan glass-morphism effect
- Responsive hamburger menu di mobile
- Active link indicator saat scroll
- Cart icon dengan badge counter

### Hero Section
- Gradient background dengan parallax effect
- Slide-in animations untuk text dan CTA
- Hero visual dengan background image
- Call-to-action button dengan pulse animation

### Features Section
- 3 feature cards (atau lebih di desktop)
- Scale-in animations dengan stagger delay
- Hover effects dengan gradient overlay
- Glow text animation pada heading

### Products Section
- Dynamic grid layout yang responsive
- Product cards dengan:
  - Image preview
  - Product name & description
  - Price display dengan pulse animation
  - Add to cart button dengan shimmer effect
  - Hover zoom effect pada image
- Filter buttons untuk kategori
- Staggered reveal animations

### FAQ Section
- Accordion-style questions & answers
- Smooth expand/collapse animations
- Arrow icon rotation saat toggle
- Multiple FAQ items dengan stagger animation

### Cart Modal
- Modern modal design dengan gradient header
- Product previews dengan thumbnail
- Quantity controls (−/+) yang smooth
- Remove item dengan fade-out animation
- Cart summary dengan subtotal & total
- Checkout button dengan hover effects
- Empty state ketika keranjang kosong
- Custom scrollbar styling

### Footer
- 4-column layout (desktop) / responsive (mobile)
- Brand info, Menu links, Contact info, Social links
- Social media icons dengan float animation
- Footer credits dengan copyright year auto-update

## 🎨 Desain Sistem

### Color Palette
```css
--primary: #2d5a27        /* Dark green - brand color */
--accent: #4CAF50         /* Light green - call-to-action */
--danger: #e74c3c         /* Red - delete, remove */
--bg: #f7faf5             /* Very light green - background */
--text: #214220           /* Dark green - text */
--muted: #61736a          /* Gray-green - muted text */
```

### Typography
- Font: Segoe UI, Tahoma, Geneva, Verdana, sans-serif
- Heading: Bold, primary color
- Body: Regular, text color
- Muted: Muted color untuk secondary text

### Spacing
- Container: max-width 1200px dengan padding 20px
- Gap: 18px standard spacing
- Section padding: 36px vertical

## ✨ Animasi

### Keyframe Animations
- `fadeInUp`: Fade in with slide up
- `slideInLeft`: Slide in dari kiri
- `slideInRight`: Slide in dari kanan
- `scaleIn`: Scale from 0.9 to 1
- `rotateIn`: Rotate sambil fade in
- `shimmer`: Light sweep effect
- `pulse`: Pulsing glow effect
- `float`: Floating up-down motion
- `glow`: Text glow effect

### Intersection Observer
- Smart scroll animations menggunakan `IntersectionObserver`
- Performance optimized (no jank)
- Fade elemen saat masuk viewport

### Parallax Effect
- Gentle parallax pada hero visual
- Triggered saat window scroll
- Passive event listener untuk performance

## 📊 Browser Support

| Browser | Support |
|---------|---------|
| Chrome  | ✅ Full |
| Firefox | ✅ Full |
| Safari  | ✅ Full |
| Edge    | ✅ Full |
| IE 11   | ❌ Not supported |

## 🔧 Konfigurasi

### Supabase Setup

```sql
CREATE TABLE products (
  id BIGINT PRIMARY KEY,
  name VARCHAR NOT NULL,
  description TEXT,
  price BIGINT NOT NULL,
  image_url VARCHAR,
  category VARCHAR,
  stock BIGINT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Menambah Produk
```javascript
// Insert via Supabase dashboard atau API
{
  "name": "Reusable Water Bottle",
  "description": "Botol minum ramah lingkungan",
  "price": 150000,
  "image_url": "https://...",
  "category": "Lifestyle",
  "stock": 50
}
```

## 🎯 Cara Menggunakan

### Browsing Produk
1. Scroll ke section "Produk Ramah Lingkungan"
2. Gunakan filter buttons untuk kategori tertentu
3. Hover pada product card untuk preview
4. Klik "Tambah ke Keranjang" untuk menambah

### Manajemen Keranjang
1. Klik icon 🛒 di header untuk membuka keranjang
2. Gunakan −/+ untuk mengubah kuantitas
3. Klik 🗑 untuk menghapus item
4. Lihat total di footer modal
5. Klik "Lanjut ke Checkout" untuk order

### Navigasi
1. Klik logo 🌱 untuk kembali ke home
2. Gunakan menu navigation untuk jump ke section
3. ESC untuk menutup modal atau hamburger menu
4. Smooth scroll otomatis saat klik link

### FAQ
1. Scroll ke section FAQ
2. Klik pertanyaan untuk membuka jawaban
3. Hanya satu pertanyaan yang terbuka sekaligus
4. Klik lagi untuk menutup

## 🚀 Performance Tips

### Optimization Done
- ✅ CSS minified & optimized
- ✅ Smooth animations dengan transform & opacity
- ✅ Intersection Observer untuk scroll animations
- ✅ Passive event listeners
- ✅ LocalStorage untuk cart persistence
- ✅ Lazy loading ready untuk images

### Further Optimization
- Gunakan lazy loading untuk product images
- Implement image CDN untuk faster loading
- Add service worker untuk offline support
- Compress images ke WebP format

## 🔐 Security

### Implemented
- ✅ Supabase RLS (Row Level Security) ready
- ✅ Input sanitization in product display
- ✅ LocalStorage untuk non-sensitive data
- ✅ HTTPS ready

### Best Practices
- Jangan expose API keys di browser (gunakan auth backend)
- Validate form input sebelum send
- Implement CORS policy
- Use environment variables untuk secrets

## 📱 Mobile Experience

### Breakpoints
- **Mobile**: < 760px (1 column layout)
- **Tablet**: 760px - 980px (2 column layout)
- **Desktop**: > 980px (3-4 column layout)

### Mobile Features
- Hamburger menu toggle
- Touch-optimized buttons (min 44px)
- Responsive modal dengan max-height 90vh
- Vertical scroll cart untuk mobile
- Readable font sizes (min 16px)

## 🎓 Learning Resources

Dokumentasi & referensi yang berguna:
- [MDN Web Docs - CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Supabase Documentation](https://supabase.io/docs)
- [CSS Animations Guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Intersection Observer API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)

## 🤝 Contributing

Kontribusi welcome! Silakan:

1. Fork repository
2. Buat feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📝 License

Project ini licensed di bawah MIT License - lihat file [LICENSE](LICENSE) untuk detail.

## 👨‍💻 Author

**Ridwan Fadillah**
- GitHub: [@RidwanFadillah](https://github.com/RidwanFadillah)
- Project: [EcoWaste](https://github.com/RidwanFadillah/ecowaste)

## 🌍 Environment

- **Created**: November 2025
- **Platform**: Web (HTML/CSS/JavaScript)
- **Backend**: Supabase
- **Hosting**: Ready untuk static hosting (Vercel, Netlify, GitHub Pages)

## 📧 Support & Feedback

Punya pertanyaan atau feedback?
- Email: hello@ecowaste.com
- Phone: +62-812-345-678
- Issues: [GitHub Issues](https://github.com/RidwanFadillah/ecowaste/issues)

---

**Made with 💚 for a sustainable future**

*EcoWaste - Produk Ramah Lingkungan untuk Kehidupan Berkelanjutan*
