// Seed script for adding sample data to MongoDB
// Run with: node seed.js

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const Product = require('./models/Product');
const Reference = require('./models/Reference');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/turnike-db';

const sampleProducts = [
  {
    name: {
      tr: "Tripod Turnike",
      en: "Tripod Turnstile"
    },
    description: {
      tr: "Kompakt ve güvenilir tripod turnike sistemi. Yüksek trafikli alanlar için ideal çözüm.",
      en: "Compact and reliable tripod turnstile system. Ideal solution for high-traffic areas."
    },
    technicalSpecs: {
      tr: "Yükseklik: 100cm | Genişlik: 50cm | Güç: 24V DC | Geçiş Hızı: 30 kişi/dakika",
      en: "Height: 100cm | Width: 50cm | Power: 24V DC | Passage Speed: 30 people/minute"
    },
    imageUrl: "https://via.placeholder.com/400x300?text=Tripod+Turnike",
    category: {
      tr: "Tripod",
      en: "Tripod"
    },
    featured: true
  },
  {
    name: {
      tr: "Tam Boy Turnike",
      en: "Full Height Turnstile"
    },
    description: {
      tr: "Maksimum güvenlik sağlayan tam boy turnike sistemi. Yüksek güvenlik gerektiren alanlar için.",
      en: "Full height turnstile system providing maximum security. For areas requiring high security."
    },
    technicalSpecs: {
      tr: "Yükseklik: 220cm | Genişlik: 60cm | Güç: 220V AC | Geçiş Hızı: 20 kişi/dakika",
      en: "Height: 220cm | Width: 60cm | Power: 220V AC | Passage Speed: 20 people/minute"
    },
    imageUrl: "https://via.placeholder.com/400x300?text=Full+Height+Turnike",
    category: {
      tr: "Tam Boy",
      en: "Full Height"
    },
    featured: true
  },
  {
    name: {
      tr: "Bariyerli Turnike",
      en: "Barrier Turnstile"
    },
    description: {
      tr: "Araç ve yaya geçişi için bariyerli turnike sistemi. Çok amaçlı kullanım.",
      en: "Barrier turnstile system for vehicle and pedestrian access. Multi-purpose use."
    },
    technicalSpecs: {
      tr: "Yükseklik: 120cm | Genişlik: 300cm | Güç: 220V AC | Geçiş Hızı: 15 araç/dakika",
      en: "Height: 120cm | Width: 300cm | Power: 220V AC | Passage Speed: 15 vehicles/minute"
    },
    imageUrl: "https://via.placeholder.com/400x300?text=Barrier+Turnike",
    category: {
      tr: "Bariyerli",
      en: "Barrier"
    },
    featured: false
  },
  {
    name: {
      tr: "Optik Turnike",
      en: "Optical Turnstile"
    },
    description: {
      tr: "Modern optik sensör teknolojisi ile donatılmış turnike sistemi. Estetik ve fonksiyonel.",
      en: "Turnstile system equipped with modern optical sensor technology. Aesthetic and functional."
    },
    technicalSpecs: {
      tr: "Yükseklik: 110cm | Genişlik: 55cm | Güç: 24V DC | Geçiş Hızı: 40 kişi/dakika",
      en: "Height: 110cm | Width: 55cm | Power: 24V DC | Passage Speed: 40 people/minute"
    },
    imageUrl: "https://via.placeholder.com/400x300?text=Optical+Turnike",
    category: {
      tr: "Tripod",
      en: "Tripod"
    },
    featured: false
  }
];

const sampleReferences = [
  {
    name: {
      tr: "İstanbul Havalimanı",
      en: "Istanbul Airport"
    },
    description: {
      tr: "Türkiye'nin en büyük havalimanında 50+ turnike sistemi kurulumu.",
      en: "Installation of 50+ turnstile systems at Turkey's largest airport."
    },
    imageUrl: "https://via.placeholder.com/400x300?text=Istanbul+Airport",
    location: {
      tr: "İstanbul, Türkiye",
      en: "Istanbul, Turkey"
    }
  },
  {
    name: {
      tr: "Ankara Üniversitesi",
      en: "Ankara University"
    },
    description: {
      tr: "Kampüs girişlerinde tam boy turnike sistemleri kurulumu.",
      en: "Full height turnstile system installation at campus entrances."
    },
    imageUrl: "https://via.placeholder.com/400x300?text=Ankara+University",
    location: {
      tr: "Ankara, Türkiye",
      en: "Ankara, Turkey"
    }
  },
  {
    name: {
      tr: "İzmir Metro",
      en: "Izmir Metro"
    },
    description: {
      tr: "Metro istasyonlarında optik turnike sistemleri entegrasyonu.",
      en: "Optical turnstile system integration at metro stations."
    },
    imageUrl: "https://via.placeholder.com/400x300?text=Izmir+Metro",
    location: {
      tr: "İzmir, Türkiye",
      en: "Izmir, Turkey"
    }
  },
  {
    name: {
      tr: "Bursa Alışveriş Merkezi",
      en: "Bursa Shopping Center"
    },
    description: {
      tr: "Alışveriş merkezi girişlerinde bariyerli turnike sistemleri.",
      en: "Barrier turnstile systems at shopping center entrances."
    },
    imageUrl: "https://via.placeholder.com/400x300?text=Bursa+Mall",
    location: {
      tr: "Bursa, Türkiye",
      en: "Bursa, Turkey"
    }
  },
  {
    name: {
      tr: "Antalya Otel Kompleksi",
      en: "Antalya Hotel Complex"
    },
    description: {
      tr: "Lüks otel kompleksinde özel tasarım turnike sistemleri.",
      en: "Custom designed turnstile systems at luxury hotel complex."
    },
    imageUrl: "https://via.placeholder.com/400x300?text=Antalya+Hotel",
    location: {
      tr: "Antalya, Türkiye",
      en: "Antalya, Turkey"
    }
  },
  {
    name: {
      tr: "İstanbul Teknoloji Parkı",
      en: "Istanbul Technology Park"
    },
    description: {
      tr: "Teknoloji parkında akıllı erişim kontrol sistemleri kurulumu.",
      en: "Smart access control system installation at technology park."
    },
    imageUrl: "https://via.placeholder.com/400x300?text=Tech+Park",
    location: {
      tr: "İstanbul, Türkiye",
      en: "Istanbul, Turkey"
    }
  }
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Reference.deleteMany({});
    console.log('Cleared existing data');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} products`);

    // Insert sample references
    const references = await Reference.insertMany(sampleReferences);
    console.log(`Inserted ${references.length} references`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

