import React, { useState } from 'react';

export default function GraphsTab({ formData, result }) {
  const currentSignal = formData.signal_strength;

  // Pass simulation data points
  const passData = [
    { time: '-5 min', elev: 10, signal: Math.round(currentSignal - 18) },
    { time: '-4 min', elev: 22, signal: Math.round(currentSignal - 12) },
    { time: '-3 min', elev: 38, signal: Math.round(currentSignal - 6) },
    { time: '-2 min', elev: 56, signal: Math.round(currentSignal - 2) },
    { time: '-1 min', elev: 72, signal: Math.round(currentSignal + 0) },
    { time: 'Overhead', elev: 85, signal: Math.round(currentSignal + 3) },
    { time: '+1 min', elev: 70, signal: Math.round(currentSignal + 1) },
    { time: '+2 min', elev: 54, signal: Math.round(currentSignal - 2) },
    { time: '+3 min', elev: 36, signal: Math.round(currentSignal - 7) },
    { time: '+4 min', elev: 20, signal: Math.round(currentSignal - 13) },
    { time: '+5 min', elev: 10, signal: Math.round(currentSignal - 19) }
  ];

  // Feature importance data
  const featureWeights = [
    { name: 'Signal Strength (dBm)', pct: 36, color: '#2563eb' },
    { name: 'Precipitation (mm/h)', pct: 24, color: '#3b82f6' },
    { name: 'Bandwidth (Hz)', pct: 13, color: '#60a5fa' },
    { name: 'WiFi / Noise Floor', pct: 9, color: '#93c5fd' },
    { name: 'Frequency (Hz)', pct: 7, color: '#38bdf8' },
    { name: 'Weather Condition', pct: 5, color: '#0ea5e9' },
    { name: 'Interference Type', pct: 4, color: '#f59e0b' },
    { name: 'Air Pressure', pct: 2, color: '#64748b' }
  ];

  // SVG dimensions for the Pass Chart
  const width = 640;
  const height = 220;
  const pad = { top: 25, right: 30, bottom: 40, left: 55 };
  const plotW = width - pad.left - pad.right;
  const plotH = height - pad.top - pad.bottom;

  const minSig = -120;
  const maxSig = -20;

  const getX = (i) => pad.left + (i / (passData.length - 1)) * plotW;
  const getY = (val) => pad.top + (1 - (val - minSig) / (maxSig - minSig)) * plotH;

  const points = passData.map((d, i) => `${getX(i)},${getY(d.signal)}`).join(' ');

  return (
    <div className="tab-page">
      <div className="tab-header-box">
        <h2 className="box-title">Visualizations &amp; Analysis Graphs</h2>
        <p className="box-subtitle">
          Graphical analysis of model probabilities, satellite pass trajectory, and feature importances.
        </p>
      </div>

      <div className="graphs-grid">
        {/* Graph 1: Satellite Pass Signal vs Time */}
        <div className="graph-card">
          <div className="graph-header">
            <h3>Graph 1: Expected Signal Strength during Satellite Pass</h3>
            <span className="graph-badge">Simulation</span>
          </div>
          <p className="graph-desc">
            Shows how signal strength changes as the satellite rises from the horizon to maximum elevation (Overhead) and descends.
          </p>

          <div className="svg-container">
            <svg viewBox={`0 0 ${width} ${height}`} className="responsive-svg">
              {/* Grid Lines */}
              {[-30, -60, -90, -120].map((dbm) => (
                <g key={dbm}>
                  <line
                    x1={pad.left}
                    y1={getY(dbm)}
                    x2={width - pad.right}
                    y2={getY(dbm)}
                    stroke="#e2e8f0"
                    strokeDasharray="4 4"
                  />
                  <text
                    x={pad.left - 8}
                    y={getY(dbm) + 4}
                    fill="#64748b"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    {dbm} dBm
                  </text>
                </g>
              ))}

              {/* Line */}
              <polyline
                fill="none"
                stroke="#2563eb"
                strokeWidth="2.5"
                points={points}
              />

              {/* Data points */}
              {passData.map((d, i) => (
                <g key={i}>
                  <circle
                    cx={getX(i)}
                    cy={getY(d.signal)}
                    r="4"
                    fill="#2563eb"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <text
                    x={getX(i)}
                    y={height - 15}
                    fill="#64748b"
                    fontSize="9"
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {d.time}
                  </text>
                </g>
              ))}
            </svg>
          </div>
          <div className="graph-footer-note">
            Current input signal at zenith: <strong>{currentSignal} dBm</strong>
          </div>
        </div>

        {/* Graph 2: Feature Importance */}
        <div className="graph-card">
          <div className="graph-header">
            <h3>Graph 2: Random Forest Feature Importance</h3>
            <span className="graph-badge">ML Model</span>
          </div>
          <p className="graph-desc">
            Relative weight of each parameter when the trained model makes its link quality decision.
          </p>

          <div className="bar-chart-container">
            {featureWeights.map((f) => (
              <div key={f.name} className="feature-bar-row">
                <div className="feature-bar-labels">
                  <span className="feature-name">{f.name}</span>
                  <span className="feature-pct">{f.pct}%</span>
                </div>
                <div className="feature-bar-track">
                  <div
                    className="feature-bar-fill"
                    style={{ width: `${f.pct * 2.5}%`, backgroundColor: f.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="graph-footer-note">
            Signal strength and rainfall precipitation account for over 60% of the model decision.
          </div>
        </div>

        {/* Graph 3: Model Output Probabilities */}
        {result && (
          <div className="graph-card full-width">
            <div className="graph-header">
              <h3>Graph 3: Current Prediction Probability Comparison</h3>
              <span className="graph-badge">Current Test</span>
            </div>
            <p className="graph-desc">
              Comparison of model confidence across the three link quality categories for the current telemetry input.
            </p>

            <div className="prob-columns-grid">
              {Object.entries(result.probabilities).map(([label, val]) => (
                <div key={label} className="prob-column-box">
                  <div className="prob-col-label">{label}</div>
                  <div className="prob-col-val">{val}%</div>
                  <div className="prob-col-meter">
                    <div
                      className={`prob-col-meter-fill ${label === 'Good' ? 'fill-good' : label === 'Weak' ? 'fill-weak' : 'fill-danger'}`}
                      style={{ height: `${val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
