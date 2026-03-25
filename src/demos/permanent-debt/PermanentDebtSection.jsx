import React, { useState } from 'react';
import './PermanentDebtSection.css';

function ChevronDown({ className = '' }) {
  return (
    <svg className={className} width="10" height="6" viewBox="0 0 10 6" fill="none">
      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PermanentDebtSection() {
  const [enabled, setEnabled] = useState(true);
  const [loanFunding, setLoanFunding] = useState('Apr 2030 (Month 50)');
  const [ioStep, setIoStep] = useState(0); // 0-5 = years, 6 = full term
  const [amortization, setAmortization] = useState(30);
  const [apr, setApr] = useState(7.0);
  const [feesPercent, setFeesPercent] = useState(4.0);
  const [calcMethod, setCalcMethod] = useState('Default');

  const loanTermMonths = 63;
  const IO_MAX = 6; // 0-5 are year values, 6 = full term

  const ioDisplayValue = () => {
    if (ioStep === IO_MAX) return `Full term (${loanTermMonths} mo)`;
    if (ioStep === 1) return '1 year';
    return `${ioStep} years`;
  };

  const months = [
    { num: 49, date: 'FEB 2030' },
    { num: 50, date: 'MAR 2030' },
    { num: 51, date: 'APR 2030' },
    { num: 52, date: 'MAY 2030' },
  ];

  const fmt = (v) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(v);

  const fmtDec = (v) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(v);

  return (
    <div className="pd-page">
      <div className="pd-container">
        <div className="pd-card">
          {/* Header */}
          <div className="pd-header">
            <span className="pd-step-num">4</span>
            <div className="pd-header-text">
              <h4 className="pd-title">Permanent Debt</h4>
              <p className="pd-subtitle">Include permanent debt in this Pro Forma</p>
            </div>
            <label className="pd-toggle">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
              />
              <span className="pd-toggle-track">
                <span className="pd-toggle-thumb" />
              </span>
            </label>
          </div>

          {enabled && (
            <>
              {/* Form + Summary panels */}
              <div className="pd-panels">
                {/* Left: Form inputs */}
                <div className="pd-form">
                  <div className="pd-field">
                    <label className="pd-field-label">Loan funding</label>
                    <div className="pd-dropdown-wrap pd-dropdown-wide">
                      <select
                        className="pd-dropdown"
                        value={loanFunding}
                        onChange={(e) => setLoanFunding(e.target.value)}
                      >
                        <option>Apr 2030 (Month 50)</option>
                        <option>May 2030 (Month 51)</option>
                        <option>Jun 2030 (Month 52)</option>
                      </select>
                      <ChevronDown className="pd-dropdown-icon" />
                    </div>
                  </div>

                  <div className="pd-field">
                    <label className="pd-field-label">Interest-only period</label>
                    <div className="pd-stepper pd-stepper-io">
                      <button
                        className="pd-stepper-btn"
                        disabled={ioStep <= 0}
                        onClick={() => setIoStep(ioStep - 1)}
                      >
                        &minus;
                      </button>
                      <span className="pd-stepper-val">{ioDisplayValue()}</span>
                      <button
                        className="pd-stepper-btn"
                        disabled={ioStep >= IO_MAX}
                        onClick={() => setIoStep(ioStep + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {ioStep < IO_MAX && (
                    <div className="pd-field">
                      <label className="pd-field-label">Amortization</label>
                      <div className="pd-stepper">
                        <button
                          className="pd-stepper-btn"
                          onClick={() => setAmortization(Math.max(1, amortization - 1))}
                        >
                          &minus;
                        </button>
                        <span className="pd-stepper-val">{amortization} years</span>
                        <button
                          className="pd-stepper-btn"
                          onClick={() => setAmortization(amortization + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="pd-field">
                    <label className="pd-field-label">APR</label>
                    <div className="pd-stepper">
                      <button
                        className="pd-stepper-btn"
                        onClick={() => setApr(Math.max(0, +(apr - 0.25).toFixed(2)))}
                      >
                        &minus;
                      </button>
                      <span className="pd-stepper-val">{apr.toFixed(2)}%</span>
                      <button
                        className="pd-stepper-btn"
                        onClick={() => setApr(+(apr + 0.25).toFixed(2))}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="pd-field">
                    <label className="pd-field-label">Fees &amp; closing costs</label>
                    <div className="pd-stepper">
                      <button
                        className="pd-stepper-btn"
                        onClick={() => setFeesPercent(Math.max(0, +(feesPercent - 0.25).toFixed(2)))}
                      >
                        &minus;
                      </button>
                      <span className="pd-stepper-val">{feesPercent.toFixed(2)}%</span>
                      <button
                        className="pd-stepper-btn"
                        onClick={() => setFeesPercent(+(feesPercent + 0.25).toFixed(2))}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="pd-divider" />

                  <div className="pd-field">
                    <label className="pd-field-label">Calculation method</label>
                    <div className="pd-dropdown-wrap pd-dropdown-wide">
                      <select
                        className="pd-dropdown"
                        value={calcMethod}
                        onChange={(e) => setCalcMethod(e.target.value)}
                      >
                        <option>Default</option>
                        <option>Custom</option>
                      </select>
                      <ChevronDown className="pd-dropdown-icon" />
                    </div>
                  </div>
                </div>

                {/* Right: Summary cards */}
                <div className="pd-summary">
                  <div className="pd-summary-row">
                    <div className="pd-summary-card">
                      <span className="pd-summary-label">Fees &amp; closing costs</span>
                      <span className="pd-summary-value">$697,439</span>
                    </div>
                    <div className="pd-summary-card">
                      <span className="pd-summary-label">Loan payoff</span>
                      <span className="pd-summary-value">Feb 2036 (Month 120)</span>
                    </div>
                  </div>
                  <div className="pd-summary-row">
                    <div className="pd-summary-card">
                      <span className="pd-summary-label">Debt service coverage ratio</span>
                      <span className="pd-summary-value">0.70x</span>
                    </div>
                    <div className="pd-summary-card">
                      <span className="pd-summary-label">Cash-on-cash return</span>
                      <span className="pd-summary-value">10.44% (Month 51)</span>
                    </div>
                  </div>
                  <div className="pd-summary-row">
                    <div className="pd-summary-card">
                      <span className="pd-summary-label">Net equity at refinance</span>
                      <span className="pd-summary-value">$0</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Debt service table */}
              <div className="pd-table-area">
                <div className="pd-table-scroll">
                  <div className="pd-table-frozen">
                    <table className="pd-table">
                      <thead>
                        <tr>
                          <th className="pd-th pd-th-label">&nbsp;</th>
                          <th className="pd-th pd-th-metric">% of stab. value</th>
                          <th className="pd-th pd-th-metric">% of cost</th>
                          <th className="pd-th pd-th-metric">Loan balance</th>
                          <th className="pd-th pd-th-metric">Annual payment</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="pd-row pd-row-cat">
                          <td className="pd-td pd-td-label">Debt service</td>
                          <td className="pd-td pd-td-val">49.3%</td>
                          <td className="pd-td pd-td-val">65.7%</td>
                          <td className="pd-td pd-td-val">$38,310,382</td>
                          <td className="pd-td pd-td-val">$3,454,364</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="pd-table-months">
                    <table className="pd-table">
                      <thead>
                        <tr>
                          {months.map((m) => (
                            <th key={m.num} className="pd-th pd-th-month">
                              <span className="pd-month-num">MONTH {m.num}</span>
                              <span className="pd-month-date">{m.date}</span>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="pd-row pd-row-cat">
                          {months.map((m) => (
                            <td key={m.num} className="pd-td pd-td-val">-</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* Cash flow after financing */}
              <div className="pd-cashflow-area">
                <div className="pd-cashflow-scroll">
                  <div className="pd-cashflow-frozen">
                    <table className="pd-table pd-table-cashflow">
                      <tbody>
                        <tr className="pd-row-cashflow">
                          <td className="pd-td pd-td-label pd-td-bold">Cash flow after financing</td>
                          <td className="pd-td pd-td-val pd-td-bold">{fmt(4310361)}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="pd-cashflow-months">
                    <table className="pd-table pd-table-cashflow">
                      <tbody>
                        <tr className="pd-row-cashflow">
                          {months.map((m) => (
                            <td key={m.num} className="pd-td pd-td-val pd-td-bold">{fmt(4310361)}</td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
