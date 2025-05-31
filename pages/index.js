// pages/index.js
import Head from 'next/head';
import { useState } from 'react';

// Komponen SVG untuk Logo X (Twitter)
const XLogo = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
  </svg>
);

// Komponen SVG untuk Logo GitHub
const GitHubLogo = () => (
  <svg
    viewBox="0 0 24 24"
    width="24"
    height="24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
  </svg>
);

export default function LandAllocationCalculatorPage() {
  const [totalLandInput, setTotalLandInput] = useState('');
  const [results, setResults] = useState(null);

  const handleCalculate = () => {
    const L_total_input = parseFloat(totalLandInput);
    if (isNaN(L_total_input) || L_total_input <= 0) {
      alert('Masukkan total lahan yang valid (angka positif).');
      setResults(null);
      return;
    }

    const L_pabrik_dan_oxyfuel = 0.50 * L_total_input;
    const L_dac = 0.15 * L_total_input;
    const Kapasitas_DAC_ton_CO2_per_tahun = L_dac * 4000;
    const L_ccus_total = 0.30 * L_total_input;
    const L_infrastruktur = 0.05 * L_total_input;

    const L_total_bangunan_ccus = 0.20 * L_ccus_total;
    const L_gedung_utama_ccus = 0.40 * L_total_bangunan_ccus;
    const L_total_gedung_sub_ccus = 0.60 * L_total_bangunan_ccus;
    const L_setiap_gedung_sub_ccus = L_total_gedung_sub_ccus / 4;
    const L_panel_surya_di_ccus = 0.25 * L_ccus_total;
    const L_ccus_outdoor = L_ccus_total - L_total_bangunan_ccus - L_panel_surya_di_ccus;

    setResults({
      L_total_input,
      L_pabrik_dan_oxyfuel,
      L_dac,
      Kapasitas_DAC_ton_CO2_per_tahun,
      L_ccus_total,
      L_total_bangunan_ccus,
      L_gedung_utama_ccus,
      L_setiap_gedung_sub_ccus,
      L_panel_surya_di_ccus,
      L_ccus_outdoor,
      L_infrastruktur,
    });
  };

  return (
    <div className="container">
      <Head>
        <title>Kalkulator Kasar Alokasi Lahan Ekosistem Karbon</title>
        <meta name="description" content="Kalkulator perkiraan kasar untuk alokasi lahan ekosistem karbon berdasarkan total luas lahan." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="header-main"> {/* Mengganti nama kelas agar tidak konflik dengan .header di globals.css jika ada */}
        <h1>Kalkulator Kasar Alokasi Lahan Ekosistem Karbon</h1>
        <p className="subtitle">Perkiraan ini sangat kasar dan bersifat ilustratif berdasarkan model proporsional.</p>
      </header>

      <main className="main-content">
        <div className="input-section">
          <label htmlFor="totalLand">Masukkan Total Lahan (hektar):</label>
          <input
            type="number"
            id="totalLand"
            value={totalLandInput}
            onChange={(e) => setTotalLandInput(e.target.value)}
            placeholder="Contoh: 100"
            className="input-field"
          />
          <button onClick={handleCalculate} className="calculate-button">
            Hitung Alokasi
          </button>
        </div>

        {results && (
          <div className="results-section">
            <h2>Hasil Perkiraan Alokasi (Total Lahan: {results.L_total_input.toFixed(2)} ha):</h2>
            
            <div className="result-category">
              <h3>Pabrik & Penangkapan Karbon Terintegrasi</h3>
              <p>Luas Pabrik & Fasilitas Oxyfuel: <strong>{results.L_pabrik_dan_oxyfuel.toFixed(2)} ha</strong></p>
            </div>

            <div className="result-category">
              <h3>Direct Air Capture (DAC)</h3>
              <p>Luas Area DAC: <strong>{results.L_dac.toFixed(2)} ha</strong></p>
              <p>Perkiraan Kapasitas Penangkapan CO₂: <strong>{results.Kapasitas_DAC_ton_CO2_per_tahun.toLocaleString()} ton/tahun</strong></p>
            </div>
            
            <div className="result-category">
              <h3>Fasilitas CCUS (Carbon Capture, Utilization, and Storage)</h3>
              <p>Luas Total Area CCUS: <strong>{results.L_ccus_total.toFixed(2)} ha</strong>, dengan rincian:</p>
              <ul>
                <li>Total Luas Bangunan CCUS (1 Utama + 4 Sub): {results.L_total_bangunan_ccus.toFixed(2)} ha</li>
                <li>Luas Gedung Utama CCUS: {results.L_gedung_utama_ccus.toFixed(2)} ha</li>
                <li>Luas per Gedung Sub CCUS: {results.L_setiap_gedung_sub_ccus.toFixed(2)} ha</li>
                <li>Luas Area Panel Surya (di zona CCUS): {results.L_panel_surya_di_ccus.toFixed(2)} ha</li>
                <li>Luas Area Outdoor CCUS (untuk proses, dll.): {results.L_ccus_outdoor.toFixed(2)} ha</li>
              </ul>
            </div>

            <div className="result-category">
              <h3>Infrastruktur Umum & Zona Penyangga</h3>
              <p>Luas Area Infrastruktur: <strong>{results.L_infrastruktur.toFixed(2)} ha</strong></p>
            </div>
          </div>
        )}
      </main>

      <footer className="footer-main"> {/* Mengganti nama kelas */}
        <p>Kalkulator ini bersifat ilustratif. Konsultasikan dengan ahli untuk perencanaan detail.</p>
        <div className="social-links">
          <a href="https://x.com/Vhaeyrin" target="_blank" rel="noopener noreferrer" title="Vhaeyrin on X" style={{ display: 'inline-block', marginRight: '0.5rem' }}>
            <XLogo />
          </a>
          <a href="https://github.com/dkfadhila" target="_blank" rel="noopener noreferrer" title="dkfadhila on GitHub" style={{ display: 'inline-block' }}>
            <GitHubLogo />
          </a>
        </div>
      </footer>

      {/* Minimalist JSX Styles (Anda bisa pindahkan ke globals.css jika preferensi) */}
      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #333;
          background-color: #f4f7f9;
        }
        .header-main { /* Nama kelas diubah */
          width: 100%;
          padding: 2rem 1rem;
          text-align: center;
          background-color: #2c3e50;
          color: white;
          border-bottom: 5px solid #1abc9c;
        }
        .header-main h1 {
          margin: 0;
          line-height: 1.15;
          font-size: 2.2rem; /* Sedikit disesuaikan */
        }
        .subtitle {
          font-size: 0.9rem; /* Sedikit disesuaikan */
          color: #bdc3c7;
          margin-top: 0.5rem;
        }
        .main-content {
          padding: 2rem 1rem;
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 800px;
        }
        .input-section {
          background-color: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-bottom: 2rem;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
        }
        .input-section label {
          font-weight: bold;
          flex-basis: 100%; 
        }
        .input-field {
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
          flex-grow: 1;
          min-width: 150px;
        }
        .calculate-button {
          padding: 0.75rem 1.5rem;
          background-color: #1abc9c;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }
        .calculate-button:hover {
          background-color: #16a085;
        }
        .results-section {
          background-color: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          width: 100%;
        }
        .results-section h2 {
          margin-top: 0;
          color: #2c3e50;
          border-bottom: 2px solid #eee;
          padding-bottom: 0.5rem;
        }
        .result-category {
          margin-bottom: 1.5rem;
        }
        .result-category h3 {
          color: #34495e;
          margin-top: 1rem;
          margin-bottom: 0.5rem;
        }
        .result-category p, .result-category ul {
          margin: 0.25rem 0;
          line-height: 1.6;
          font-size: 0.95rem;
        }
        .result-category ul {
          padding-left: 20px;
        }
        .result-category strong {
          color: #1abc9c;
        }
        .footer-main { /* Nama kelas diubah */
          width: 100%;
          padding: 1.5rem 1rem;
          text-align: center;
          border-top: 1px solid #eaeaea;
          background-color: #2c3e50;
          color: #bdc3c7;
          margin-top: auto; /* Mendorong footer ke bawah */
        }
        .footer-main p {
            margin-bottom: 0.5rem;
            font-size: 0.85rem;
        }
        .social-links {
          display: flex;
          justify-content: center;
          gap: 1rem;
        }
        .social-links a {
          color: white;
          transition: color 0.2s ease;
        }
        .social-links a:hover {
          color: #1abc9c;
        }

        @media (min-width: 600px) {
            .input-section label {
                flex-basis: auto;
                margin-bottom: 0;
            }
            .header-main h1 { font-size: 2.5rem; }
            .subtitle { font-size: 1rem; }
        }
      `}</style>
    </div>
  );
}