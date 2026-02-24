import React, { useState, useEffect } from 'react'
import './BackOfEnvelope.css'

function BackOfEnvelope() {
  // State for Construction Financing section
  const [ltv, setLtv] = useState(75)
  const [marketCapRate, setMarketCapRate] = useState(5)
  const [apr, setApr] = useState(6.5)
  const [avgLoanBalance, setAvgLoanBalance] = useState(50)
  const [loanTerm, setLoanTerm] = useState(24)

  // State for other sections (simplified for demo)
  const [assetType, setAssetType] = useState('rental-apartment')
  const [grossSF, setGrossSF] = useState(200000)
  const [efficiencyRatio, setEfficiencyRatio] = useState(85)
  const [rentPrice, setRentPrice] = useState(2500)
  const [units, setUnits] = useState(200)
  const [expenseCost, setExpenseCost] = useState(300)
  const [exitCapRate, setExitCapRate] = useState(5)
  const [acquisitionCosts, setAcquisitionCosts] = useState(3000000)
  const [hardCosts, setHardCosts] = useState(50000000)
  const [softCosts, setSoftCosts] = useState(12000000)

  // Calculated values
  const [calculations, setCalculations] = useState({
    grossPotentialRent: 0,
    netOperatingIncome: 0,
    exitValuation: 0,
    totalDevCosts: 0,
    loanAmount: 0,
    requiredEquity: 0,
    interestReserve: 0,
  })

  // Calculate values when inputs change
  useEffect(() => {
    const totalDevCosts = acquisitionCosts + hardCosts + softCosts
    const loanAmount = (totalDevCosts * ltv) / 100
    const requiredEquity = totalDevCosts - loanAmount
    const interestReserve = ((loanAmount * (avgLoanBalance / 100)) * (apr / 100) * (loanTerm / 12))

    const grossPotentialRent = rentPrice * units * 12
    const expensesTotal = expenseCost * units * 12
    const netOperatingIncome = grossPotentialRent - expensesTotal
    const exitValuation = (netOperatingIncome / (exitCapRate / 100))

    setCalculations({
      grossPotentialRent,
      netOperatingIncome,
      exitValuation,
      totalDevCosts,
      loanAmount,
      requiredEquity,
      interestReserve,
    })
  }, [ltv, marketCapRate, apr, avgLoanBalance, loanTerm, acquisitionCosts, hardCosts, softCosts, rentPrice, units, expenseCost, exitCapRate])

  const formatCurrency = (value) => {
    if (!value || value === 0) return '-'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatPercent = (value) => {
    return `${value.toFixed(2)}%`
  }

  return (
    <div className="boe-modal-overlay">
      <div className="boe-modal">
        <div className="boe-header">
          <button className="boe-close" aria-label="Close">×</button>
          <div className="boe-title-section">
            <h1 className="boe-title">Back-Of-Envelope</h1>
            <p className="boe-subtitle">Quickly assess the financial feasibility of this deal.</p>
          </div>
          <div className="boe-header-actions">
            <select className="boe-scenario-select">
              <option>Select scenario</option>
            </select>
            <button className="boe-btn-secondary">Clear</button>
            <button className="boe-btn-primary">Save</button>
          </div>
        </div>

        <div className="boe-content">
          {/* Left Panel - Form Sections */}
          <div className="boe-left-panel">

            {/* Asset Type */}
            <section className="boe-section">
              <h2 className="boe-section-label">ASSET TYPE</h2>
              <select
                className="boe-select"
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
              >
                <option value="rental-apartment">Rental apartment</option>
                <option value="commercial">Commercial</option>
                <option value="mixed-use">Mixed use</option>
              </select>
            </section>

            {/* Target Returns */}
            <section className="boe-section">
              <div className="boe-target-returns">
                <div className="boe-metric-card">
                  <div className="boe-metric-icon">🎯</div>
                  <div className="boe-metric-label">Target return on cost:</div>
                  <div className="boe-metric-value">6.00%</div>
                </div>
                <div className="boe-metric-card">
                  <div className="boe-metric-icon">🎯</div>
                  <div className="boe-metric-label">Target return on equity:</div>
                  <div className="boe-metric-value">24.00%</div>
                </div>
                <div className="boe-metric-card">
                  <div className="boe-metric-icon">🎯</div>
                  <div className="boe-metric-label">Target profit return:</div>
                  <div className="boe-metric-value">$20,000,000</div>
                </div>
              </div>
            </section>

            {/* Property Size */}
            <section className="boe-section">
              <h2 className="boe-section-label">PROPERTY SIZE</h2>
              <div className="boe-field-group">
                <label className="boe-label">Built gross SF</label>
                <div className="boe-input-with-unit">
                  <input
                    type="number"
                    className="boe-input"
                    value={grossSF}
                    onChange={(e) => setGrossSF(Number(e.target.value))}
                  />
                  <span className="boe-unit">SF</span>
                </div>
              </div>
              <div className="boe-field-group">
                <label className="boe-label">Efficiency ratio</label>
                <div className="boe-slider-group">
                  <input
                    type="range"
                    className="boe-slider"
                    min="0"
                    max="100"
                    value={efficiencyRatio}
                    onChange={(e) => setEfficiencyRatio(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    className="boe-input-small"
                    value={efficiencyRatio}
                    onChange={(e) => setEfficiencyRatio(Number(e.target.value))}
                  />
                  <span className="boe-unit">%</span>
                </div>
              </div>
              <div className="boe-calculated">Net rentable SF: {formatCurrency((grossSF * efficiencyRatio) / 100)}</div>
            </section>

            {/* Income */}
            <section className="boe-section">
              <h2 className="boe-section-label">INCOME</h2>
              <div className="boe-field-group">
                <label className="boe-label">Rent price</label>
                <div className="boe-input-with-unit">
                  <span className="boe-currency">$</span>
                  <input
                    type="number"
                    className="boe-input"
                    value={rentPrice}
                    onChange={(e) => setRentPrice(Number(e.target.value))}
                  />
                  <select className="boe-select-unit">
                    <option>per unit</option>
                  </select>
                </div>
              </div>
              <div className="boe-field-group">
                <label className="boe-label">Units</label>
                <input
                  type="number"
                  className="boe-input"
                  value={units}
                  onChange={(e) => setUnits(Number(e.target.value))}
                />
              </div>
            </section>

            {/* Expenses */}
            <section className="boe-section">
              <h2 className="boe-section-label">EXPENSES</h2>
              <div className="boe-field-group">
                <label className="boe-label">Expense cost</label>
                <div className="boe-input-with-unit">
                  <span className="boe-currency">$</span>
                  <input
                    type="number"
                    className="boe-input"
                    value={expenseCost}
                    onChange={(e) => setExpenseCost(Number(e.target.value))}
                  />
                  <select className="boe-select-unit">
                    <option>per unit</option>
                  </select>
                </div>
              </div>
              <div className="boe-calculated">Expenses total: {formatCurrency(expenseCost * units * 12)}</div>
            </section>

            {/* Exit Value */}
            <section className="boe-section">
              <h2 className="boe-section-label">EXIT VALUE</h2>
              <div className="boe-field-group">
                <label className="boe-label">Assumed exit cap rate</label>
                <div className="boe-slider-group">
                  <input
                    type="range"
                    className="boe-slider"
                    min="0"
                    max="15"
                    step="0.1"
                    value={exitCapRate}
                    onChange={(e) => setExitCapRate(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    className="boe-input-small"
                    value={exitCapRate}
                    onChange={(e) => setExitCapRate(Number(e.target.value))}
                  />
                  <span className="boe-unit">%</span>
                </div>
              </div>
            </section>

            {/* Development Costs */}
            <section className="boe-section">
              <h2 className="boe-section-label">DEVELOPMENT COSTS</h2>
              <div className="boe-field-group">
                <label className="boe-label">Acquisition costs</label>
                <div className="boe-input-with-unit">
                  <span className="boe-currency">$</span>
                  <input
                    type="number"
                    className="boe-input"
                    value={acquisitionCosts}
                    onChange={(e) => setAcquisitionCosts(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="boe-field-group">
                <label className="boe-label">Hard costs</label>
                <div className="boe-input-with-unit">
                  <span className="boe-currency">$</span>
                  <input
                    type="number"
                    className="boe-input"
                    value={hardCosts}
                    onChange={(e) => setHardCosts(Number(e.target.value))}
                  />
                </div>
              </div>
              <div className="boe-field-group">
                <label className="boe-label">Soft costs</label>
                <div className="boe-input-with-unit">
                  <span className="boe-currency">$</span>
                  <input
                    type="number"
                    className="boe-input"
                    value={softCosts}
                    onChange={(e) => setSoftCosts(Number(e.target.value))}
                  />
                </div>
              </div>
            </section>

            {/* Construction Financing - IMPROVED LAYOUT */}
            <section className="boe-section boe-section-highlight">
              <div className="boe-section-header">
                <h2 className="boe-section-label boe-section-label-accent">CONSTRUCTION FINANCING</h2>
                <a href="#" className="boe-link">Loan sizing test →</a>
              </div>

              {/* LTV */}
              <div className="boe-field-group">
                <label className="boe-label">LTV</label>
                <div className="boe-slider-group">
                  <input
                    type="range"
                    className="boe-slider"
                    min="0"
                    max="100"
                    value={ltv}
                    onChange={(e) => setLtv(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    className="boe-input-small"
                    value={ltv}
                    onChange={(e) => setLtv(Number(e.target.value))}
                  />
                  <span className="boe-unit">%</span>
                </div>
              </div>

              {/* Market cap rate */}
              <div className="boe-field-group">
                <label className="boe-label">Market cap rate</label>
                <div className="boe-slider-group">
                  <input
                    type="range"
                    className="boe-slider"
                    min="0"
                    max="15"
                    step="0.1"
                    value={marketCapRate}
                    onChange={(e) => setMarketCapRate(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    className="boe-input-small"
                    value={marketCapRate}
                    onChange={(e) => setMarketCapRate(Number(e.target.value))}
                  />
                  <span className="boe-unit">%</span>
                </div>
              </div>

              {/* APR - MOVED FROM FINANCING COSTS */}
              <div className="boe-field-group">
                <label className="boe-label">APR</label>
                <div className="boe-slider-group">
                  <input
                    type="range"
                    className="boe-slider"
                    min="0"
                    max="20"
                    step="0.1"
                    value={apr}
                    onChange={(e) => setApr(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    className="boe-input-small"
                    value={apr}
                    onChange={(e) => setApr(Number(e.target.value))}
                  />
                  <span className="boe-unit">%</span>
                </div>
              </div>

              {/* Average loan balance - MOVED FROM FINANCING COSTS */}
              <div className="boe-field-group">
                <label className="boe-label">Average loan balance</label>
                <div className="boe-slider-group">
                  <input
                    type="range"
                    className="boe-slider"
                    min="0"
                    max="100"
                    value={avgLoanBalance}
                    onChange={(e) => setAvgLoanBalance(Number(e.target.value))}
                  />
                  <input
                    type="number"
                    className="boe-input-small"
                    value={avgLoanBalance}
                    onChange={(e) => setAvgLoanBalance(Number(e.target.value))}
                  />
                  <span className="boe-unit">%</span>
                </div>
              </div>

              {/* Loan term - MOVED FROM FINANCING COSTS */}
              <div className="boe-field-group">
                <label className="boe-label">Loan term</label>
                <div className="boe-input-with-unit">
                  <input
                    type="number"
                    className="boe-input"
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                  />
                  <select className="boe-select-unit">
                    <option>months</option>
                    <option>years</option>
                  </select>
                </div>
              </div>

              {/* Calculated values */}
              <div className="boe-calculations">
                <div className="boe-calc-row">
                  <span className="boe-calc-label">Loan amount:</span>
                  <span className="boe-calc-value">{formatCurrency(calculations.loanAmount)}</span>
                </div>
                <div className="boe-calc-row">
                  <span className="boe-calc-label">Required equity:</span>
                  <span className="boe-calc-value">{formatCurrency(calculations.requiredEquity)}</span>
                </div>
                <div className="boe-calc-row">
                  <span className="boe-calc-label">Interest reserve total:</span>
                  <span className="boe-calc-value">{formatCurrency(calculations.interestReserve)}</span>
                </div>
              </div>
            </section>

          </div>

          {/* Right Panel - Calculated Results */}
          <div className="boe-right-panel">
            <div className="boe-results-sticky">
              <h3 className="boe-results-title">Calculations</h3>

              <div className="boe-result-group">
                <div className="boe-result-row">
                  <span className="boe-result-label">Gross potential rent</span>
                  <button className="boe-chevron">»</button>
                  <span className="boe-result-value">{formatCurrency(calculations.grossPotentialRent)}</span>
                  <span className="boe-result-sublabel">annually</span>
                </div>
              </div>

              <div className="boe-result-group">
                <div className="boe-result-row">
                  <span className="boe-result-label">Net operating income</span>
                  <button className="boe-chevron">»</button>
                  <span className="boe-result-value">{formatCurrency(calculations.netOperatingIncome)}</span>
                  <span className="boe-result-sublabel">annually</span>
                </div>
              </div>

              <div className="boe-result-group">
                <div className="boe-result-row">
                  <span className="boe-result-label">Exit valuation</span>
                  <button className="boe-chevron">»</button>
                  <span className="boe-result-value">{formatCurrency(calculations.exitValuation)}</span>
                </div>
              </div>

              <div className="boe-result-group">
                <div className="boe-result-row">
                  <span className="boe-result-label">Total development costs (uses)</span>
                  <button className="boe-chevron">»</button>
                  <span className="boe-result-value">{formatCurrency(calculations.totalDevCosts)}</span>
                </div>
              </div>

              <div className="boe-result-group">
                <div className="boe-result-row">
                  <span className="boe-result-label">Loan amount</span>
                  <button className="boe-chevron">»</button>
                  <span className="boe-result-value boe-highlight">{formatCurrency(calculations.loanAmount)}</span>
                </div>
              </div>

              <div className="boe-result-group">
                <div className="boe-result-row">
                  <span className="boe-result-label">Required equity</span>
                  <button className="boe-chevron">»</button>
                  <span className="boe-result-value boe-highlight">{formatCurrency(calculations.requiredEquity)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BackOfEnvelope
