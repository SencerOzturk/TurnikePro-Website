# Database Setup

Bu klasör MongoDB veritabanı yapılandırması ve seed script'leri için ayrılmıştır.

## MongoDB Kurulumu

### Yerel Kurulum

1. MongoDB'yi sisteminize kurun: https://www.mongodb.com/try/download/community

2. MongoDB servisini başlatın:
```bash
# Windows
net start MongoDB

# Linux/Mac
sudo systemctl start mongod
# veya
brew services start mongodb-community
```

3. MongoDB'nin çalıştığını kontrol edin:
```bash
mongosh
```

### MongoDB Atlas (Cloud)

1. MongoDB Atlas hesabı oluşturun: https://www.mongodb.com/cloud/atlas

2. Cluster oluşturun ve connection string'i alın

3. `.env` dosyasında `MONGODB_URI` değerini güncelleyin:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/turnike-db
```

## Veritabanı İsmi

Varsayılan veritabanı ismi: `turnike-db`

## Seed Script Çalıştırma

Örnek verileri veritabanına eklemek için:

```bash
cd backend
node seed.js
```

Bu script:
- Örnek ürünler ekler
- Örnek referanslar ekler
- Mevcut verileri temizler (dikkatli kullanın!)

## Veritabanı Modelleri

Detaylı model yapıları için `backend/models/` klasörüne bakın.

