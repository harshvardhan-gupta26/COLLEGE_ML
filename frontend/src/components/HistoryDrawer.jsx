import React from 'react';
import { History, Trash2, ArrowUpRight } from 'lucide-react';

export default function HistoryDrawer({ history, onRestore, onClear }) {
  if (!history || history.length === 0) return null;

  return (
    <div className="card history-card-clean">
      <div className="card-header-clean">
        <div>
          <h3 className="card-subheading">
            <History className="w-4 h-4 text-blue-600 mr-1.5 inline" />
            Evaluation History Log ({history.length})
          </h3>
          <p className="card-subtitle">
            Previous inferences during this session. Click any row to reload inputs.
          </p>
        </div>
        <button 
          type="button" 
          onClick={onClear}
          className="btn-text-action text-red-600"
          title="Clear session history"
        >
          <Trash2 className="w-3.5 h-3.5 mr-1 inline" />
          Clear
        </button>
      </div>

      <div className="history-table-wrapper">
        <table className="history-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Frequency</th>
              <th>Signal</th>
              <th>Weather</th>
              <th>Predicted Result</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {history.map((entry, idx) => {
              const isGood = entry.prediction === 'Good';
              const isWeak = entry.prediction === 'Weak';
              const badgeClass = isGood ? 'pill-good' : isWeak ? 'pill-weak' : 'pill-danger';

              return (
                <tr key={idx} onClick={() => onRestore(entry)} className="history-row">
                  <td className="font-mono text-slate-500">{entry.timestamp}</td>
                  <td className="font-mono">{(entry.inputs.frequency / 1e6).toFixed(1)} MHz</td>
                  <td className="font-mono">{entry.inputs.signal_strength} dBm</td>
                  <td>{entry.inputs.weather_condition}</td>
                  <td>
                    <span className={`status-pill ${badgeClass}`}>
                      {entry.prediction}
                    </span>
                  </td>
                  <td>
                    <button 
                      type="button" 
                      className="btn-load-row"
                      title="Load into form"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
