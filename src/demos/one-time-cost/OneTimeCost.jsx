import React, { useState } from 'react';
import './OneTimeCost.css';

// ── Helpers ─────────────────────────────────────────────────────────
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const START_YEAR = 2026;
const START_MONTH_IDX = 1; // February (0-indexed)

function getMonthLabel(monthNum) {
  const offset = START_MONTH_IDX + (monthNum - 1);
  const year = START_YEAR + Math.floor(offset / 12);
  const mon = MONTH_NAMES[offset % 12];
  return `Month ${monthNum} (${mon} ${year})`;
}

function fmt(n) {
  return '$' + Math.round(n).toLocaleString();
}

// ── Curve icons ──────────────────────────────────────────────────────
function CurveIcon({ type }) {
  const base = { width: 42, height: 28, viewBox: '0 0 42 28', fill: 'none' };
  switch (type) {
    case 'linear':
      return <svg {...base}><path d="M4 24 L38 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>;
    case 'wide':
      return <svg {...base}><path d="M4 24 Q21 2 38 24" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>;
    case 'medium':
      return <svg {...base}><path d="M8 24 Q21 3 34 24" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>;
    case 'narrow':
      return <svg {...base}><path d="M13 24 Q21 3 29 24" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>;
    case 'l_skew':
      return <svg {...base}><path d="M4 24 Q13 3 38 24" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>;
    case 'r_skew':
      return <svg {...base}><path d="M4 24 Q29 3 38 24" stroke="currentColor" strokeWidth="1.8" fill="none" strokeLinecap="round"/></svg>;
    case 'one_time':
      return (
        <svg {...base}>
          <line x1="21" y1="24" x2="21" y2="6" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
          <circle cx="21" cy="5" r="3" fill="currentColor"/>
        </svg>
      );
    default:
      return null;
  }
}

// ── Preview bar chart ────────────────────────────────────────────────
function CurvePreview({ curveType, sliderVal, oneTimeMonth, lineStart, lineEnd }) {
  const numBars = Math.max(lineEnd - lineStart + 1, 2);
  const W = 188, H = 80;
  const pad = 6;
  const barW = Math.max(1, (W - pad * 2) / numBars - 1);

  let bars;
  if (curveType === 'one_time') {
    bars = Array(numBars).fill(0);
    const idx = Math.min(Math.max(oneTimeMonth - lineStart, 0), numBars - 1);
    bars[idx] = 1;
  } else {
    const offset = ((sliderVal - 50) / 50) * 0.4;
    bars = Array.from({ length: numBars }, (_, i) => {
      const x = (i / (numBars - 1)) * 2 - 1 - offset;
      switch (curveType) {
        case 'linear':  return 1;
        case 'wide':    return Math.exp(-x * x * 2);
        case 'medium':  return Math.exp(-x * x * 5);
        case 'narrow':  return Math.exp(-x * x * 12);
        case 'l_skew':  return Math.exp(-(x + 0.45) * (x + 0.45) * 5);
        case 'r_skew':  return Math.exp(-(x - 0.45) * (x - 0.45) * 5);
        default:        return 1;
      }
    });
  }

  const maxH = Math.max(...bars, 0.001);
  const norm = bars.map(b => b / maxH);

  return (
    <div className="otc-preview">
      <svg width={W} height={H}>
        {norm.map((h, i) => {
          const bh = h * (H - pad * 2);
          const x = pad + i * ((W - pad * 2) / numBars);
          const y = H - pad - bh;
          const isSpike = curveType === 'one_time' && h > 0.5;
          return (
            <rect
              key={i}
              x={x}
              y={isSpike ? y : H - pad - Math.max(bh, 1)}
              width={barW}
              height={isSpike ? bh : Math.max(bh, 1)}
              fill={isSpike ? '#0fb3ff' : '#0fb3ff'}
              opacity={curveType === 'one_time' ? (h > 0.5 ? 1 : 0.12) : 0.85}
              rx={1}
            />
          );
        })}
      </svg>
    </div>
  );
}

