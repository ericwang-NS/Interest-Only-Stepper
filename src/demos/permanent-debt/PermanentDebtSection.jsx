import React, { useState } from 'react';
import './PermanentDebtSection.css';

export default function PermanentDebtSection() {
  const [enabled, setEnabled] = useState(true);
  const [interestOnly, setInterestOnly] = useState(false);
  const [amortization, setAmortization] = useState(30);
  const [apr, setApr] = useState(7.0);
  const [feesPercent, setFeesPercent] = useState(4.0);

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

  return (
    <div className="ns-page-bg">
      <div className="ns-section">
        {/* Section number */}
        <div className="ns-section-num">4</div>

        {/* Section card */}
        <div className="ns-section-card">
          {/* Header row */}
          <div className="ns-section-header">
            <div>
              <h4 className="ns-section-title">Permanent Debt</h4>
              <p className="ns-section-subtitle">Include permanent debt in this Pro Forma</p>
            </div>
            <label className="ns-toggle">
              <input
                type="checkbox"
                checked={enabled}
                onChange={(e) => setEnabled(e.target.checked)}
              />
              <span className="ns-toggle-track">
                <span className="ns-toggle-thumb" />
              </span>
            </label>
          </div>

          {enabled && (
            <>
              {/* Two-panel content */}
              <div className="ns-panels">
                {/* Left: Parameters */}
                <div className="ns-params">
                  <div className="ns-param-row">
                    <label className="ns-param-label">Interest only?</label>
                    <div className="ns-param-control">
                      <select
                        className="ns-dropdown"
                        value={interestOnly ? 'Yes' : 'No'}
                        onChange={(e) => setInterestOnly(e.target.value === 'Yes')}
                      >
                        <option>No</option>
                        <option>Yes</option>
                      </select>
                    </div>
                  </div>

                  <div className="ns-param-row">
                    <label className="ns-param-label">Amortization</label>
                    <div className="ns-param-control">
                      <div className="ns-stepper">
                        <button
                          className="ns-stepper-btn"
                          onClick={() => setAmortization(Math.max(1, amortization - 1))}
                        >
                          −
                        </button>
                        <span className="ns-stepper-val">{amortization} years</span>
                        <button
                          className="ns-stepper-btn"
                          onClick={() => setAmortization(amortization + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="ns-param-row">
                    <label className="ns-param-label">APR</label>
                    <div className="ns-param-control">
                      <div className="ns-stepper">
                        <button
                          className="ns-stepper-btn"
                          onClick={() => setApr(Math.max(0, +(apr - 0.25).toFixed(2)))}
                        >
                          −
                        </button>
                        <span className="ns-stepper-val">{apr.toFixed(2)}%</span>
                        <button
                          className="ns-stepper-btn"
                          onClick={() => setApr(+(apr + 0.25).toFixed(2))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="ns-param-row">
                    <label className="ns-param-label">Fees &amp; closing costs</label>
                    <div className="ns-param-control">
                      <div className="ns-stepper">
                        <button
                          className="ns-stepper-btn"
                          onClick={() => setFeesPercent(Math.max(0, +(feesPercent - 0.25).toFixed(2)))}
                        >
                          −
                        </button>
                        <span className="ns-stepper-val">{feesPercent.toFixed(2)}%</span>
                        <button
                          className="ns-stepper-btn"
                          onClick={() => setFeesPercent(+(feesPercent + 0.25).toFixed(2))}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Result cards */}
                <div className="ns-results">
                  <div className="ns-result-grid">
                    <div className="ns-result-card">
                      <span className="ns-result-label">Loan funding</span>
                      <span className="ns-result-value">Jan 2031 (Month 60)</span>
                    </div>
                    <div className="ns-result-card">
                      <span className="ns-result-label">Loan payoff</span>
                      <span className="ns-result-value">Jan 2036 (Month 120)</span>
                    </div>
                    <div className="ns-result-card">
                      <span className="ns-result-label">Debt service coverage ratio</span>
                      <span className="ns-result-value">0.99x</span>
                    </div>
                    <div className="ns-result-card">
                      <span className="ns-result-label">Fees &amp; closing costs</span>
                      <span className="ns-result-value">$213,596</span>
                    </div>
                  </div>
                  <div className="ns-result-card ns-result-card-full">
                    <span className="ns-result-label">Cash-on-cash on return</span>
                    <span className="ns-result-value">15.35% (Month 61)</span>
                  </div>
                </div>
              </div>

              {/* Debt service table */}
              <div className="ns-table-wrap">
                <table className="ns-table">
                  <thead>
                    <tr>
                      <th className="ns-th-label"></th>
                      <th className="ns-th-metric">% of stab. value</th>
                      <th className="ns-th-metric">% of cost</th>
                      <th className="ns-th-metric">Amount</th>
                      <th className="ns-th-metric">Annual payment</th>
                      {months.map((m) => (
                        <th key={m.num} className="ns-th-month">
                          <div className="ns-th-month-num">MONTH {m.num}</div>
                          <div className="ns-th-month-date">{m.date}</div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Debt service row */}
                    <tr className="ns-row">
                      <td className="ns-td-label">Debt service</td>
                      <td className="ns-td-metric">63.49%</td>
                      <td className="ns-td-metric">67.71%</td>
                      <td className="ns-td-metric">{fmt(5339892)}</td>
                      <td className="ns-td-metric">{fmt(426317)}</td>
                      <td className="ns-td-month">$0</td>
                      <td className="ns-td-month">$0</td>
                      <td className="ns-td-month">$0</td>
                      <td className="ns-td-month">$0</td>
                    </tr>

                    {/* Cash flow after financing row */}
                    <tr className="ns-row ns-row-total">
                      <td className="ns-td-label ns-td-label-bold">Cash flow after financing</td>
                      <td className="ns-td-metric"></td>
                      <td className="ns-td-metric"></td>
                      <td className="ns-td-metric"></td>
                      <td className="ns-td-metric ns-val-negative">({fmt(48941).replace('$', '$')})</td>
                      <td className="ns-td-month">{fmt(13770)}</td>
                      <td className="ns-td-month">{fmt(15104)}</td>
                      <td className="ns-td-month">{fmt(16450)}</td>
                      <td className="ns-td-month">{fmt(17808)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
