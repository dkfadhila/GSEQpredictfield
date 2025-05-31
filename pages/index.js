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

    const pabrikOxyfuelPercentage = 0.25;
    const dacPercentage = 0.15;          
    const ccusTotalPercentage = 0.55;    
    const infrastrukturPercentage = 0.05; 

    const L_pabrik_dan_oxyfuel = pabrikOxyfuelPercentage * L_total_input;
    const L_dac = dacPercentage * L_total_input;
    const Kapasitas_DAC_ton_CO2_per_tahun = L_dac * 4000;
    const L_ccus_total = ccusTotalPercentage * L_total_input;
    const L_infrastruktur = infrastrukturPercentage * L_total_input;

    const L_total_bangunan_ccus = 0.20 * L_ccus_total;
    const L_gedung_utama_ccus = 0.40 * L_total_bangunan_ccus;
    const L_total_gedung_sub_ccus = 0.60 * L_total_bangunan_ccus;
    const L_setiap_gedung_sub_ccus = L_total_gedung_sub_ccus / 4;
    const L_panel_surya_di_ccus = 0.25 * L_ccus_total;
    const L_ccus_outdoor = L_ccus_total - L_total_bangunan_ccus - L_panel_surya_di_ccus;

    const location_considerations = {
      pabrik_oxyfuel: [
        "Ketersediaan dan kedekatan dengan bahan baku utama industri.",
        "Akses ke infrastruktur transportasi (jalan, rel, pelabuhan) untuk logistik.",
        "Ketersediaan pasokan energi yang stabil dan memadai.",
        "Sumber daya air yang cukup untuk proses industri dan pendinginan.",
        "Ketersediaan tenaga kerja terampil.",
        "Peraturan zonasi dan perizinan lingkungan setempat."
      ],
      dac: [
        "Kondisi iklim (suhu, kelembapan udara) yang optimal untuk teknologi DAC terpilih.",
        "Akses ke sumber energi terbarukan atau rendah karbon yang besar dan berkelanjutan.",
        "Biaya dan ketersediaan lahan yang sesuai.",
        "Kedekatan dengan infrastruktur transportasi CO2 atau fasilitas pemanfaatan/penyimpanan.",
        "Kualitas udara ambien (misalnya, tingkat polutan yang dapat mempengaruhi sorben)."
      ],
      ccus: [
        "Untuk Penyimpanan (Storage): Ketersediaan formasi geologis yang aman dan sesuai (misalnya, akuifer saline dalam, bekas lapangan migas).",
        "Untuk Penyimpanan: Karakteristik geologi dan geofisika detail (kapasitas, integritas segel, risiko seismik).",
        "Untuk Penyimpanan: Kedekatan dengan sumber CO2 untuk meminimalkan biaya pipa transportasi.",
        "Untuk Pemanfaatan (Utilization): Kedekatan dengan pasar untuk produk berbasis CO2.",
        "Untuk Pemanfaatan: Ketersediaan bahan baku pendamping (co-reactants) jika diperlukan.",
        "Akses ke infrastruktur (listrik, air, jalan).",
        "Perizinan, penerimaan masyarakat, dan analisis dampak lingkungan (AMDAL).",
        "Hak atas tanah dan subsurface rights."
      ],
      panel_surya: [
        "Tingkat irradiasi matahari (insolasi) yang tinggi di lokasi.",
        "Ketersediaan lahan datar atau dengan kemiringan minimal dan bebas bayangan.",
        "Kondisi tanah yang mendukung untuk instalasi struktur penyangga.",
        "Kedekatan dan kemudahan akses ke jaringan listrik (grid) untuk interkoneksi.",
        "Peraturan lokal terkait instalasi energi terbarukan."
      ]
    };

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
      location_considerations
    });
  };

  return (
    <div className="container">
      <Head>
        <title>Kalkulator Alokasi Lahan Ekosistem Karbon (Pastel)</title>
        <meta name="description" content="Kalkulator perkiraan kasar untuk alokasi lahan ekosistem karbon berdasarkan total luas lahan, termasuk pertimbangan lokasi." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="header-main">
        <h1>Estimasi Lahan Ekosistem Karbon</h1>
        <p className="subtitle">Perkiraan ini sangat kasar & ilustratif.</p>
      </header>

      <main className="main-content">
        <div className="input-section">
          <label htmlFor="totalLand">Total Lahan (ha):</label>
          <input
            type="number"
            id="totalLand"
            value={totalLandInput}
            onChange={(e) => setTotalLandInput(e.target.value)}
            placeholder="Mis: 100"
            className="input-field"
          />
          <button onClick={handleCalculate} className="calculate-button">
            Hitung
          </button>
        </div>

        {results && (
          <div className="results-section">
            <h2>Hasil Estimasi (Total: {results.L_total_input.toFixed(1)} ha):</h2>
            
            <div className="result-category">
              <h3>Pabrik & Oxyfuel Terintegrasi</h3>
              <p>Luas: <strong>{results.L_pabrik_dan_oxyfuel.toFixed(1)} ha</strong> (25%)</p>
            </div>

            <div className="result-category">
              <h3>Direct Air Capture (DAC)</h3>
              <p>Luas: <strong>{results.L_dac.toFixed(1)} ha</strong> (15%)</p>
              <p>Kapasitas CO₂: <strong>{results.Kapasitas_DAC_ton_CO2_per_tahun.toLocaleString()} ton/tahun</strong></p>
            </div>
            
            <div className="result-category">
              <h3>Fasilitas CCUS</h3>
              <p>Luas Total: <strong>{results.L_ccus_total.toFixed(1)} ha</strong> (55%), asumsi internal:</p>
              <ul>
                <li>Total Bangunan CCUS: {results.L_total_bangunan_ccus.toFixed(1)} ha</li>
                <li>Gedung Utama: {results.L_gedung_utama_ccus.toFixed(1)} ha</li>
                <li>Per Gedung Sub: {results.L_setiap_gedung_sub_ccus.toFixed(1)} ha</li>
                <li>Panel Surya: {results.L_panel_surya_di_ccus.toFixed(1)} ha</li>
                <li>Area Outdoor CCUS: {results.L_ccus_outdoor.toFixed(1)} ha</li>
              </ul>
            </div>

            <div className="result-category">
              <h3>Infrastruktur Umum</h3>
              <p>Luas: <strong>{results.L_infrastruktur.toFixed(1)} ha</strong> (5%)</p>
            </div>

            <div className="location-considerations-section">
              <h2>Pertimbangan Lokasi Penting:</h2>
              
              <div className="result-category">
                <h4>Pabrik & Oxyfuel:</h4>
                <ul>{results.location_considerations.pabrik_oxyfuel.map((item, index) => <li key={`pabrik-${index}`}>{item}</li>)}</ul>
              </div>
              <div className="result-category">
                <h4>Direct Air Capture (DAC):</h4>
                <ul>{results.location_considerations.dac.map((item, index) => <li key={`dac-${index}`}>{item}</li>)}</ul>
              </div>
              <div className="result-category">
                <h4>Fasilitas CCUS:</h4>
                <ul>{results.location_considerations.ccus.map((item, index) => <li key={`ccus-${index}`}>{item}</li>)}</ul>
              </div>
              <div className="result-category">
                <h4>Panel Surya:</h4>
                <ul>{results.location_considerations.panel_surya.map((item, index) => <li key={`solar-${index}`}>{item}</li>)}</ul>
              </div>
            </div>
          </div>
        )}
      </main>

      <footer className="footer-main">
        <p>Model kalkulator ini hanya untuk ilustrasi.</p>
        <div className="social-links">
          <a href="https://x.com/Vhaeyrin" target="_blank" rel="noopener noreferrer" title="Vhaeyrin on X"><XLogo /></a>
          <a href="https://github.com/dkfadhila" target="_blank" rel="noopener noreferrer" title="dkfadhila on GitHub"><GitHubLogo /></a>
        </div>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-color: #FEFBF6; /* Pastel: Soft Cream */
          color: #5C5470; /* Pastel: Muted Purple/Grey for text */
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; /* Clean sans-serif */
        }
        .header-main {
          width: 100%;
          padding: 1.5rem 1rem; /* Reduced padding */
          text-align: center;
          background-color: #B9E0FF; /* Pastel: Soft Sky Blue */
          color: #352F44; /* Darker Muted Purple for header text */
          border-bottom: 3px solid #A2D2FF; /* Slightly darker blue accent */
        }
        .header-main h1 {
          margin: 0;
          font-weight: 600; /* Slightly less bold */
          font-size: 1.8rem; /* Adjusted size */
        }
        .subtitle {
          font-size: 0.85rem;
          color: #5C5470; /* Muted text color */
          margin-top: 0.3rem;
        }
        .main-content {
          padding: 1.5rem 1rem; /* Reduced padding */
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          max-width: 700px; /* Slightly narrower for minimalist feel */
        }
        .input-section {
          background-color: #FFFFFF;
          padding: 1.2rem; /* Reduced padding */
          border-radius: 12px; /* Softer corners */
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05); /* Softer shadow */
          margin-bottom: 1.5rem;
          width: 100%;
          display: flex;
          flex-wrap: wrap;
          gap: 0.8rem;
          align-items: center;
          border: 1px solid #EAE0DA; /* Soft border */
        }
        .input-section label {
          font-weight: 500; /* Lighter font weight */
          font-size: 0.9rem;
          flex-basis: 100%;
        }
        .input-field {
          padding: 0.6rem 0.8rem; /* Adjusted padding */
          border: 1px solid #DCD0C0; /* Softer border */
          border-radius: 8px; /* Softer corners */
          font-size: 0.95rem;
          flex-grow: 1;
          min-width: 120px;
          background-color: #FFFBF6; /* Very light cream */
        }
        .calculate-button {
          padding: 0.6rem 1.2rem; /* Adjusted padding */
          background-color: #A2D2FF; /* Pastel: Soft Blue */
          color: #352F44; /* Darker text for contrast */
          border: none;
          border-radius: 8px;
          font-size: 0.95rem;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s ease;
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }
        .calculate-button:hover {
          background-color: #B9E0FF; /* Lighter blue on hover */
        }
        .results-section {
          background-color: #FFFFFF;
          padding: 1.2rem;
          border-radius: 12px;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
          width: 100%;
          margin-bottom: 1.5rem;
          border: 1px solid #EAE0DA;
        }
        .results-section h2 {
          margin-top: 0;
          margin-bottom: 1rem; /* More space after H2 */
          color: #352F44;
          border-bottom: 1px solid #A2D2FF; /* Soft blue accent */
          padding-bottom: 0.5rem;
          font-size: 1.3rem; /* Adjusted size */
          font-weight: 600;
        }
        .result-category {
          margin-bottom: 1rem; /* Adjusted spacing */
        }
        .result-category h3 {
          color: #5C5470;
          margin-top: 0.8rem;
          margin-bottom: 0.4rem;
          font-size: 1.1rem; /* Adjusted size */
          font-weight: 600;
        }
        .location-considerations-section .result-category h4 {
          color: #5C5470;
          margin-top: 0.8rem;
          margin-bottom: 0.3rem;
          font-size: 1rem; /* Adjusted size */
          font-weight: 600;
        }
        .result-category p, .result-category ul {
          margin: 0.2rem 0;
          line-height: 1.5; /* Adjusted line height */
          font-size: 0.9rem; /* Slightly smaller text */
        }
        .result-category ul {
          padding-left: 18px; /* Slightly less padding */
          list-style-type: circle; /* Softer list style */
        }
        .result-category ul li {
          margin-bottom: 0.25rem;
        }
        .result-category strong {
          color: #A2D2FF; /* Pastel: Soft Blue for emphasis */
          font-weight: 600;
        }
        .location-considerations-section {
            margin-top: 1.5rem;
            padding-top: 1rem;
            border-top: 1px solid #EAE0DA; /* Soft border */
        }
        .location-considerations-section h2 {
            font-size: 1.3rem;
            color: #352F44;
        }
        .footer-main {
          width: 100%;
          padding: 1rem; /* Reduced padding */
          text-align: center;
          border-top: 1px solid #EAE0DA; /* Soft border */
          background-color: #B9E0FF; /* Pastel: Soft Sky Blue */
          color: #352F44; /* Darker text */
          margin-top: auto;
        }
        .footer-main p {
            margin-bottom: 0.5rem;
            font-size: 0.8rem; /* Smaller footer text */
        }
        .social-links {
          display: flex;
          justify-content: center;
          gap: 1.2rem; /* Slightly more gap */
        }
        .social-links a {
          color: #352F44; /* Darker text for logos */
          transition: color 0.2s ease;
          display: inline-block; /* Helps with SVG alignment */
        }
        .social-links a:hover {
          color: #FEFBF6; /* Light cream on hover */
        }

        @media (min-width: 600px) {
            .input-section label {
                flex-basis: auto;
                margin-bottom: 0;
            }
            .header-main h1 { font-size: 2rem; }
            .subtitle { font-size: 0.9rem; }
        }
      `}</style>
    </div>
  );
}
