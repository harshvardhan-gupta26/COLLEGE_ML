import React, { useRef, useEffect, useState } from 'react';
import { Activity, BarChart2, Radio } from 'lucide-react';

export default function SpectrumVisualizer({ formData, predictionResult }) {
  const canvasRef = useRef(null);
  const [viewMode, setViewMode] = useState('spectrum'); // 'spectrum' | 'importance'

  // Relative feature importance for Random Forest (standard telecom RF dataset profile)
  const featureImportances = [
    { name: 'Signal Strength (dBm)', weight: 34, color: '#2563eb' },
    { name: 'Precipitation (mm/h)', weight: 22, color: '#3b82f6' },
    { name: 'Bandwidth (Hz)', weight: 12, color: '#60a5fa' },
    { name: 'WiFi / Noise Floor', weight: 9, color: '#93c5fd' },
    { name: 'Frequency (Hz)', weight: 7, color: '#38bdf8' },
    { name: 'Weather Condition', weight: 6, color: '#0ea5e9' },
    { name: 'Interference Type', weight: 5, color: '#f59e0b' },
    { name: 'Atmospheric Pressure', weight: 3, color: '#64748b' },
    { name: 'Relative Humidity', weight: 2, color: '#94a3b8' }
  ];

  useEffect(() => {
    if (viewMode !== 'spectrum') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;

    // Background clean light slate
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(0, 0, width, height);

    // Grid lines
    ctx.strokeStyle = '#e2e8f0';
    ctx.lineWidth = 1;

    for (let x = 0; x <= width; x += width / 8) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y <= height; y += height / 4) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const signalDbm = formData.signal_strength;
    const wifiDbm = formData.wifi_strength;
    const interf = formData.interference_type;

    const dbmToY = (dbm) => {
      const clamped = Math.max(-120, Math.min(-10, dbm));
      const norm = (clamped - (-120)) / 110;
      return height - 20 - norm * (height - 40);
    };

    const noiseY = dbmToY(wifiDbm - 30);
    const peakY = dbmToY(signalDbm);
    const centerFreqX = width * 0.5;

    // Spectrum curve fill
    const grad = ctx.createLinearGradient(0, peakY, 0, height);
    grad.addColorStop(0, 'rgba(37, 99, 235, 0.25)');
    grad.addColorStop(1, 'rgba(37, 99, 235, 0.02)');

    ctx.beginPath();
    ctx.moveTo(0, height);

    for (let x = 0; x <= width; x += 2) {
      const distFromCenter = Math.abs(x - centerFreqX);
      const carrierWidth = Math.max(20, (formData.bandwidth / 2000000) * 70);
      const carrierAtten = Math.exp(-Math.pow(distFromCenter / carrierWidth, 2));

      let y = noiseY + (Math.sin(x * 0.2) * 1.5);
      y -= (noiseY - peakY) * carrierAtten;

      if (interf === 'Adjacent-channel') {
        const adjDist = Math.abs(x - (centerFreqX + carrierWidth * 2.2));
        y -= (noiseY - dbmToY(signalDbm - 12)) * Math.exp(-Math.pow(adjDist / (carrierWidth * 0.7), 2));
      } else if (interf === 'Co-channel') {
        const coDist = Math.abs(x - (centerFreqX + carrierWidth * 0.5));
        y -= (noiseY - dbmToY(signalDbm - 8)) * Math.exp(-Math.pow(coDist / (carrierWidth * 0.9), 2));
      } else if (interf === 'Intermodulation') {
        const h1 = Math.abs(x - (centerFreqX - carrierWidth * 1.8));
        const h2 = Math.abs(x - (centerFreqX + carrierWidth * 1.8));
        y -= (noiseY - dbmToY(signalDbm - 16)) * Math.exp(-Math.pow(h1 / 15, 2));
        y -= (noiseY - dbmToY(signalDbm - 16)) * Math.exp(-Math.pow(h2 / 15, 2));
      }

      ctx.lineTo(x, Math.max(10, Math.min(height - 5, y)));
    }

    ctx.lineTo(width, height);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();

    // Line stroke
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Marker at center peak
    ctx.fillStyle = '#1d4ed8';
    ctx.beginPath();
    ctx.arc(centerFreqX, peakY, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#0f172a';
    ctx.font = '10px "JetBrains Mono", monospace';
    ctx.fillText(`Fc: ${(formData.frequency / 1e6).toFixed(1)} MHz (${signalDbm} dBm)`, centerFreqX - 60, Math.max(18, peakY - 8));

  }, [formData, viewMode]);

  return (
    <div className="card chart-card">
      <div className="card-header-clean">
        <div>
          <h3 className="card-subheading">
            <Radio className="w-4 h-4 text-blue-600 mr-1.5 inline" />
            RF Spectrum &amp; Model Feature Importance
          </h3>
          <p className="card-subtitle">
            Observe the RF carrier frequency response and machine learning decision factors.
          </p>
        </div>
        <div className="view-toggle-clean">
          <button
            type="button"
            className={`btn-tab-toggle ${viewMode === 'spectrum' ? 'active' : ''}`}
            onClick={() => setViewMode('spectrum')}
          >
            RF Spectrum
          </button>
          <button
            type="button"
            className={`btn-tab-toggle ${viewMode === 'importance' ? 'active' : ''}`}
            onClick={() => setViewMode('importance')}
          >
            Feature Weights
          </button>
        </div>
      </div>

      {viewMode === 'spectrum' ? (
        <div className="spectrum-canvas-box">
          <canvas
            ref={canvasRef}
            width={600}
            height={160}
            className="clean-canvas"
          />
          <div className="canvas-footer-bar font-mono">
            <span>Center: {(formData.frequency / 1e6).toFixed(2)} MHz</span>
            <span>Bandwidth: {(formData.bandwidth / 1e3).toFixed(0)} kHz</span>
            <span>Interference: {formData.interference_type}</span>
          </div>
        </div>
      ) : (
        <div className="feature-importance-list">
          {featureImportances.map((item) => (
            <div key={item.name} className="importance-row">
              <div className="importance-meta">
                <span className="importance-name">{item.name}</span>
                <span className="importance-pct font-mono">{item.weight}%</span>
              </div>
              <div className="importance-track">
                <div 
                  className="importance-fill" 
                  style={{ width: `${item.weight * 2.5}%`, backgroundColor: item.color }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
