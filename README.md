# Meteosphere

Meteosphere, React ve Vite kullanılarak geliştirilmiş basit bir hava durumu uygulamasıdır. Kullanıcılar Türkiye'nin büyük şehirlerinde güncel hava durumu bilgilerini görüntüleyebilir, giriş yaparak yorum bırakabilir ve farklı şehirler arasında geçiş yapabilir.

## Özellikler

- Ankara, İstanbul ve İzmir için mock hava durumu verileri
- Şehir arama ve sonuçları arasında gezinme
- Giriş yapmış kullanıcılar için yorum ekleme
- Yorumlar `/api/comments/:city` adresinden yüklenir
- Yeni yorumlar JWT ile `/api/comments` adresine gönderilir

## Kurulum

Projeyi çalıştırmak için Node.js yüklü olmalıdır. Ardından aşağıdaki adımları izleyin:

```bash
npm install
npm run dev
```

Projede gezinme için `react-router-dom` paketine ihtiyaç vardır. Bağımlılıkların kurulduğundan emin olmak için `npm install` komutunu çalıştırın.

MongoDB kullanmak için kök dizindeki `.env` dosyasına bağlantı adresinizi
`MONGO_URI` olarak ekleyin ve sunucuyu aşağıdaki komutla başlatın:

```bash
npm run start:server
```

Bu komutlar gerekli paketleri kurar ve geliştirme sunucusunu `http://localhost:5173` adresinde başlatır.

## Proje Yapısı

- **src/**: React bileşenleri ve stiller
- **public/**: Uygulamada kullanılan statik dosyalar

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır.
