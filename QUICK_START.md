# 🚀 Hızlı Başlangıç - Deployment

Bu dosya, projeyi hızlıca deploy etmek için özet adımları içerir. Detaylı bilgi için `DEPLOYMENT.md` dosyasına bakın.

## ⚡ Hızlı Adımlar

### 1. GitHub'a Push
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/KULLANICI_ADI/turnike-website.git
git push -u origin main
```

### 2. MongoDB Atlas
1. https://www.mongodb.com/cloud/atlas → Ücretsiz hesap oluştur
2. Cluster oluştur (Free M0)
3. Database User oluştur
4. Network Access → "Allow Access from Anywhere" (0.0.0.0/0)
5. Connection String'i kopyala:
   ```
   mongodb+srv://username:password@cluster.xxxxx.mongodb.net/turnike-db?retryWrites=true&w=majority
   ```

### 3. Render (Backend)
1. https://render.com → GitHub ile giriş
2. "New Web Service" → Repository seç
3. Ayarlar:
   - **Name:** `turnike-backend`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. Environment Variables:
   - `MONGODB_URI` = MongoDB Atlas connection string
   - `NODE_ENV` = `production`
   - `PORT` = `10000`
5. Deploy → Backend URL'ini not et: `https://turnike-backend.onrender.com`

### 4. Netlify (Frontend)
1. https://www.netlify.com → GitHub ile giriş
2. "Add new site" → "Import an existing project"
3. Repository seç
4. Build settings:
   - **Base directory:** `frontend`
   - **Build command:** (boş)
   - **Publish directory:** `frontend`
5. Environment Variables:
   - `API_BASE_URL` = `https://turnike-backend.onrender.com/api`
6. Deploy

### 5. Frontend'de API URL Güncelle
Tüm HTML dosyalarında (`index.html`, `about.html`, vb.) `<head>` içindeki script tag'inde backend URL'ini güncelle:

```html
<script>
    window.API_BASE_URL = 'https://turnike-backend.onrender.com/api';
</script>
```

### 6. Backend CORS Güncelle
`backend/server.js` dosyasında `allowedOrigins` array'ine Netlify URL'inizi ekleyin:

```javascript
const allowedOrigins = [
  'http://localhost:8000',
  'https://your-site.netlify.app',  // Netlify URL'inizi buraya ekleyin
  process.env.FRONTEND_URL
].filter(Boolean);
```

Render'da Environment Variable olarak da ekleyebilirsiniz:
- `FRONTEND_URL` = `https://your-site.netlify.app`

### 7. Database Seed
Backend deploy edildikten sonra, örnek verileri eklemek için:

**Yöntem 1:** Local'de çalıştır (MongoDB Atlas connection string ile)
```bash
cd backend
# .env dosyasında MONGODB_URI'yi güncelle
node seed.js
```

**Yöntem 2:** Render Shell kullan (Render dashboard → Shell)

## ✅ Kontrol Listesi

- [ ] GitHub'da repository var
- [ ] MongoDB Atlas cluster oluşturuldu ve connection string alındı
- [ ] Render'da backend deploy edildi ve çalışıyor (`/api/health` test et)
- [ ] Netlify'da frontend deploy edildi
- [ ] Frontend'de API URL güncellendi
- [ ] Backend CORS ayarları yapıldı
- [ ] Database seed script çalıştırıldı
- [ ] Tüm sayfalar test edildi

## 🔗 Önemli URL'ler

- **Frontend:** `https://your-site.netlify.app`
- **Backend:** `https://turnike-backend.onrender.com`
- **Backend Health Check:** `https://turnike-backend.onrender.com/api/health`

## ⚠️ Önemli Notlar

1. **Render Free Tier:** 15 dakika kullanılmazsa uyku moduna geçer, ilk istekte 1-2 dakika uyanma süresi olabilir.

2. **CORS:** Frontend ve backend farklı domain'lerde olduğu için CORS ayarları kritik.

3. **Environment Variables:** Production'da asla hardcode etmeyin, environment variables kullanın.

4. **MongoDB Atlas:** Free tier'da 512MB storage limiti var.

## 🆘 Sorun mu var?

Detaylı bilgi için `DEPLOYMENT.md` dosyasına bakın veya:
- Render logs: Render dashboard → Logs
- Netlify logs: Netlify dashboard → Deploys → Build log
- MongoDB Atlas: Database → Collections → Documents

