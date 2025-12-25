# 🚀 Deployment Guide - Turnike Web Sitesi

Bu rehber, projeyi GitHub, Netlify (Frontend), Render (Backend) ve MongoDB Atlas (Database) üzerinde deploy etmek için adım adım talimatlar içerir.

## 📋 İçindekiler

1. [GitHub'a Yükleme](#1-githuba-yükleme)
2. [MongoDB Atlas Kurulumu](#2-mongodb-atlas-kurulumu)
3. [Render'da Backend Deploy](#3-renderda-backend-deploy)
4. [Netlify'da Frontend Deploy](#4-netlifyda-frontend-deploy)
5. [Son Kontroller](#5-son-kontroller)

---

## 1. GitHub'a Yükleme

### Adım 1: Git Repository Oluştur

```bash
# Proje klasöründe
git init
git add .
git commit -m "Initial commit: Turnike website project"
```

### Adım 2: GitHub'da Repository Oluştur

1. GitHub.com'a gidin ve yeni bir repository oluşturun
2. Repository adı: `turnike-website` (veya istediğiniz isim)
3. Public veya Private seçin
4. **README, .gitignore veya license eklemeyin** (zaten var)

### Adım 3: Local Repository'yi GitHub'a Bağla

```bash
# GitHub'dan aldığınız URL'i kullanın
git remote add origin https://github.com/KULLANICI_ADI/turnike-website.git
git branch -M main
git push -u origin main
```

---

## 2. MongoDB Atlas Kurulumu

### Adım 1: MongoDB Atlas Hesabı Oluştur

1. https://www.mongodb.com/cloud/atlas adresine gidin
2. Ücretsiz hesap oluşturun (Free Tier - M0)

### Adım 2: Cluster Oluştur

1. "Build a Database" butonuna tıklayın
2. **Free (M0)** seçeneğini seçin
3. Cloud provider ve region seçin (AWS, en yakın region)
4. Cluster adı: `turnike-cluster` (veya istediğiniz isim)
5. "Create" butonuna tıklayın

### Adım 3: Database User Oluştur

1. "Database Access" sekmesine gidin
2. "Add New Database User" butonuna tıklayın
3. Authentication Method: Password
4. Username ve güçlü bir password oluşturun
5. Database User Privileges: "Atlas admin" veya "Read and write to any database"
6. "Add User" butonuna tıklayın

### Adım 4: Network Access Ayarla

1. "Network Access" sekmesine gidin
2. "Add IP Address" butonuna tıklayın
3. **"Allow Access from Anywhere"** seçeneğini seçin (0.0.0.0/0)
   - Veya sadece Render ve Netlify IP'lerini ekleyebilirsiniz
4. "Confirm" butonuna tıklayın

### Adım 5: Connection String Al

1. "Database" sekmesine dönün
2. "Connect" butonuna tıklayın
3. "Connect your application" seçeneğini seçin
4. Driver: Node.js, Version: 5.5 or later
5. Connection string'i kopyalayın:
   ```
   mongodb+srv://<username>:<password>@turnike-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
   ```
6. `<username>` ve `<password>` kısımlarını oluşturduğunuz kullanıcı bilgileriyle değiştirin
7. Database adını ekleyin: `...mongodb.net/turnike-db?retryWrites=true&w=majority`

**Örnek Connection String:**
```
mongodb+srv://myuser:mypassword@turnike-cluster.xxxxx.mongodb.net/turnike-db?retryWrites=true&w=majority
```

Bu connection string'i not edin, Render'da kullanacağız.

---

## 3. Render'da Backend Deploy

### Adım 1: Render Hesabı Oluştur

1. https://render.com adresine gidin
2. GitHub hesabınızla giriş yapın (önerilir)

### Adım 2: Yeni Web Service Oluştur

1. Dashboard'da "New +" butonuna tıklayın
2. "Web Service" seçeneğini seçin
3. GitHub repository'nizi bağlayın ve seçin

### Adım 3: Service Ayarları

Aşağıdaki ayarları yapın:

- **Name:** `turnike-backend` (veya istediğiniz isim)
- **Region:** En yakın region (örn: Frankfurt, Germany)
- **Branch:** `main`
- **Root Directory:** `backend`
- **Runtime:** `Node`
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment:** `Node`

### Adım 4: Environment Variables Ekle

"Environment Variables" bölümüne şunları ekleyin:

```
Key: MONGODB_URI
Value: mongodb+srv://username:password@turnike-cluster.xxxxx.mongodb.net/turnike-db?retryWrites=true&w=majority
```

(MongoDB Atlas'tan aldığınız connection string'i yapıştırın)

```
Key: NODE_ENV
Value: production
```

```
Key: PORT
Value: 10000
```

(Render otomatik olarak PORT environment variable'ını kullanır, ancak belirtmek iyidir)

### Adım 5: Deploy

1. "Create Web Service" butonuna tıklayın
2. Render otomatik olarak build ve deploy işlemini başlatacak
3. Deploy tamamlandığında bir URL alacaksınız: `https://turnike-backend.onrender.com`

**⚠️ Önemli:** İlk deploy 5-10 dakika sürebilir. Free tier'da uygulama 15 dakika kullanılmazsa "sleep" moduna geçer, ilk istekte tekrar uyanır (1-2 dakika sürebilir).

### Adım 6: Backend URL'ini Not Edin

Backend URL'inizi not edin, Netlify'da kullanacağız:
```
https://turnike-backend.onrender.com
```

---

## 4. Netlify'da Frontend Deploy

### Adım 1: Netlify Hesabı Oluştur

1. https://www.netlify.com adresine gidin
2. GitHub hesabınızla giriş yapın (önerilir)

### Adım 2: Yeni Site Oluştur

1. Dashboard'da "Add new site" butonuna tıklayın
2. "Import an existing project" seçeneğini seçin
3. GitHub repository'nizi seçin

### Adım 3: Build Ayarları

Aşağıdaki ayarları yapın:

- **Base directory:** `frontend`
- **Build command:** (boş bırakın - static site)
- **Publish directory:** `frontend`

**Not:** Netlify static site için build command gerektirmez, ancak base directory belirtmeniz gerekir.

### Adım 4: Environment Variables Ekle

"Site settings" > "Environment variables" bölümüne gidin ve ekleyin:

```
Key: VITE_API_URL
Value: https://turnike-backend.onrender.com/api
```

(Render'dan aldığınız backend URL'inizi kullanın)

### Adım 5: Deploy

1. "Deploy site" butonuna tıklayın
2. Netlify otomatik olarak deploy işlemini başlatacak
3. Deploy tamamlandığında bir URL alacaksınız: `https://random-name-123.netlify.app`

### Adım 6: Custom Domain (Opsiyonel)

1. "Site settings" > "Domain management" bölümüne gidin
2. "Add custom domain" butonuna tıklayın
3. Domain'inizi ekleyin ve DNS ayarlarını yapın

---

## 5. Son Kontroller

### Backend Kontrolü

1. Render dashboard'unda backend servisinizin "Live" durumda olduğunu kontrol edin
2. Tarayıcıda şu URL'i açın:
   ```
   https://turnike-backend.onrender.com/api/health
   ```
3. `{"status":"OK","message":"Server is running"}` yanıtını görmelisiniz

### Frontend Kontrolü

1. Netlify dashboard'unda site'inizin deploy edildiğini kontrol edin
2. Tarayıcıda Netlify URL'inizi açın
3. Sayfanın yüklendiğini ve API isteklerinin çalıştığını kontrol edin

### Database Seed (İlk Veri Ekleme)

Backend deploy edildikten sonra, örnek verileri eklemek için:

1. Render dashboard'unda backend servisinize gidin
2. "Shell" sekmesine tıklayın (veya local'de çalıştırın)
3. Şu komutu çalıştırın:
   ```bash
   cd backend
   node seed.js
   ```

**Alternatif:** Local'de seed script'i çalıştırabilirsiniz (MongoDB Atlas connection string'i ile).

---

## 🔧 Sorun Giderme

### Backend Deploy Sorunları

- **Build hatası:** `package.json` dosyasının doğru olduğundan emin olun
- **MongoDB bağlantı hatası:** Connection string'in doğru olduğundan ve Network Access'in açık olduğundan emin olun
- **Port hatası:** Render otomatik olarak PORT environment variable'ını kullanır, kodunuzda `process.env.PORT || 5000` kullanın

### Frontend Deploy Sorunları

- **API istekleri çalışmıyor:** CORS hatası olabilir, backend'de CORS ayarlarını kontrol edin
- **Sayfa bulunamadı:** Netlify'da `_redirects` dosyasının doğru yapılandırıldığından emin olun

### CORS Sorunu

Backend'de CORS ayarları zaten var, ancak production için güncellemek gerekebilir:

```javascript
// backend/server.js
app.use(cors({
  origin: ['https://your-netlify-site.netlify.app', 'http://localhost:8000'],
  credentials: true
}));
```

---

## 📝 Özet Checklist

- [ ] GitHub repository oluşturuldu ve kod push edildi
- [ ] MongoDB Atlas cluster oluşturuldu ve connection string alındı
- [ ] Render'da backend deploy edildi ve çalışıyor
- [ ] Netlify'da frontend deploy edildi ve çalışıyor
- [ ] Environment variables doğru ayarlandı
- [ ] Database seed script çalıştırıldı
- [ ] Tüm sayfalar test edildi
- [ ] API istekleri çalışıyor

---

## 🎉 Tebrikler!

Projeniz başarıyla deploy edildi! Artık canlıda çalışıyor.

**Frontend URL:** `https://your-site.netlify.app`  
**Backend URL:** `https://turnike-backend.onrender.com`  
**Database:** MongoDB Atlas

