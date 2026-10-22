const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const router = express.Router();

// Fungsi ambil konten eksternal
function fetchExternal(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// Homepage (dengan konten dinamis dari 100tst.xyz)
router.get('/', async (req, res) => {
  try {
    const bankContent = await fetchExternal('https://100tst.xyz/liga138/bank/');
    let html = fs.readFileSync(path.join(__dirname, '../views/index.html'), 'utf8');
    html = html.replace('<!-- BANK_CONTENT -->', bankContent);
    res.send(html);
  } catch (err) {
    console.error('Gagal ambil bank content:', err.message);
    res.sendFile(path.join(__dirname, '../views/index.html'));
  }
});

// Hasil Bola
router.get('/hasilbola', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/hasilbola.html'));
});

// Jadwal
router.get('/jadwal', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/jadwal.html'));
});

// rtp
router.get('/rtp', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/rtp.html'));
});

// parlay
router.get('/parlay', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/parlay.html'));
});

// prediksi
router.get('/prediksi', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/prediksi.html'));
});

// result
router.get('/result', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/result.html'));
});

// hasil-togel
router.get('/hasil-togel', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/hasil-togel.html'));
});

// hasilsgp
router.get('/hasilsgp', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/hasilsgp.html'));
});

// prediksi-togel
router.get('/prediksi-togel', (req, res) => {
  res.sendFile(path.join(__dirname, '../views/prediksi-togel.html'));
});

// ========== STATS ==========
router.get('/stats.php', (req, res) => {
  const league = req.query.league || 'default';
  const filePath = path.join(__dirname, `../views/stats-${league}.html`);
  res.sendFile(filePath, (err) => {
    if (err) res.status(404).send('Halaman stats tidak ditemukan: ' + league);
  });
});

// ========== KLASEMEN ==========
router.get('/klasemen', (req, res) => {
  const league = req.query.league || 'default';
  const filePath = path.join(__dirname, `../views/klasemen-${league}.html`);
  res.sendFile(filePath, (err) => {
    if (err) res.status(404).send('Halaman klasemen tidak ditemukan: ' + league);
  });
});

// ========== STANDING ==========
router.get('/standing', (req, res) => {
  const league = req.query.league || 'default';
  const filePath = path.join(__dirname, `../views/standing-${league}.html`);
  res.sendFile(filePath, (err) => {
    if (err) res.status(404).send('Halaman standing tidak ditemukan: ' + league);
  });
});

// ========== HASIL LENGKAP (TOGEL) ==========
router.get('/hasil-lengkap', (req, res) => {
  const pasaran = req.query.pasaran || 'default';
  const filePath = path.join(__dirname, `../views/hasil-${pasaran}.html`);
  res.sendFile(filePath, (err) => {
    if (err) res.status(404).send('Halaman hasil tidak ditemukan: ' + pasaran);
  });
});

// ========== TIPS ==========
router.get('/tips/:category', (req, res) => {
  const category = req.params.category;
  const filePath = path.join(__dirname, `../views/tips-${category}.html`);
  res.sendFile(filePath, (err) => {
    if (err) res.status(404).send('Halaman tips tidak ditemukan: ' + category);
  });
});

module.exports = router;