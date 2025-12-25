# Turnike Erişim Kontrol Sistemleri Web Sitesi

Kurumsal turnike ve erişim kontrol sistemleri için profesyonel web sitesi projesi.

## 📋 Proje Özellikleri

- ✅ Modern ve responsive tasarım (mobil, tablet, desktop uyumlu)
- ✅ Çoklu dil desteği (Türkçe / İngilizce)
- ✅ SEO uyumlu sayfa yapısı
- ✅ RESTful API backend (Node.js + Express.js)
- ✅ MongoDB veritabanı entegrasyonu
- ✅ Dinamik içerik yönetimi
- ✅ İletişim formu entegrasyonu
- ✅ Lazy loading görseller

## 🗂️ Proje Yapısı

```
Turnike-Örnek-Websitesi/
├── frontend/
│   ├── index.html          # Ana sayfa
│   ├── about.html          # Hakkımızda sayfası
│   ├── products.html       # Ürünler sayfası
│   ├── references.html     # Referanslar sayfası
│   ├── contact.html        # İletişim sayfası
│   ├── css/
│   │   └── style.css       # Ana stil dosyası
│   ├── js/
│   │   ├── api.js          # API entegrasyon fonksiyonları
│   │   └── main.js         # Ana JavaScript dosyası
│   └── images/             # Görseller klasörü
├── backend/
│   ├── server.js           # Express server
│   ├── config/
│   │   └── database.js     # MongoDB bağlantı yapılandırması
│   ├── models/
│   │   ├── Product.js       # Ürün modeli
│   │   ├── Reference.js     # Referans modeli
│   │   └── ContactMessage.js # İletişim mesajı modeli
│   ├── routes/
│   │   ├── products.js      # Ürün route'ları
│   │   ├── references.js    # Referans route'ları
│   │   └── contact.js       # İletişim route'ları
│   └── package.json         # Backend bağımlılıkları
└── README.md
```

## 🚀 Kurulum ve Çalıştırma

### Gereksinimler

- Node.js (v14 veya üzeri)
- MongoDB (yerel veya MongoDB Atlas)
- npm veya yarn

### Backend Kurulumu

1. Backend klasörüne gidin:
```bash
cd backend
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. `.env` dosyası oluşturun (opsiyonel):
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/turnike-db
```

4. MongoDB'yi başlatın (yerel kullanım için):
```bash
# MongoDB servisini başlatın
```

5. Backend sunucusunu başlatın:
```bash
npm start
# veya geliştirme modu için:
npm run dev
```

Backend sunucusu `http://localhost:5000` adresinde çalışacaktır.

### Frontend Kurulumu

Frontend statik HTML dosyalarından oluştuğu için özel bir kurulum gerektirmez. Ancak API istekleri için backend sunucusunun çalışıyor olması gerekir.

1. Frontend dosyalarını bir web sunucusunda servis edin:
   - Basit bir HTTP sunucusu kullanabilirsiniz (örn: `python -m http.server 8000`)
   - Veya VS Code Live Server extension'ı kullanabilirsiniz
   - Veya backend'e static file serving ekleyebilirsiniz

2. `frontend/js/api.js` dosyasındaki `API_BASE_URL` değerini kontrol edin:
```javascript
const API_BASE_URL = 'http://localhost:5000/api';
```

## 📝 API Endpoints

### Ürünler
- `GET /api/products` - Tüm ürünleri getir
- `GET /api/products/featured` - Öne çıkan ürünleri getir
- `GET /api/products/:id` - Belirli bir ürünü getir

### Referanslar
- `GET /api/references` - Tüm referansları getir
- `GET /api/references/:id` - Belirli bir referansı getir

### İletişim
- `POST /api/contact` - İletişim formu gönder
  - Body: `{ name: string, email: string, message: string }`

## 🗄️ Veritabanı Modelleri

### Product
```javascript
{
  name: { tr: String, en: String },
  description: { tr: String, en: String },
  technicalSpecs: { tr: String, en: String },
  imageUrl: String,
  category: { tr: String, en: String },
  featured: Boolean,
  createdAt: Date
}
```

### Reference
```javascript
{
  name: { tr: String, en: String },
  description: { tr: String, en: String },
  imageUrl: String,
  location: { tr: String, en: String },
  createdAt: Date
}
```

### ContactMessage
```javascript
{
  name: String,
  email: String,
  message: String,
  createdAt: Date,
  read: Boolean
}
```

## 🎨 Özellikler

### Sayfalar
1. **Ana Sayfa** - Hero banner, öne çıkan ürünler, referanslar
2. **Hakkımızda** - Vizyon, misyon, değerler, ekip
3. **Ürünler** - Ürün kataloğu, filtreleme
4. **Referanslar** - Tamamlanan projeler
5. **İletişim** - İletişim formu ve bilgileri

### Dil Desteği
- Türkçe ve İngilizce dil desteği
- Dil tercihi localStorage'da saklanır
- Tüm sayfa içerikleri dinamik olarak çevrilir

### Responsive Tasarım
- Mobil uyumlu (480px+)
- Tablet uyumlu (768px+)
- Desktop uyumlu (1200px+)

## 🔧 Geliştirme

### Örnek Veri Ekleme

MongoDB'ye örnek veri eklemek için MongoDB shell veya bir script kullanabilirsiniz:

```javascript
// Örnek ürün
db.products.insertOne({
  name: { tr: "Tripod Turnike", en: "Tripod Turnstile" },
  description: { 
    tr: "Kompakt ve güvenilir tripod turnike sistemi", 
    en: "Compact and reliable tripod turnstile system" 
  },
  technicalSpecs: { 
    tr: "Yükseklik: 100cm, Genişlik: 50cm", 
    en: "Height: 100cm, Width: 50cm" 
  },
  imageUrl: "https://example.com/tripod.jpg",
  category: { tr: "Tripod", en: "Tripod" },
  featured: true
});
```

## 🚀 Deployment

Projeyi deploy etmek için detaylı rehber:

- **Detaylı Rehber:** [DEPLOYMENT.md](DEPLOYMENT.md)
- **Hızlı Başlangıç:** [QUICK_START.md](QUICK_START.md)

### Deployment Platformları

- **Frontend:** Netlify
- **Backend:** Render
- **Database:** MongoDB Atlas

### Hızlı Deployment

1. GitHub'a push edin
2. MongoDB Atlas cluster oluşturun
3. Render'da backend deploy edin
4. Netlify'da frontend deploy edin
5. Environment variables'ları ayarlayın

Detaylar için `DEPLOYMENT.md` dosyasına bakın.

## 📞 İletişim

Sorularınız için: muhammedsenceroztrk@gmail.com

## 📄 Lisans

Bu proje örnek amaçlı oluşturulmuştur.

Muhammed Sencer ÖZTÜRK - Full Stack Developer
