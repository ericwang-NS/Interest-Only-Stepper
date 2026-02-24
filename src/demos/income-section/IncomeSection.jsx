import React, { useState } from 'react';
import './IncomeSection.css';

export default function IncomeSection() {
  const [collapsed, setCollapsed] = useState(false);

  const months = [
    { num: 44, date: 'SEP 2029' },
    { num: 45, date: 'OCT 2029' },
    { num: 46, date: 'NOV 2029' },
    { num: 47, date: 'DEC 2029' },
  ];

  const MonthHeaders = () => (
    <>
      {months.map((m) => (
        <th key={m.num} className="inc-th-month">
          <div className="inc-th-month-num">MONTH {m.num}</div>
          <div className="inc-th-month-date">{m.date}</div>
        </th>
      ))}
    </>
  );

  const MonthCells = ({ values }) => (
    <>
      {values.map((v, i) => (
        <td key={i} className="inc-td-month">{v}</td>
      ))}
    </>
  );

  const zeros = ['$0', '$0', '$0', '$0'];

  return (
    <div className="inc-page-bg">
      <div className="inc-section">
        <div className="inc-section-num">2</div>
        <div className="inc-section-card">
          {/* Header */}
          <div
            className="inc-section-header"
            onClick={() => setCollapsed(!collapsed)}
            role="button"
            tabIndex={0}
          >
            <div>
              <h4 className="inc-section-title">Income</h4>
              <p className="inc-section-subtitle">Overview of this investment's total income</p>
            </div>
            <div className={`inc-caret ${collapsed ? 'inc-caret-down' : ''}`}>
              <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                <path d="M1 7L7 1L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          {!collapsed && (
            <div className="inc-body">

              {/* ── Rental Income ────────────────────── */}
              <div className="inc-table-wrap">
                <table className="inc-table">
                  <thead>
                    <tr className="inc-cat-header">
                      <th className="inc-th-label" style={{ minWidth: 60 }}>Floor</th>
                      <th className="inc-th-label" style={{ minWidth: 100 }}>Allocation</th>
                      <th className="inc-th-action">+</th>
                      <th className="inc-th-metric">RSF</th>
                      <th className="inc-th-metric">$/RSF/year</th>
                      <th className="inc-th-metric">Annual rent (yr 1)</th>
                      <MonthHeaders />
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="inc-row">
                      <td className="inc-td-label">1</td>
                      <td className="inc-td-label inc-val-blue">100.00%</td>
                      <td className="inc-td-action"></td>
                      <td className="inc-td-metric">19,890</td>
                      <td className="inc-td-metric inc-val-blue">$25.00</td>
                      <td className="inc-td-metric inc-val-blue">$497,250</td>
                      <MonthCells values={zeros} />
                    </tr>
                    <tr className="inc-row inc-row-total">
                      <td className="inc-td-label inc-td-bold" colSpan={2}>Total rental income</td>
                      <td className="inc-td-action"></td>
                      <td className="inc-td-metric inc-td-bold">19,890</td>
                      <td className="inc-td-metric inc-td-bold">$25.00</td>
                      <td className="inc-td-metric inc-td-bold">$497,250</td>
                      <MonthCells values={zeros} />
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ── Recovery ─────────────────────────── */}
              <div className="inc-table-wrap">
                <table className="inc-table">
                  <thead>
                    <tr className="inc-cat-header">
                      <th className="inc-th-label-wide">Recovery (avg. per tenant)</th>
                      <th className="inc-th-metric">Rec. %</th>
                      <th className="inc-th-metric">$/RSF/year</th>
                      <th className="inc-th-metric">Amount/year</th>
                      <MonthHeaders />
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="inc-row">
                      <td className="inc-td-label-wide">Recovery income</td>
                      <td className="inc-td-metric inc-val-blue">85.00%</td>
                      <td className="inc-td-metric">$7.56</td>
                      <td className="inc-td-metric">150,361</td>
                      <MonthCells values={zeros} />
                    </tr>
                    <tr className="inc-row inc-row-total">
                      <td className="inc-td-label-wide inc-td-bold">Total recovery income</td>
                      <td className="inc-td-metric"></td>
                      <td className="inc-td-metric inc-td-bold">$7.56</td>
                      <td className="inc-td-metric inc-td-bold">$150,361</td>
                      <MonthCells values={zeros} />
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ── Other Income ─────────────────────── */}
              <div className="inc-table-wrap">
                <table className="inc-table">
                  <thead>
                    <tr className="inc-cat-header">
                      <th className="inc-th-label-wide">
                        Other income
                        <span className="inc-th-plus">+</span>
                      </th>
                      <th className="inc-th-metric">Annual growth</th>
                      <th className="inc-th-metric">% of rental income</th>
                      <th className="inc-th-metric">$/RSF/year</th>
                      <th className="inc-th-metric">Amount/year</th>
                      <MonthHeaders />
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="inc-row">
                      <td className="inc-td-label-wide inc-val-blue inc-link">Percentage rent</td>
                      <td className="inc-td-metric inc-val-blue">3.00%</td>
                      <td className="inc-td-metric inc-val-blue">3.00%</td>
                      <td className="inc-td-metric inc-val-blue">$0.75</td>
                      <td className="inc-td-metric inc-val-blue">$14,918</td>
                      <MonthCells values={zeros} />
                    </tr>
                    <tr className="inc-row inc-row-total">
                      <td className="inc-td-label-wide inc-td-bold">Total other income</td>
                      <td className="inc-td-metric inc-td-bold">3.00%</td>
                      <td className="inc-td-metric inc-td-bold">3.00%</td>
                      <td className="inc-td-metric inc-td-bold">$0.75</td>
                      <td className="inc-td-metric inc-td-bold">$14,918</td>
                      <MonthCells values={zeros} />
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ── Total Potential Income ────────────── */}
              <div className="inc-table-wrap">
                <table className="inc-table">
                  <tbody>
                    <tr className="inc-row inc-row-grand-total">
                      <td className="inc-td-label-wide inc-td-bold">Total potential income</td>
                      <td className="inc-td-metric"></td>
                      <td className="inc-td-metric"></td>
                      <td className="inc-td-metric inc-td-bold">$33.31</td>
                      <td className="inc-td-metric inc-td-bold">$662,528</td>
                      <MonthCells values={zeros} />
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ── Income Adjustments ────────────────── */}
              <div className="inc-table-wrap">
                <table className="inc-table">
                  <thead>
                    <tr className="inc-cat-header">
                      <th className="inc-th-label-wide">
                        Income adjustments
                        <span className="inc-th-plus">+</span>
                      </th>
                      <th className="inc-th-metric">% of income</th>
                      <th className="inc-th-metric">$/RSF/mo.</th>
                      <th className="inc-th-metric">Amount/year</th>
                      <MonthHeaders />
                    </tr>
                  </thead>
                  <tbody>
                    {/* Vacancy */}
                    <tr className="inc-row">
                      <td className="inc-td-label-wide inc-td-twoline">
                        <div className="inc-adj-name">Vacancy</div>
                        <div className="inc-adj-from">
                          <select className="inc-adj-dropdown">
                            <option>From: Total potential income</option>
                          </select>
                        </div>
                      </td>
                      <td className="inc-td-metric inc-val-blue">8.00%</td>
                      <td className="inc-td-metric inc-val-muted">($0.22)</td>
                      <td className="inc-td-metric inc-val-muted">($53,002)</td>
                      <MonthCells values={zeros} />
                    </tr>

                    {/* Credit loss */}
                    <tr className="inc-row">
                      <td className="inc-td-label-wide inc-td-twoline">
                        <div className="inc-adj-name">Credit loss</div>
                        <div className="inc-adj-from">
                          <select className="inc-adj-dropdown">
                            <option>From: Total potential income</option>
                          </select>
                        </div>
                      </td>
                      <td className="inc-td-metric inc-val-blue">3.00%</td>
                      <td className="inc-td-metric inc-val-muted">($0.08)</td>
                      <td className="inc-td-metric inc-val-muted">($19,876)</td>
                      <MonthCells values={zeros} />
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* ── Effective Gross Revenue ────────────── */}
              <div className="inc-table-wrap">
                <table className="inc-table">
                  <tbody>
                    <tr className="inc-row inc-row-grand-total">
                      <td className="inc-td-label-wide inc-td-bold">Effective gross revenue</td>
                      <td className="inc-td-metric"></td>
                      <td className="inc-td-metric inc-td-bold">$2.47</td>
                      <td className="inc-td-metric inc-td-bold">$589,650</td>
                      <MonthCells values={zeros} />
                    </tr>
                  </tbody>
                </table>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