// ── Curve modal ──────────────────────────────────────────────────────
const CURVE_TILES = [
  { id: 'linear',   label: 'Linear'  },
  { id: 'wide',     label: 'Wide'    },
  { id: 'medium',   label: 'Medium'  },
  { id: 'narrow',   label: 'Narrow'  },
  { id: 'l_skew',   label: 'L Skew'  },
  { id: 'r_skew',   label: 'R Skew'  },
];

function CurveModal({ line, onClose, onApply }) {
  const [selectedCurve, setSelectedCurve] = useState(line.curve);
  const [sliderVal, setSliderVal] = useState(50);
  const [oneTimeMonth, setOneTimeMonth] = useState(line.oneTimeMonth || line.start);

  const isOneTime = selectedCurve === 'one_time';

  const monthOptions = [];
  for (let m = line.start; m <= line.end; m++) {
    monthOptions.push(m);
  }

  return (
    <div className="otc-overlay" onClick={onClose}>
      <div className="otc-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="otc-modal-header">
          <span className="otc-modal-title">Curve</span>
          <button className="otc-modal-x" onClick={onClose}>×</button>
        </div>

        {/* Body */}
        <div className="otc-modal-body">

          {/* Left — curve tiles */}
          <div className="otc-modal-left">
            <div className="otc-tile-grid">
              {CURVE_TILES.map(c => (
                <button
                  key={c.id}
                  className={`otc-tile ${selectedCurve === c.id ? 'otc-tile--active' : ''}`}
                  onClick={() => setSelectedCurve(c.id)}
                >
                  <CurveIcon type={c.id} />
                  <span className="otc-tile-label">{c.label}</span>
                </button>
              ))}
            </div>

            <div className="otc-tile-divider" />

            {/* One-Time — full width */}
            <button
              className={`otc-tile otc-tile--wide ${selectedCurve === 'one_time' ? 'otc-tile--active' : ''}`}
              onClick={() => setSelectedCurve('one_time')}
            >
              <CurveIcon type="one_time" />
              <span className="otc-tile-label">One-Time</span>
            </button>
          </div>

          {/* Vertical divider */}
          <div className="otc-panel-divider" />

          {/* Right — preview + control */}
          <div className="otc-modal-right">
            <CurvePreview
              curveType={selectedCurve}
              sliderVal={sliderVal}
              oneTimeMonth={oneTimeMonth}
              lineStart={line.start}
              lineEnd={line.end}
            />

            {isOneTime ? (
              <div className="otc-control">
                <label className="otc-control-label">Select month</label>
                <select
                  className="otc-month-select"
                  value={oneTimeMonth}
                  onChange={e => setOneTimeMonth(Number(e.target.value))}
                >
                  {monthOptions.map(m => (
                    <option key={m} value={m}>{getMonthLabel(m)}</option>
                  ))}
                </select>
              </div>
            ) : (
              <div className="otc-control">
                <label className="otc-control-label">Adjust curve</label>
                <div className="otc-slider-row">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={sliderVal}
                    onChange={e => setSliderVal(Number(e.target.value))}
                    className="otc-slider"
                  />
                  <button className="otc-reset-btn" title="Reset" onClick={() => setSliderVal(50)}>
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                      <path d="M13.65 2.35A8 8 0 1 0 15 8h-2a6 6 0 1 1-1.02-3.38L9 7h6V1l-1.35 1.35z" fill="currentColor"/>
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="otc-modal-footer">
          <button className="otc-btn-cancel" onClick={onClose}>Cancel</button>
          <button className="otc-btn-apply" onClick={() => onApply(line.id, selectedCurve, oneTimeMonth)}>Apply</button>
        </div>

      </div>
    </div>
  );
}

// ── Curve badge (table cell) ─────────────────────────────────────────
function CurveBadge({ curve, oneTimeMonth, onClick }) {
  const label = curve === 'one_time'
    ? `One-Time (Mo. ${oneTimeMonth})`
    : curve.charAt(0).toUpperCase() + curve.slice(1).replace('_', ' ');
  return (
    <button className={`otc-badge ${curve === 'one_time' ? 'otc-badge--onetime' : ''}`} onClick={onClick}>
      <span className="otc-badge-icon"><CurveIcon type={curve} /></span>
      <span className="otc-badge-label">{label}</span>
    </button>
  );
}

// ── Main demo ────────────────────────────────────────────────────────
const INITIAL_LINES = [
  { id: 1, name: 'Acquisition Costs',    start: 1,  end: 1,  curve: 'one_time', oneTimeMonth: 1,  amount: 500000  },
  { id: 2, name: 'Hard Costs',           start: 3,  end: 30, curve: 'wide',     oneTimeMonth: 3,  amount: 5148000 },
  { id: 3, name: 'Soft Costs',           start: 1,  end: 36, curve: 'l_skew',   oneTimeMonth: 1,  amount: 1638000 },
  { id: 4, name: 'Developer Fee',        start: 1,  end: 30, curve: 'linear',   oneTimeMonth: 1,  amount: 350000  },
  { id: 5, name: 'Permits & Impact Fees',start: 4,  end: 10, curve: 'one_time', oneTimeMonth: 6,  amount: 125000  },
  { id: 6, name: 'Financing Costs',      start: 1,  end: 30, curve: 'medium',   oneTimeMonth: 1,  amount: 297953  },
  { id: 7, name: 'Title & Escrow',       start: 1,  end: 3,  curve: 'one_time', oneTimeMonth: 1,  amount: 42000   },
];

export default function OneTimeCost() {
  const [lines, setLines] = useState(INITIAL_LINES);
  const [openLine, setOpenLine] = useState(null);

  function handleApply(lineId, newCurve, newMonth) {
    setLines(prev => prev.map(l =>
      l.id === lineId ? { ...l, curve: newCurve, oneTimeMonth: newMonth } : l
    ));
    setOpenLine(null);
  }

  return (
    <div className="otc-page">
      <div className="otc-container">

        {/* Page header */}
        <div className="otc-page-header">
          <div>
            <h2 className="otc-page-title">Development</h2>
            <p className="otc-page-sub">Uses — budget line items and spend distribution</p>
          </div>
          <button className="otc-btn-secondary">Automatically add detailed budget</button>
        </div>

        {/* Callout */}
        <div className="otc-callout">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="otc-callout-icon">
            <circle cx="8" cy="8" r="7" stroke="#0fb3ff" strokeWidth="1.5"/>
            <line x1="8" y1="7" x2="8" y2="11" stroke="#0fb3ff" strokeWidth="1.5" strokeLinecap="round"/>
            <circle cx="8" cy="5" r="0.8" fill="#0fb3ff"/>
          </svg>
          Click any <strong>Curve</strong> badge below to edit how spend is distributed across months.
          Use <strong>One-Time</strong> for costs that occur in a single month.
        </div>

        {/* Budget table */}
        <div className="otc-table-wrap">
          <table className="otc-table">
            <thead>
              <tr className="otc-thead-row">
                <th className="otc-th otc-th-name">Uses</th>
                <th className="otc-th otc-th-center">Start</th>
                <th className="otc-th otc-th-center">End</th>
                <th className="otc-th otc-th-center">Curve</th>
                <th className="otc-th otc-th-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {lines.map(line => (
                <tr key={line.id} className="otc-row">
                  <td className="otc-td otc-td-name">{line.name}</td>
                  <td className="otc-td otc-td-center">{getMonthLabel(line.start).split(' ')[0] + ' ' + getMonthLabel(line.start).split(' ')[1]}</td>
                  <td className="otc-td otc-td-center">{getMonthLabel(line.end).split(' ')[0] + ' ' + getMonthLabel(line.end).split(' ')[1]}</td>
                  <td className="otc-td otc-td-center">
                    <CurveBadge
                      curve={line.curve}
                      oneTimeMonth={line.oneTimeMonth}
                      onClick={() => setOpenLine(line)}
                    />
                  </td>
                  <td className="otc-td otc-td-right">{fmt(line.amount)}</td>
                </tr>
              ))}
              <tr className="otc-row-total">
                <td className="otc-td otc-td-name otc-td-bold" colSpan={4}>Total</td>
                <td className="otc-td otc-td-right otc-td-bold">
                  {fmt(lines.reduce((s, l) => s + l.amount, 0))}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      {/* Modal */}
      {openLine && (
        <CurveModal
          line={openLine}
          onClose={() => setOpenLine(null)}
          onApply={handleApply}
        />
      )}
    </div>
  );
}
