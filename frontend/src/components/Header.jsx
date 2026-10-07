import React from 'react';
import { Radio, Satellite, CheckCircle2, Sliders, RefreshCw, FileText } from 'lucide-react';

export default function Header({ presets, onSelectPreset, onReset }) {
  return (
    <header className="app-header">
      <div className="header-top-bar">
        <div className="container header-top-content">
          <div className="academic-badge">
            <span className="dot-badge"></span>
            <span>CAPSTONE PROJECT &middot; TELECOMMUNICATION &amp; MACHINE LEARNING</span>
          </div>
          <div className="system-status">
            <span className="status-label">Model Status:</span>
            <span className="status-pill status-ready">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600 inline" />
              Random Forest Loaded (17 Features)
            </span>
            <span className="status-divider">|</span>
            <span className="status-label">Backend:</span>
            <span className="status-pill font-mono">FastAPI :8000</span>
          </div>
        </div>
      </div>

      <div className="container header-main-content">
        <div className="brand-block">
          <div className="brand-logo">
            <Satellite className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="project-title">SatLink AI</h1>
            <p className="project-subtitle">
              Satellite Communication Quality Prediction &amp; RF Link Degradation Analysis System
            </p>
          </div>
        </div>

        <div className="header-presets-block">
          <span className="presets-label">
            <Sliders className="w-3.5 h-3.5 mr-1 inline text-slate-500" />
            Preset Test Cases:
          </span>
          <div className="preset-buttons">
            {presets.map((preset, index) => (
              <button
                key={index}
                type="button"
                className="btn-preset"
                onClick={() => onSelectPreset(preset)}
                title={preset.description}
              >
                <span className="preset-badge">TC-{index + 1}</span>
                <span>{preset.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
