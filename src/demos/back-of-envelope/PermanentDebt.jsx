import React, { useState, useEffect } from 'react'
import './PermanentDebt.css'

function PermanentDebt() {
  // Calculation method: 'dscr' | 'debt-yield' | 'ltv'
  const [calculationMethod, setCalculationMethod] = useState('dscr')

  // Interest-only toggle
  const [interestOnly, setInterestOnly] = useState(true)

  // Common inputs
  const [apr, setApr] = useState(4.70)
  const [feesAndClosingCosts, setFeesAndClosingCosts] = useState(4.00)

  // DSCR inputs
  const [targetDscr, setTargetDscr] = useState(1.25)
  const [netOperatingIncome, setNetOperatingIncome] = useState(5000000)

  // Debt Yield inputs
  const [targetDebtYield, setTargetDebtYield] = useState(8.0)

  // LTV inputs
  const [targetLtv, setTargetLtv] = useState(65)
  const [stabilizedValue, setStabilizedValue] = useState(75000000)

  // Calculated results
  const [results, setResults] = useState({
    loanAmount: 0,
    annualDebtService: 0,
    dscr: 0,
    debtYield: 0,
    ltv: 0,
    feesAndClosing: 0,
  })

  // Calculate results when inputs change
  useEffect(() => {
    let loanAmount = 0

    // Calculate loan amount based on selected method
    switch (calculationMethod) {
      case 'dscr':
        // Loan Amount = (NOI / Target DSCR) / Annual Debt Service Rate
        const monthlyRate = (apr / 100) / 12
        let annualDebtServiceRate

        if (interestOnly) {
          annualDebtServiceRate = apr / 100
        } else {
          // Simplified: assume 30-year amortization
          const numPayments = 360
          const monthlyPaymentFactor = (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                                       (Math.pow(1 + monthlyRate, numPayments) - 1)
          annualDebtServiceRate = monthlyPaymentFactor * 12
        }

        loanAmount = (netOperatingIncome / targetDscr) / annualDebtServiceRate
        break

      case 'debt-yield':
        // Loan Amount = NOI / Target Debt Yield
        loanAmount = netOperatingIncome / (targetDebtYield / 100)
        break

      case 'ltv':
        // Loan Amount = Stabilized Value × LTV
        loanAmount = stabilizedValue * (targetLtv / 100)
        break
    }

    // Calculate derived metrics
    const monthlyRate = (apr / 100) / 12
    let monthlyPayment

    if (interestOnly) {
      monthlyPayment = loanAmount * monthlyRate
    } else {
      const numPayments = 360
      monthlyPayment = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
                      (Math.pow(1 + monthlyRate, numPayments) - 1)
    }

    const annualDebtService = monthlyPayment * 12
    const calculatedDscr = netOperatingIncome / annualDebtService
    const calculatedDebtYield = (netOperatingIncome / loanAmount) * 100
    const calculatedLtv = (loanAmount / stabilizedValue) * 100
    const feesAndClosing = loanAmount * (feesAndClosingCosts / 100)

    setResults({
      loanAmount,
      annualDebtService,
      dscr: calculatedDscr,
      debtYield: calculatedDebtYield,
      ltv: calculatedLtv,
      feesAndClosing,
    })
  }, [
    calculationMethod,
    interestOnly,
    apr,
    feesAndClosingCosts,
    targetDscr,
    netOperatingIncome,
    targetDebtYield,
    targetLtv,
    stabilizedValue,
  ])

  const formatCurrency = (value) => {
    if (!value || !isFinite(value)) return '—'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercent = (value, decimals = 2) => {
    if (!value || !isFinite(value)) return '—'
    return `${value.toFixed(decimals)}%`
  }

  return (
    <div className="boe-section boe-section-permanent-debt">
      <div className="boe-section-header">
        <div className="boe-section-number">4</div>
        <div className="boe-section-header-content">
          <h2 className="boe-section-label">PERMANENT DEBT</h2>
          <p className="boe-section-subtitle">Include permanent debt in this Pro Forma</p>
        </div>
        <label className="boe-toggle">
          <input type="checkbox" defaultChecked />
          <span className="boe-toggle-slider"></span>
        </label>
      </div>

      <div className="pd-content-grid">
        {/* Left Column - Inputs */}
        <div className="pd-inputs-column">

          {/* Calculation Method Selector */}
          <div className="boe-field-group">
            <label className="boe-label">Calculation method</label>
            <div className="boe-button-group">
              <button
                className={calculationMethod === 'dscr' ? 'active' : ''}
                onClick={() => setCalculationMethod('dscr')}
              >
                DSCR
              </button>
              <button
                className={calculationMethod === 'debt-yield' ? 'active' : ''}
                onClick={() => setCalculationMethod('debt-yield')}
              >
                Debt Yield
              </button>
              <button
                className={calculationMethod === 'ltv' ? 'active' : ''}
                onClick={() => setCalculationMethod('ltv')}
              >
                LTV
              </button>
            </div>
          </div>

          {/* Method-Specific Inputs */}
          {calculationMethod === 'dscr' && (
            <div className="boe-field-group">
              <label className="boe-label">Target DSCR</label>
              <div className="boe-slider-group">
                <input
                  type="range"
                  className="boe-slider"
                  min="0.5"
                  max="3"
                  step="0.05"
                  value={targetDscr}
                  onChange={(e) => setTargetDscr(Number(e.target.value))}
                />
                <input
                  type="number"
                  className="boe-input-small"
                  value={targetDscr}
                  onChange={(e) => setTargetDscr(Number(e.target.value))}
                  step="0.05"
                />
                <span className="boe-unit">×</span>
              </div>
            </div>
          )}

          {calculationMethod === 'debt-yield' && (
            <div className="boe-field-group">
              <label className="boe-label">Target Debt Yield</label>
              <div className="boe-slider-group">
                <input
                  type="range"
                  className="boe-slider"
                  min="1"
                  max="15"
                  step="0.1"
                  value={targetDebtYield}
                  onChange={(e) => setTargetDebtYield(Number(e.target.value))}
                />
                <input
                  type="number"
                  className="boe-input-small"
                  value={targetDebtYield}
                  onChange={(e) => setTargetDebtYield(Number(e.target.value))}
                  step="0.1"
                />
                <span className="boe-unit">%</span>
              </div>
            </div>
          )}

          {calculationMethod === 'ltv' && (
            <>
              <div className="boe-field-group">
                <label className="boe-label">Target LTV</label>
                <div className="boe-slider-group">
                  <input
                    type="range"
                    className="boe-slider"
                    min="0"
                    max="95"
                    step="1"
                    value={targetLtv}
                    onChange={(e) => setTargetLtv(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    className="boe-input-small"
                    value={targetLtv}
                    onChange={(e) => setTargetLtv(Number(e.target.value))}
                    step="1"
                  />
                  <span className="boe-unit">%</span>
                </div>
              </div>

              <div className="boe-field-group">
                <label className="boe-label">Stabilized Value</label>
                <div className="boe-input-with-unit">
                  <span className="boe-currency">$</span>
                  <input
                    type="number"
                    className="boe-input"
                    value={stabilizedValue}
                    onChange={(e) => setStabilizedValue(Number(e.target.value))}
                  />
                </div>
              </div>
            </>
          )}

          {/* Common Loan Terms */}
          <div className="boe-field-group">
            <label className="boe-label">Interest only?</label>
            <select
              className="boe-select"
              value={interestOnly ? 'yes' : 'no'}
              onChange={(e) => setInterestOnly(e.target.value === 'yes')}
            >
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="boe-field-group">
            <label className="boe-label">APR</label>
            <div className="boe-slider-group">
              <input
                type="range"
                className="boe-slider"
                min="0"
                max="15"
                step="0.1"
                value={apr}
                onChange={(e) => setApr(Number(e.target.value))}
              />
              <input
                type="number"
                className="boe-input-small"
                value={apr}
                onChange={(e) => setApr(Number(e.target.value))}
                step="0.1"
              />
              <span className="boe-unit">%</span>
            </div>
          </div>

          <div className="boe-field-group">
            <label className="boe-label">Fees & closing costs</label>
            <div className="boe-slider-group">
              <input
                type="range"
                className="boe-slider"
                min="0"
                max="10"
                step="0.1"
                value={feesAndClosingCosts}
                onChange={(e) => setFeesAndClosingCosts(Number(e.target.value))}
              />
              <input
                type="number"
                className="boe-input-small"
                value={feesAndClosingCosts}
                onChange={(e) => setFeesAndClosingCosts(Number(e.target.value))}
                step="0.1"
              />
              <span className="boe-unit">%</span>
            </div>
          </div>
        </div>

        {/* Right Column - Results */}
        <div className="pd-results-column">
          <div className="pd-results-cards">
            <div className="pd-result-card">
              <div className="pd-result-label">Loan funding</div>
              <div className="pd-result-value">Nov 2030 (Month 60)</div>
            </div>
            <div className="pd-result-card">
              <div className="pd-result-label">Loan payoff</div>
              <div className="pd-result-value">Nov 2035 (Month 120)</div>
            </div>
          </div>

          <div className="pd-results-cards">
            <div className="pd-result-card">
              <div className="pd-result-label">Debt service coverage ratio</div>
              <div className="pd-result-value">{results.dscr.toFixed(2)}×</div>
            </div>
            <div className="pd-result-card">
              <div className="pd-result-label">Fees & closing costs</div>
              <div className="pd-result-value">{formatCurrency(results.feesAndClosing)}</div>
            </div>
          </div>

          <div className="pd-results-cards">
            <div className="pd-result-card">
              <div className="pd-result-label">Loan amount</div>
              <div className="pd-result-value">{formatCurrency(results.loanAmount)}</div>
            </div>
            <div className="pd-result-card">
              <div className="pd-result-label">Cash-on-cash on return</div>
              <div className="pd-result-value">7.68% (Month 61)</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Table */}
      <div className="pd-table-wrapper">
        <table className="pd-table">
          <thead>
            <tr>
              <th></th>
              <th>% of stab. value</th>
              <th>% of cost</th>
              <th>Amount</th>
              <th>Annual payment</th>
              <th>MONTH 39<br/><span className="pd-table-month-date">FEB 2029</span></th>
              <th>MONTH 40<br/><span className="pd-table-month-date">MAR 2029</span></th>
              <th>MONTH 41<br/><span className="pd-table-month-date">APR 2029</span></th>
              <th>MONTH 42<br/><span className="pd-table-month-date">MAY 2029</span></th>
              <th>MONTH 43<br/><span className="pd-table-month-date">JUN 2029</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="pd-table-label">Debt service</td>
              <td>{formatPercent(results.ltv, 2)}</td>
              <td>67.71%</td>
              <td className="pd-table-highlight">{formatCurrency(results.loanAmount)}</td>
              <td className="pd-table-highlight">{formatCurrency(results.annualDebtService)}</td>
              <td>$0</td>
              <td>$0</td>
              <td>$0</td>
              <td>$0</td>
              <td>$0</td>
            </tr>
            <tr>
              <td className="pd-table-label">Cash flow after financing</td>
              <td></td>
              <td></td>
              <td></td>
              <td className="pd-table-negative">($216,539)</td>
              <td>$0</td>
              <td>$0</td>
              <td>$0</td>
              <td>$0</td>
              <td>$0</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default PermanentDebt
