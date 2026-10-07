import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function PassTimelineChart({ currentSignal, prediction }) {
  const [hoverPoint, setHoverPoint] = useState(null);

  const dataPoints = [
    { t: '-05m', el: 12, rangeKm: 1650, pathLossDbm: -18 },
    { t: '-04m', el: 22, rangeKm: 1250, pathLossDbm: -12 },
    { t: '-03m', el: 38, rangeKm: 920, pathLossDbm: -6 },
    { t: '-02m', el: 56, rangeKm: 680, pathLossDbm: -2 },
    { t: '-01m', el: 72, rangeKm: 580, pathLossDbm: 0 },
    { t: 'Zenith', el: 81, rangeKm: 550, pathLossDbm: +2 },
    { t: '+01m', el: 74, rangeKm: 575, pathLossDbm: +1 },
    { t: '+02m', el: 58, rangeKm: 670, pathLossDbm: -2 },
    { t: '+03m', el: 40, rangeKm: 910, pathLossDbm: -5 },
    { t: '+04m', el: 25, rangeKm: 1230, pathLossDbm: -11 },
    { t: '+05m', el: 14, rangeKm: 1620, pathLossDbm: -17 },
  ];

  const calculatedPoints = dataPoints.map((dp) => {
    const rssi = Math.round(currentSignal + dp.pathLossDbm);
    return {
      ...dp,
      rssi
    };
  });

  const svgWidth = 600;
  const svgHeight = 170;
  const padding = { top: 20, right: 35, bottom: 30, left: 45 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  const minRssi = -120;
  const maxRssi = -30;

  const getX = (i) => padding.left + (i / (calculatedPoints.length - 1)) * graphWidth;
  const getY = (val) => padding.top + (1 - (val - minRssi) / (maxRssi - minRssi)) * graphHeight;

  const pointsString = calculatedPoints.map((p, i) => `${getX(i)},${getY(p.rssi)}`).join(' ');
  const areaPath = `M ${getX(0)},${padding.top + graphHeight} ` +
    calculatedPoints.map((p, i) => `L ${getX(i)},${getY(p.rssi)}`).join(' ') +
    ` L ${getX(calculatedPoints.length - 1)},${padding.top + graphHeight} Z`;

  const elevPath = calculatedPoints.map((p, i) => {
    const elevY = padding.top + (1 - p.el / 90) * graphHeight;
    return `${i === 0 ? 'M' : 'L'} ${getX(i)},${elevY}`;
  }).join(' ');

  return (
    <div className="card chart-card">
      <div className="card-header-clean">
        <div>
          <h3 className="card-subheading">
            <TrendingUp className="w-4 h-4 text-blue-600 mr-1.5 inline" />
            Simulated Orbital Pass &amp; Link Margin Curve
          </h3>
          <p className="card-subtitle">
            Path loss variation during satellite transit from horizon to zenith.
          </p>
        </div>
        <div className="chart-legend-clean">
          <span className="legend-entry">
            <span className="legend-indicator bg-blue-600"></span> Signal RSSI (dBm)
          </span>
          <span className="legend-entry">
            <span className="legend-indicator bg-amber-500"></span> Elevation (°)
          </span>
        </div>
      </div>

      <div className="chart-container">
        <svg 
          viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
          className="clean-svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="lightSignalGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[-40, -65, -90, -115].map((dbm) => (
            <g key={dbm}>
              <line
                x1={padding.left}
                y1={getY(dbm)}
                x2={svgWidth - padding.right}
                y2={getY(dbm)}
                stroke="#e2e8f0"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              <text
                x={padding.left - 8}
                y={getY(dbm) + 3}
                fill="#64748b"
                fontSize="9"
                fontFamily="JetBrains Mono"
                textAnchor="end"
              >
                {dbm}
              </text>
            </g>
          ))}

          {/* Shaded Area */}
          <path d={areaPath} fill="url(#lightSignalGrad)" />

          {/* Elevation Angle Line */}
          <path
            d={elevPath}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Signal Polyline */}
          <polyline
            fill="none"
            stroke="#2563eb"
            strokeWidth="2.2"
            points={pointsString}
          />

          {/* Points */}
          {calculatedPoints.map((p, i) => (
            <g key={i}>
              <circle
                cx={getX(i)}
                cy={getY(p.rssi)}
                r={hoverPoint === i ? 5 : 3.5}
                fill={p.rssi >= -65 ? '#10b981' : p.rssi >= -85 ? '#f59e0b' : '#ef4444'}
                stroke="#ffffff"
                strokeWidth="1.5"
                onMouseEnter={() => setHoverPoint(i)}
                onMouseLeave={() => setHoverPoint(null)}
                style={{ cursor: 'pointer' }}
              />
              <text
                x={getX(i)}
                y={svgHeight - 10}
                fill="#64748b"
                fontSize="9"
                fontFamily="JetBrains Mono"
                textAnchor="middle"
              >
                {p.t}
              </text>
            </g>
          ))}
        </svg>

        {hoverPoint !== null && (
          <div 
            className="chart-tooltip-light font-mono"
            style={{ left: `${(hoverPoint / (calculatedPoints.length - 1)) * 80 + 10}%` }}
          >
            <div><strong>Transit Time:</strong> {calculatedPoints[hoverPoint].t}</div>
            <div><strong>Antenna Elevation:</strong> {calculatedPoints[hoverPoint].el}°</div>
            <div><strong>Received Signal:</strong> {calculatedPoints[hoverPoint].rssi} dBm</div>
            <div><strong>Slant Distance:</strong> {calculatedPoints[hoverPoint].rangeKm} km</div>
          </div>
        )}
      </div>
    </div>
  );
}
