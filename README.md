# GSEQpredictfield

# Kalkulator Kasar Alokasi Lahan Ekosistem Karbon

Sebuah aplikasi Next.js sederhana untuk memberikan perkiraan kasar alokasi lahan untuk berbagai komponen dalam ekosistem penangkapan dan pengelolaan karbon (seperti Pabrik dengan Oxyfuel, Direct Air Capture/DAC, dan fasilitas CCUS) berdasarkan total luas lahan yang diinput.

## Fitur Utama

- Input total lahan dalam hektar.
- Perhitungan otomatis proporsional untuk:
  - Luas Pabrik & Fasilitas Oxyfuel Terintegrasi
  - Luas Area DAC & estimasi kapasitas penangkapan CO₂
  - Luas Total Area CCUS (termasuk rincian gedung utama, sub-gedung, dan area panel surya)
  - Luas Area Infrastruktur Umum & Zona Penyangga
- UI minimalis dan responsif.

## Model Perhitungan

Kalkulator ini menggunakan model alokasi proporsional yang bersifat ilustratif dan sangat disederhanakan. Persentase alokasi utama yang digunakan (dapat diubah dalam kode):
- Pabrik & Oxyfuel: 25%
- DAC: 15%
- CCUS: 55%
- Infrastruktur: 5%

Estimasi kapasitas DAC juga bersifat kasar (misal, 4000 ton CO₂/tahun per hektar lahan DAC skala pilot/demonstrasi).

**PENTING:** Hasil dari kalkulator ini adalah perkiraan kasar dan tidak boleh digunakan sebagai dasar perencanaan proyek riil tanpa konsultasi dan analisis mendalam oleh para ahli teknik dan perancang fasilitas.

## Cara Menjalankan Lokal

1. Clone repositori ini (jika sudah diunggah ke Git).
2. Instal dependensi:
   ```bash
   npm install
   # atau
   yarn install
