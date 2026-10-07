import React, { useState } from 'react';
import { 
  Radio, 
  CloudSun, 
  ShieldAlert, 
  RotateCcw, 
  Shuffle, 
  Play, 
  HelpCircle,
  SlidersHorizontal,
  Info
} from 'lucide-react';

export default function TelemetryForm({ 
  formData, 
  onChange, 
  onSubmit, 
  isLoading, 
  onJitter, 
  onReset 
}) {
  const [activeSection, setActiveSection] = useState('all'); // 'all' | 'rf' | 'weather' | 'interference'

  // Format frequency to human readable
  const freqMHz = (formData.frequency / 1e6).toFixed(2);
  const bwKHz = (formData.bandwidth / 1e3).toFixed(1);

  return (
    <div className="card form-card">
      <div className="card-header-clean">
        <div>
          <h2 className="card-title">Telemetry Input Parameters</h2>
          <p className="card-subtitle">
            Configure simulated or ground-station measured parameters to evaluate link quality.
          </p>
        </div>
        <div className="form-action-group">
          <button 
            type="button" 
            className="btn-text-action"
            onClick={onJitter}
            title="Slightly perturb telemetry values to simulate telemetry variance"
          >
            <Shuffle className="w-3.5 h-3.5 mr-1 text-slate-500 inline" />
            Jitter (±5%)
          </button>
          <button 
            type="button" 
            className="btn-text-action"
            onClick={onReset}
            title="Reset telemetry to baseline values"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1 text-slate-500 inline" />
            Reset
          </button>
        </div>
      </div>

      <form onSubmit={onSubmit}>
        {/* Section 1: Radio Frequency */}
        <div className="form-section">
          <div className="section-heading">
            <Radio className="w-4 h-4 text-blue-600 mr-2" />
            <span>1. Radio Frequency (RF) &amp; Link Parameters</span>
          </div>

          <div className="form-grid">
            {/* Frequency */}
            <div className="form-field">
              <label htmlFor="frequency" className="field-label">
                <span>Carrier Frequency (Hz)</span>
                <span className="field-badge">{freqMHz} MHz</span>
              </label>
              <input
                id="frequency"
                type="number"
                min="1000000"
                max="1000000000"
                step="100000"
                value={formData.frequency}
                onChange={(e) => onChange('frequency', Number(e.target.value))}
                className="input-text font-mono"
                required
              />
              <span className="field-help">VHF/UHF range: e.g. 120,000,000 Hz (120 MHz)</span>
            </div>

            {/* Signal Strength */}
            <div className="form-field">
              <label htmlFor="signal_strength" className="field-label">
                <span>Signal Strength (dBm)</span>
                <span className={`field-badge ${formData.signal_strength >= -60 ? 'badge-green' : formData.signal_strength >= -85 ? 'badge-amber' : 'badge-red'}`}>
                  {formData.signal_strength} dBm
                </span>
              </label>
              <div className="range-with-number">
                <input
                  id="signal_strength"
                  type="range"
                  min="-120"
                  max="-20"
                  step="1"
                  value={formData.signal_strength}
                  onChange={(e) => onChange('signal_strength', Number(e.target.value))}
                  className="input-range"
                />
                <input
                  type="number"
                  min="-120"
                  max="-20"
                  value={formData.signal_strength}
                  onChange={(e) => onChange('signal_strength', Number(e.target.value))}
                  className="input-number-small font-mono"
                />
              </div>
              <span className="field-help">Acceptable operating window: -30 dBm to -95 dBm</span>
            </div>

            {/* Bandwidth */}
            <div className="form-field">
              <label htmlFor="bandwidth" className="field-label">
                <span>Bandwidth (Hz)</span>
                <span className="field-badge">{bwKHz} kHz</span>
              </label>
              <input
                id="bandwidth"
                type="number"
                min="10000"
                max="50000000"
                step="50000"
                value={formData.bandwidth}
                onChange={(e) => onChange('bandwidth', Number(e.target.value))}
                className="input-text font-mono"
                required
              />
              <span className="field-help">Channel allocation (e.g. 500,000 Hz = 500 kHz)</span>
            </div>
          </div>
        </div>

        {/* Section 2: Atmospheric & Environmental */}
        <div className="form-section">
          <div className="section-heading">
            <CloudSun className="w-4 h-4 text-blue-600 mr-2" />
            <span>2. Atmospheric &amp; Environmental Conditions</span>
          </div>

          <div className="form-grid">
            {/* Weather Condition */}
            <div className="form-field">
              <label htmlFor="weather_condition" className="field-label">
                <span>Weather Condition</span>
              </label>
              <select
                id="weather_condition"
                value={formData.weather_condition}
                onChange={(e) => onChange('weather_condition', e.target.value)}
                className="input-select"
              >
                <option value="Sunny">Sunny (Clear Sky)</option>
                <option value="Cloudy">Cloudy (Moderate Moisture)</option>
                <option value="Rainy">Rainy (High Hydrometeor Attenuation)</option>
              </select>
              <span className="field-help">Categorical feature used in model one-hot encoding</span>
            </div>

            {/* Precipitation */}
            <div className="form-field">
              <label htmlFor="precipitation" className="field-label">
                <span>Precipitation (mm/h)</span>
                <span className="field-badge">{formData.precipitation} mm/h</span>
              </label>
              <input
                id="precipitation"
                type="number"
                min="0"
                max="100"
                step="0.5"
                value={formData.precipitation}
                onChange={(e) => onChange('precipitation', Number(e.target.value))}
                className="input-text font-mono"
                required
              />
              <span className="field-help">Rain rate (Rain fade primary factor)</span>
            </div>

            {/* Temperature */}
            <div className="form-field">
              <label htmlFor="temperature" className="field-label">
                <span>Temperature (°C)</span>
                <span className="field-badge">{formData.temperature} °C</span>
              </label>
              <input
                id="temperature"
                type="number"
                min="-40"
                max="60"
                step="1"
                value={formData.temperature}
                onChange={(e) => onChange('temperature', Number(e.target.value))}
                className="input-text font-mono"
                required
              />
              <span className="field-help">Ground station ambient temperature</span>
            </div>

            {/* Humidity */}
            <div className="form-field">
              <label htmlFor="humidity" className="field-label">
                <span>Relative Humidity (%)</span>
                <span className="field-badge">{formData.humidity} %</span>
              </label>
              <input
                id="humidity"
                type="number"
                min="0"
                max="100"
                step="1"
                value={formData.humidity}
                onChange={(e) => onChange('humidity', Number(e.target.value))}
                className="input-text font-mono"
                required
              />
              <span className="field-help">Atmospheric water vapor ratio</span>
            </div>

            {/* Wind Speed */}
            <div className="form-field">
              <label htmlFor="wind_speed" className="field-label">
                <span>Wind Speed (m/s)</span>
                <span className="field-badge">{formData.wind_speed} m/s</span>
              </label>
              <input
                id="wind_speed"
                type="number"
                min="0"
                max="60"
                step="0.5"
                value={formData.wind_speed}
                onChange={(e) => onChange('wind_speed', Number(e.target.value))}
                className="input-text font-mono"
                required
              />
              <span className="field-help">Antenna mechanical pointing impact</span>
            </div>

            {/* Air Pressure */}
            <div className="form-field">
              <label htmlFor="air_pressure" className="field-label">
                <span>Atmospheric Pressure (hPa)</span>
                <span className="field-badge">{formData.air_pressure} hPa</span>
              </label>
              <input
                id="air_pressure"
                type="number"
                min="800"
                max="1100"
                step="1"
                value={formData.air_pressure}
                onChange={(e) => onChange('air_pressure', Number(e.target.value))}
                className="input-text font-mono"
                required
              />
              <span className="field-help">Standard pressure at sea level is 1013 hPa</span>
            </div>
          </div>
        </div>

        {/* Section 3: Interference & Elevation */}
        <div className="form-section">
          <div className="section-heading">
            <ShieldAlert className="w-4 h-4 text-blue-600 mr-2" />
            <span>3. Interference &amp; Station Geometry</span>
          </div>

          <div className="form-grid">
            {/* Interference Type */}
            <div className="form-field">
              <label htmlFor="interference_type" className="field-label">
                <span>Interference Type</span>
              </label>
              <select
                id="interference_type"
                value={formData.interference_type}
                onChange={(e) => onChange('interference_type', e.target.value)}
                className="input-select"
              >
                <option value="None/Unknown">None / Unknown (Clean Channel)</option>
                <option value="Adjacent-channel">Adjacent-channel (Spectral Leakage)</option>
                <option value="Co-channel">Co-channel (In-band Collision)</option>
                <option value="Intermodulation">Intermodulation (Harmonic Product)</option>
              </select>
              <span className="field-help">RF environment interference classification</span>
            </div>

            {/* WiFi Noise Floor */}
            <div className="form-field">
              <label htmlFor="wifi_strength" className="field-label">
                <span>WiFi / Local Noise Floor (dBm)</span>
                <span className="field-badge">{formData.wifi_strength} dBm</span>
              </label>
              <input
                id="wifi_strength"
                type="number"
                min="-110"
                max="-10"
                step="1"
                value={formData.wifi_strength}
                onChange={(e) => onChange('wifi_strength', Number(e.target.value))}
                className="input-text font-mono"
                required
              />
              <span className="field-help">Ground terrestrial ambient noise</span>
            </div>

            {/* Altitude */}
            <div className="form-field">
              <label htmlFor="altitude" className="field-label">
                <span>Station Altitude (m)</span>
                <span className="field-badge">{formData.altitude} m</span>
              </label>
              <input
                id="altitude"
                type="number"
                min="0"
                max="8000"
                step="50"
                value={formData.altitude}
                onChange={(e) => onChange('altitude', Number(e.target.value))}
                className="input-text font-mono"
                required
              />
              <span className="field-help">Elevation above mean sea level</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-footer">
          <button 
            type="submit" 
            disabled={isLoading}
            className="btn-primary"
          >
            {isLoading ? (
              <span>Computing Random Forest Prediction...</span>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2 inline" />
                <span>Run Prediction Model</span>
              </>
            )}
          </button>
          <p className="form-footer-note">
            Sends 12 telemetry features to FastAPI backend; model evaluates 17 one-hot encoded decision paths.
          </p>
        </div>
      </form>
    </div>
  );
}
