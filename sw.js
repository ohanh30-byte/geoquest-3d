const CACHE_NAME = 'geoquest-3d-v1';
const urlsToCache = [
  './',
  './index.html',
  './level1.html',
  './level2.html',
  './level3.html',
  './level4.html',
  './sertifikat.html',
  './icon-192.png',
  './icon-512.png'
];

// Menyimpan file ke memori (Install)
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('File berhasil disimpan ke memori offline!');
        return cache.addAll(urlsToCache);
      })
  );
});

// Mengambil file dari memori saat tidak ada internet (Fetch)
self.addEventListener('fetch', event => {
  // Pengecualian: Biarkan Google Apps Script (Sistem Nilai) tetap butuh internet
  if (event.request.url.includes('script.google.com')) {
    return; 
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Jika ada di memori, pakai yang di memori. Jika tidak, ambil dari internet.
        return response || fetch(event.request);
      })
  );
});

// Menghapus memori lama jika ada update aplikasi (Activate)
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
