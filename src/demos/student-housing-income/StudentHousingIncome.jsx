import React, { useState, useMemo } from 'react';
import './StudentHousingIncome.css';

const fmt = (n) => n.toLocaleString('en-US', { maximumFractionDigits: 0 });
const fmtD = (n) => '$' + fmt(Math.abs(n));
const fmtNeg = (n) => '($' + fmt(Math.abs(n)) + ')';

// Month timeline columns — operations start Month 1 = Aug 2027
const OP_MONTHS = [
  { num: 1, label: 'AUG 2027' },
  { num: 2, label: 'SEP 2027' },
  { num: 3, label: 'OCT 2027' },
  { num: 4, label: 'NOV 2027' },
];

const MonthHeaders = () => (
  <>
    {OP_MONTHS.map((m) => (
      <th key={m.num} className="sh-th-month">
        <div className="sh-th-month-num">MONTH {m.num}</div>
        <div className="sh-th-month-date">{m.label}</div>
      </th>
    ))}
  </>
);

const MonthCells = ({ values }) => (
  <>
    {(values || OP_MONTHS.map(() => '\u2014')).map((v, i) => (
      <td key={i} className="sh-td-month">{v}</td>
    ))}
  </>
);

export default function StudentHousingIncome() {
  const [activeTab, setActiveTab] = useState('operations');
  const [collapsed, setCollapsed] = useState(false);
  const [displayMode, setDisplayMode] = useState('perBed');

  // General Info state
  const [dealName, setDealName] = useState('Campus View Apartments');
  const [address, setAddress] = useState('1200 University Ave');
  const [city, setCity] = useState('Austin');
  const [county, setCounty] = useState('Travis County');
  const [giState, setGiState] = useState('Texas');
  const [zip, setZip] = useState('78705');
  const [university, setUniversity] = useState('University of Texas at Austin');

  // Key Dates
  const [startMonth] = useState('August 2027');
  const [constructionStart] = useState('August 2025');
  const [constructionDuration, setConstructionDuration] = useState(24);
  const [holdPeriod, setHoldPeriod] = useState(84);

  // Size
  const [builtGrossSF, setBuiltGrossSF] = useState(65880);
  const [efficiencyRatio, setEfficiencyRatio] = useState(85.0);
  const [numUnits, setNumUnits] = useState(140);
  const [parkingSpaces, setParkingSpaces] = useState(180);
  const [buildings, setBuildings] = useState(2);
  const [stories, setStories] = useState(4);
  const netRentableSF = Math.round(builtGrossSF * (efficiencyRatio / 100));
  const sfPerUnit = numUnits > 0 ? Math.round(netRentableSF / numUnits) : 0;

  // Operating info
  const leaseUpPct = 100;
  const [operationStartYear, setOperationStartYear] = useState(2027);
  const leaseTerm = 12;
  const [academicStart, setAcademicStart] = useState('August');

  // Bed mix
  const [rows, setRows] = useState([
    { id: 1, unitType: '2-Bed / 2-Bath', units: 80, bedsPerUnit: 2, rentPerBed: 850 },
    { id: 2, unitType: '4-Bed / 4-Bath', units: 60, bedsPerUnit: 4, rentPerBed: 725 },
  ]);

  // Operating info – additional fields matching platform
  const [rentGrowth, setRentGrowth] = useState(3.0);
  const [freeRent, setFreeRent] = useState(0);
  const [stabilizedFreeRent, setStabilizedFreeRent] = useState(0);

  // Income adjustments
  const [incomeAdjustments, setIncomeAdjustments] = useState([
    { id: 1, name: 'Vacancy', pct: 6, from: 'totalPotentialIncome' },
    { id: 2, name: 'Credit loss', pct: 1, from: 'totalPotentialIncome' },
  ]);
  const addIncomeAdj = () => {
    const nextId = incomeAdjustments.length > 0 ? Math.max(...incomeAdjustments.map(a => a.id)) + 1 : 1;
    setIncomeAdjustments([...incomeAdjustments, { id: nextId, name: '', pct: 0, from: 'totalPotentialIncome' }]);
  };
  const removeIncomeAdj = (id) => setIncomeAdjustments(incomeAdjustments.filter(a => a.id !== id));
  const updateIncomeAdj = (id, field, value) =>
    setIncomeAdjustments(incomeAdjustments.map(a => a.id === id ? { ...a, [field]: value } : a));

  // Gross income adjustments

  // Other income
  const [concessionsPct, setConcessionsPct] = useState(2);
  const [parking, setParking] = useState(48000);
  const [rubs, setRubs] = useState(24000);
  const [furniturePremium, setFurniturePremium] = useState(25);
  const [otherIncome, setOtherIncome] = useState(12000);

  // Calculations
  const calcs = useMemo(() => {
    const totalUnits = rows.reduce((s, r) => s + r.units, 0);
    const totalBeds = rows.reduce((s, r) => s + r.units * r.bedsPerUnit, 0);
    const weightedRent = totalBeds > 0
      ? rows.reduce((s, r) => s + r.units * r.bedsPerUnit * r.rentPerBed, 0) / totalBeds
      : 0;
    const grossPotentialRent = totalBeds * (leaseUpPct / 100) * weightedRent * 12;
    const concessions = grossPotentialRent * (concessionsPct / 100);
    const furnitureAnnual = totalBeds * furniturePremium * 12;
    const totalOther = parking + rubs + furnitureAnnual + otherIncome;
    const totalPotentialIncome = grossPotentialRent - concessions + totalOther;
    return {
      totalUnits, totalBeds, weightedRent,
      grossPotentialRent, concessions,
      furnitureAnnual, totalOther,
      totalPotentialIncome,
    };
  }, [rows, concessionsPct, parking, rubs, furniturePremium, otherIncome]);

  // Expenses
  const [expDisplayMode, setExpDisplayMode] = useState('perBed');

  const expenses = useMemo(() => {
    const beds = calcs.totalBeds || 1;
    return [
      { name: 'Property taxes', growth: '3.0%', amount: beds * 1200, millRate: '2.0%' },
      { name: 'Property insurance', growth: '3.0%', amount: beds * 450 },
      { name: 'Property management fee', growth: '3.0%', amount: Math.round(calcs.totalPotentialIncome * 0.04) },
      { name: 'Utilities', growth: '3.0%', amount: beds * 1100 },
      { name: 'Repairs & maintenance', growth: '3.0%', amount: beds * 500 },
      { name: 'General & administrative', growth: '3.0%', amount: beds * 350 },
      { name: 'Marketing & leasing', growth: '3.0%', amount: beds * 400 },
      { name: 'Turnover & make-ready', growth: '3.0%', amount: beds * 600 },
      { name: 'Furniture replacement reserve', growth: '3.0%', amount: beds * 200, conditional: true },
    ];
  }, [calcs.totalBeds, calcs.totalPotentialIncome]);

  const capex = useMemo(() => {
    const beds = calcs.totalBeds || 1;
    return [{ name: 'Capital reserves', growth: '3.0%', amount: beds * 300 }];
  }, [calcs.totalBeds]);

  const totalOpEx = useMemo(() =>
    expenses.filter(e => e.conditional ? furniturePremium > 0 : true)
      .reduce((s, e) => s + e.amount, 0),
    [expenses, furniturePremium]);

  const totalCapEx = useMemo(() => capex.reduce((s, e) => s + e.amount, 0), [capex]);

  const totalIncomeAdjustments = useMemo(() =>
    incomeAdjustments.reduce((sum, adj) => {
      const base = adj.from === 'grossPotentialRent'
        ? calcs.grossPotentialRent : calcs.totalPotentialIncome;
      return sum + base * (adj.pct / 100);
    }, 0),
    [incomeAdjustments, calcs.grossPotentialRent, calcs.totalPotentialIncome]);

  const effectiveGrossIncome = calcs.totalPotentialIncome - totalIncomeAdjustments;
  const noi = effectiveGrossIncome - totalOpEx;

  const expSecondaryLabel = expDisplayMode === 'perBed' ? '$/Bed/year'
    : expDisplayMode === 'perSF' ? '$/SF/year' : '% of EGI';

  const expSecondaryVal = (amount) => {
    if (expDisplayMode === 'pctEGI') {
      return effectiveGrossIncome > 0
        ? (amount / effectiveGrossIncome * 100).toFixed(2) + '%' : '0.00%';
    }
    const divisor = expDisplayMode === 'perBed' ? (calcs.totalBeds || 1) : (netRentableSF || 1);
    return fmtD(amount / divisor);
  };

  const metricLabel = displayMode === 'perBed' ? '/bed' : displayMode === 'perUnit' ? '/unit' : '/SF';
  const metricDivisor = displayMode === 'perBed' ? calcs.totalBeds
    : displayMode === 'perUnit' ? calcs.totalUnits : netRentableSF;
  const perMetric = (val) => metricDivisor > 0 ? fmtD(val / metricDivisor) : '$0';

  const addRow = () => {
    const nextId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
    setRows([...rows, { id: nextId, unitType: '', units: 0, bedsPerUnit: 1, rentPerBed: 0 }]);
  };
  const removeRow = (id) => { if (rows.length > 1) setRows(rows.filter(r => r.id !== id)); };
  const updateRow = (id, field, value) => setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));

  const monthNames = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];

  const leaseUpSchedule = useMemo(() => {
    const startIdx = monthNames.indexOf(academicStart);
    const monthlyAbsorption = leaseUpPct > 60 ? ((leaseUpPct - 60) / 6) : 3;
    return Array.from({ length: 7 }, (_, i) => {
      const mIdx = (startIdx - 6 + i + 12) % 12;
      const monthNum = 49 + i;
      const pct = Math.min(60 + monthlyAbsorption * i, leaseUpPct);
      return {
        month: monthNames[mIdx].substring(0, 3).toUpperCase(),
        year: monthNum <= 52 ? 2030 : 2031,
        monthNum,
        pct: pct.toFixed(2),
      };
    });
  }, [academicStart, leaseUpPct, monthNames]);

  const tabs = [
    { id: 'general', letter: 'A', label: 'General Information' },
    { id: 'development', letter: 'B', label: 'Development' },
    { id: 'operations', letter: 'C', label: 'Operations' },
    { id: 'disposition', letter: 'D', label: 'Disposition' },
  ];

  const topNavLinks = ['Deal Dashboard', 'Pro Forma', 'Investment Memo', 'Documents', 'Report Builder'];
  const sidebarLinks = ['Pro Forma', 'Returns & Waterfall Analysis', 'Sensitivity', 'Executive Summary'];

  return (
    <div className="sh-page-bg">

      {/* ══════════════════════════════════════════
          Top Navigation Bar
          ══════════════════════════════════════════ */}
      <div className="sh-topnav">
        <div className="sh-topnav-logo">
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path d="M14 3L3 9l11 6 11-6-11-6zM3 19l11 6 11-6M3 14l11 6 11-6" stroke="#0fb3ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className="sh-topnav-links">
          {topNavLinks.map((link) => (
            <span key={link} className={`sh-topnav-link${link === 'Pro Forma' ? ' active' : ''}`}>
              {link}
            </span>
          ))}
        </div>
        <div className="sh-topnav-right">
          <button className="sh-topnav-assess-btn">Assess feasibility</button>
          <div className="sh-topnav-avatar">EW</div>
        </div>
      </div>

      <div className="sh-main-layout">

        {/* ══════════════════════════════════════════
            Left Sidebar
            ══════════════════════════════════════════ */}
        <div className="sh-sidebar">
          <button className="sh-sidebar-exit">← Exit</button>
          <div className="sh-sidebar-deal-name">{dealName}</div>
          <div className="sh-sidebar-subtitle">Edit name/description</div>
          <div className="sh-sidebar-nav">
            {sidebarLinks.map((link) => (
              <div key={link} className={`sh-sidebar-link${link === 'Pro Forma' ? ' active' : ''}`}>
                {link}
              </div>
            ))}
          </div>
          <div className="sh-sidebar-kpis">
            <div className="sh-kpi-card">
              <div className="sh-kpi-label">Levered IRR</div>
              <div className="sh-kpi-value negative">-100.00%</div>
            </div>
            <div className="sh-kpi-card">
              <div className="sh-kpi-label">Levered EMx</div>
              <div className="sh-kpi-value">0.00x</div>
            </div>
            <div className="sh-kpi-card">
              <div className="sh-kpi-label">Stab. yield-on-cost</div>
              <div className="sh-kpi-value">0.00%</div>
            </div>
            <div className="sh-kpi-card">
              <div className="sh-kpi-label">Equity proceeds</div>
              <div className="sh-kpi-value negative">-$4,766,043</div>
            </div>
          </div>
        </div>

        {/* ══════════════════════════════════════════
            Main Content Area
            ══════════════════════════════════════════ */}
        <div className="sh-content-area">

          {/* Tab Bar */}
          <div className="sh-tab-bar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`sh-tab ${activeTab === tab.id ? 'sh-tab-active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="sh-tab-letter">{tab.letter}</span>
                <span className="sh-tab-label">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* ════════════════════════════════════════
              Tab A: General Information
              ════════════════════════════════════════ */}
          {activeTab === 'general' && (
            <>
              {/* Section 1: Basic Details */}
              <div className="sh-section" style={{ marginBottom: 32 }}>
                <div className="sh-section-num">1</div>
                <div className="sh-section-card">
                  <div className="sh-section-header">
                    <div>
                      <h4 className="sh-section-title">Basic Details</h4>
                      <p className="sh-section-subtitle">Information about this investment's name and location</p>
                    </div>
                    <div className="sh-header-right">
                      <div className="sh-caret" role="button" tabIndex={0}>
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                          <path d="M1 7L7 1L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="sh-gi-two-col">
                    <div className="sh-gi-form">
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">Deal name</span>
                        <input className="sh-gi-input" value={dealName} onChange={(e) => setDealName(e.target.value)} />
                      </div>
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">Address</span>
                        <input className="sh-gi-input" value={address} onChange={(e) => setAddress(e.target.value)} />
                      </div>
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">City</span>
                        <input className="sh-gi-input" value={city} onChange={(e) => setCity(e.target.value)} />
                      </div>
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">County</span>
                        <input className="sh-gi-input" value={county} onChange={(e) => setCounty(e.target.value)} />
                      </div>
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">State</span>
                        <select className="sh-gi-input sh-gi-select" value={giState} onChange={(e) => setGiState(e.target.value)}>
                          <option>Texas</option><option>New York</option><option>California</option>
                          <option>Florida</option><option>Georgia</option><option>North Carolina</option>
                        </select>
                      </div>
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">Zip</span>
                        <input className="sh-gi-input" value={zip} onChange={(e) => setZip(e.target.value)} />
                      </div>
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">Associated university</span>
                        <input className="sh-gi-input" value={university} onChange={(e) => setUniversity(e.target.value)} placeholder="e.g. University of Texas at Austin" />
                      </div>
                    </div>
                    <div className="sh-gi-map">
                      <div className="sh-gi-map-placeholder">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4a5060" strokeWidth="1.5">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
                          <circle cx="12" cy="9" r="2.5"/>
                        </svg>
                        <span>Map</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 2: Key Dates */}
              <div className="sh-section" style={{ marginBottom: 32 }}>
                <div className="sh-section-num">2</div>
                <div className="sh-section-card">
                  <div className="sh-section-header">
                    <div>
                      <h4 className="sh-section-title">Key Dates</h4>
                      <p className="sh-section-subtitle">Determine key dates and durations for this pro forma</p>
                    </div>
                    <div className="sh-header-right">
                      <div className="sh-caret" role="button" tabIndex={0}>
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                          <path d="M1 7L7 1L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="sh-gi-two-col">
                    <div className="sh-gi-form">
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">Start month</span>
                        <div className="sh-gi-input sh-gi-date-field">
                          <span>{startMonth}</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6c7280" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                        </div>
                      </div>
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">Construction start</span>
                        <div className="sh-gi-input sh-gi-date-field">
                          <span>{constructionStart}</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6c7280" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                        </div>
                      </div>
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">Construction duration</span>
                        <div className="sh-stepper sh-stepper-wide">
                          <button className="sh-stepper-btn" onClick={() => setConstructionDuration(Math.max(1, constructionDuration - 1))}>&#8722;</button>
                          <span className="sh-stepper-value">{constructionDuration} months</span>
                          <button className="sh-stepper-btn" onClick={() => setConstructionDuration(constructionDuration + 1)}>+</button>
                        </div>
                      </div>
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">Hold period</span>
                        <div className="sh-stepper sh-stepper-wide">
                          <button className="sh-stepper-btn" onClick={() => setHoldPeriod(Math.max(1, holdPeriod - 1))}>&#8722;</button>
                          <span className="sh-stepper-value">{holdPeriod} months</span>
                          <button className="sh-stepper-btn" onClick={() => setHoldPeriod(holdPeriod + 1)}>+</button>
                        </div>
                      </div>
                    </div>
                    <div className="sh-gi-computed-col">
                      <div className="sh-opinfo-infobox">
                        <span className="sh-opinfo-infobox-label">Sale month</span>
                        <span className="sh-opinfo-infobox-value">July 2034 (Month {holdPeriod})</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Size */}
              <div className="sh-section" style={{ marginBottom: 32 }}>
                <div className="sh-section-num">3</div>
                <div className="sh-section-card">
                  <div className="sh-section-header">
                    <div>
                      <h4 className="sh-section-title">Size</h4>
                      <p className="sh-section-subtitle">Details about this investment's property size and building</p>
                    </div>
                    <div className="sh-header-right">
                      <div className="sh-caret" role="button" tabIndex={0}>
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                          <path d="M1 7L7 1L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="sh-gi-two-col">
                    <div className="sh-gi-form">
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">Built gross SF</span>
                        <div className="sh-gi-input-with-unit">
                          <input className="sh-gi-input" type="number" value={builtGrossSF} onChange={(e) => setBuiltGrossSF(Number(e.target.value))} />
                          <span className="sh-gi-unit">ft&sup2;</span>
                        </div>
                      </div>
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">Efficiency ratio</span>
                        <div className="sh-gi-input-with-unit">
                          <input className="sh-gi-input" type="number" value={efficiencyRatio} onChange={(e) => setEfficiencyRatio(Number(e.target.value))} step="0.01" />
                          <span className="sh-gi-unit">%</span>
                        </div>
                      </div>
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">Est. no. of units</span>
                        <input className="sh-gi-input" type="number" value={numUnits} onChange={(e) => setNumUnits(Number(e.target.value))} />
                      </div>
                      <div className="sh-gi-row" style={{ paddingLeft: 146 }}>
                        <span className="sh-gi-sub-text">SF per unit: <strong>{fmt(sfPerUnit)}</strong></span>
                      </div>
                      <div className="sh-gi-row" style={{ paddingLeft: 146 }}>
                        <span className="sh-gi-sub-text">Total beds (from bed mix): <strong>{fmt(calcs.totalBeds)}</strong></span>
                      </div>
                      <div className="sh-gi-divider"></div>
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">Parking</span>
                        <div className="sh-gi-input sh-gi-tag-field">
                          <span className="sh-gi-tag">Surface <span className="sh-gi-tag-x">&times;</span></span>
                        </div>
                      </div>
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">Surface spaces</span>
                        <div className="sh-stepper sh-stepper-wide">
                          <button className="sh-stepper-btn" onClick={() => setParkingSpaces(Math.max(0, parkingSpaces - 1))}>&#8722;</button>
                          <span className="sh-stepper-value">{parkingSpaces}</span>
                          <button className="sh-stepper-btn" onClick={() => setParkingSpaces(parkingSpaces + 1)}>+</button>
                        </div>
                      </div>
                      <div className="sh-gi-divider"></div>
                      <h5 className="sh-gi-subsection-title">Optional fields</h5>
                      <p className="sh-gi-subsection-subtitle">These fields are informational - they do not impact calculations.</p>
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">Buildings</span>
                        <div className="sh-stepper">
                          <button className="sh-stepper-btn" onClick={() => setBuildings(Math.max(1, buildings - 1))}>&#8722;</button>
                          <span className="sh-stepper-value">{buildings}</span>
                          <button className="sh-stepper-btn" onClick={() => setBuildings(buildings + 1)}>+</button>
                        </div>
                      </div>
                      <div className="sh-gi-row">
                        <span className="sh-gi-label">Stories</span>
                        <div className="sh-stepper">
                          <button className="sh-stepper-btn" onClick={() => setStories(Math.max(1, stories - 1))}>&#8722;</button>
                          <span className="sh-stepper-value">{stories}</span>
                          <button className="sh-stepper-btn" onClick={() => setStories(stories + 1)}>+</button>
                        </div>
                      </div>
                      <div className="sh-gi-row" style={{ paddingLeft: 146 }}>
                        <span className="sh-gi-sub-text">SF per floor: <strong>{fmt(Math.round(builtGrossSF / (stories || 1)))}</strong></span>
                      </div>
                    </div>
                    <div className="sh-gi-computed-col">
                      <div className="sh-gi-stat-grid">
                        <div className="sh-opinfo-infobox">
                          <span className="sh-opinfo-infobox-label">Net rentable area</span>
                          <span className="sh-opinfo-infobox-value">{fmt(netRentableSF)}</span>
                        </div>
                        <div className="sh-opinfo-infobox">
                          <span className="sh-opinfo-infobox-label">Beds/acre</span>
                          <span className="sh-opinfo-infobox-value" style={{ fontStyle: 'italic', color: '#6c7280' }}>—</span>
                        </div>
                        <div className="sh-opinfo-infobox">
                          <span className="sh-opinfo-infobox-label">Total parking spots</span>
                          <span className="sh-opinfo-infobox-value">{parkingSpaces}</span>
                        </div>
                        <div className="sh-opinfo-infobox">
                          <span className="sh-opinfo-infobox-label">Parking ratio</span>
                          <span className="sh-opinfo-infobox-value">{numUnits > 0 ? (parkingSpaces / numUnits).toFixed(2) : '0.00'} / unit</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* ════════════════════════════════════════
              Tab B: Development (placeholder)
              ════════════════════════════════════════ */}
          {activeTab === 'development' && (
            <div className="sh-section">
              <div className="sh-section-num"></div>
              <div className="sh-section-card">
                <div className="sh-tab-placeholder">
                  <span className="sh-tab-placeholder-text">Development tab coming soon</span>
                </div>
              </div>
            </div>
          )}

          {/* ════════════════════════════════════════
              Tab C: Operations
              ════════════════════════════════════════ */}
          {activeTab === 'operations' && (
            <>

              {/* Section 1: Operating Information */}
              <div className="sh-section" style={{ marginBottom: 32 }}>
                <div className="sh-section-num">1</div>
                <div className="sh-section-card">
                  <div className="sh-section-header">
                    <div>
                      <h4 className="sh-section-title">Operating Information</h4>
                      <p className="sh-section-subtitle">Information about this investment's incoming revenue</p>
                    </div>
                    <div className="sh-header-right">
                      <div className="sh-caret" role="button" tabIndex={0}>
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                          <path d="M1 7L7 1L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="sh-opinfo-layout">
                    <div className="sh-opinfo-fields">
                      <div className="sh-opinfo-row">
                        <span className="sh-opinfo-label">Rent growth (annual)</span>
                        <div className="sh-stepper">
                          <button className="sh-stepper-btn" onClick={() => setRentGrowth(Math.max(0, +(rentGrowth - 0.25).toFixed(2)))}>&#8722;</button>
                          <span className="sh-stepper-value">{rentGrowth.toFixed(2)}%</span>
                          <button className="sh-stepper-btn" onClick={() => setRentGrowth(+(rentGrowth + 0.25).toFixed(2))}>+</button>
                        </div>
                      </div>
                      <div className="sh-opinfo-row">
                        <span className="sh-opinfo-label">Academic year start</span>
                        <select className="sh-opinfo-select" value={academicStart} onChange={(e) => setAcademicStart(e.target.value)}>
                          <option value="August">August</option>
                          <option value="September">September</option>
                        </select>
                      </div>
                      <div className="sh-opinfo-row">
                        <span className="sh-opinfo-label">Operation start</span>
                        <select className="sh-opinfo-select" value={operationStartYear} onChange={(e) => setOperationStartYear(Number(e.target.value))}>
                          {[2027, 2028, 2029, 2030, 2031].map((yr) => (
                            <option key={yr} value={yr}>{academicStart} {yr}</option>
                          ))}
                        </select>
                      </div>
                      <div className="sh-opinfo-row">
                        <span className="sh-opinfo-label">Initial free rent</span>
                        <div className="sh-stepper">
                          <button className="sh-stepper-btn" onClick={() => setFreeRent(Math.max(0, freeRent - 1))}>&#8722;</button>
                          <span className="sh-stepper-value">{freeRent} months</span>
                          <button className="sh-stepper-btn" onClick={() => setFreeRent(freeRent + 1)}>+</button>
                        </div>
                      </div>
                      <div className="sh-opinfo-row">
                        <span className="sh-opinfo-label">Stabilized free rent</span>
                        <div className="sh-stepper">
                          <button className="sh-stepper-btn" onClick={() => setStabilizedFreeRent(Math.max(0, stabilizedFreeRent - 1))}>&#8722;</button>
                          <span className="sh-stepper-value">{stabilizedFreeRent} months</span>
                          <button className="sh-stepper-btn" onClick={() => setStabilizedFreeRent(stabilizedFreeRent + 1)}>+</button>
                        </div>
                      </div>
                    </div>
                    <div className="sh-opinfo-computed">
                      <div className="sh-opinfo-infobox-row">
                        <div className="sh-opinfo-infobox">
                          <span className="sh-opinfo-infobox-label">1st stabilized month</span>
                          <span className="sh-opinfo-infobox-value">{academicStart.substring(0,3)} {operationStartYear + 1} (Month 13)</span>
                        </div>
                        <div className="sh-opinfo-infobox">
                          <span className="sh-opinfo-infobox-label">Lease term</span>
                          <span className="sh-opinfo-infobox-value">12 months</span>
                        </div>
                      </div>
                      <div className="sh-opinfo-monthly">
                        <table className="sh-table sh-monthly-table">
                          <thead>
                            <tr className="sh-cat-header">
                              <th className="sh-th-label" style={{ fontWeight: 700, color: '#fff' }}>Monthly<br/>analysis</th>
                              {leaseUpSchedule.map((m, i) => (
                                <th key={i} className="sh-th-metric" style={{ fontSize: 11, lineHeight: '1.3' }}>
                                  <div style={{ color: '#6c7280', textTransform: 'uppercase', letterSpacing: '0.3px', fontWeight: 700 }}>Month {m.monthNum}</div>
                                  <div style={{ color: '#fff', fontWeight: 600 }}>{m.month} {m.year}</div>
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="sh-row">
                              <td className="sh-td-label" style={{ fontWeight: 500 }}>Leased %</td>
                              {leaseUpSchedule.map((m, i) => (
                                <td key={i} className="sh-td-metric">{m.pct}%</td>
                              ))}
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Section 2: Income ─────────────── */}
              <div className="sh-section">
                <div className="sh-section-num">2</div>
                <div className="sh-section-card">
                  <div className="sh-section-header">
                    <div>
                      <h4 className="sh-section-title">Income</h4>
                      <p className="sh-section-subtitle">Student housing revenue by bed with seasonal adjustments</p>
                    </div>
                    <div className="sh-header-right">
                      <div className="sh-display-toggle">
                        <button className={`sh-toggle-btn ${displayMode === 'perBed' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setDisplayMode('perBed'); }}>Per Bed</button>
                        <button className={`sh-toggle-btn ${displayMode === 'perUnit' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setDisplayMode('perUnit'); }}>Per Unit</button>
                        <button className={`sh-toggle-btn ${displayMode === 'perSF' ? 'active' : ''}`} onClick={(e) => { e.stopPropagation(); setDisplayMode('perSF'); }}>Per SF</button>
                      </div>
                      <div className={`sh-caret ${collapsed ? 'sh-caret-down' : ''}`} onClick={() => setCollapsed(!collapsed)} role="button" tabIndex={0}>
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                          <path d="M1 7L7 1L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>

                  {!collapsed && (
                    <div className="sh-body">

                      {/* Bed Mix Table */}
                      <div className="sh-table-wrap">
                        <table className="sh-table">
                          <thead>
                            <tr className="sh-cat-header">
                              <th className="sh-th-label" style={{ minWidth: 180 }}>
                                Unit Type <span className="sh-th-plus" onClick={addRow}>+</span>
                              </th>
                              <th className="sh-th-metric"># of Units</th>
                              <th className="sh-th-metric">Beds / Unit</th>
                              <th className="sh-th-metric">Total Beds</th>
                              <th className="sh-th-metric">Rent/Bed (Mo.)</th>
                              <th className="sh-th-metric">{`$${metricLabel}/yr`}</th>
                              <th className="sh-th-metric">Amount/year</th>
                              <MonthHeaders />
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((r) => {
                              const totalBeds = r.units * r.bedsPerUnit;
                              const rowAnnual = totalBeds * (leaseUpPct / 100) * r.rentPerBed * leaseTerm;
                              const rowPerMetric = metricDivisor > 0
                                ? (displayMode === 'perBed' ? rowAnnual / (totalBeds || 1)
                                  : displayMode === 'perUnit' ? rowAnnual / (r.units || 1)
                                  : rowAnnual / (totalBeds * 400 || 1)) : 0;
                              return (
                                <tr key={r.id} className="sh-row">
                                  <td className="sh-td-label">
                                    <input className="sh-cell-input sh-cell-input-left" value={r.unitType}
                                      onChange={(e) => updateRow(r.id, 'unitType', e.target.value)}
                                      style={{ color: '#0fb3ff', minWidth: 140 }} />
                                    <span className="sh-trash" onClick={() => removeRow(r.id)} style={{ marginLeft: 8, fontSize: 11 }}>✕</span>
                                  </td>
                                  <td className="sh-td-metric">
                                    <input type="number" className="sh-cell-input" value={r.units} onChange={(e) => updateRow(r.id, 'units', Number(e.target.value))} min={0} />
                                  </td>
                                  <td className="sh-td-metric">
                                    <input type="number" className="sh-cell-input" value={r.bedsPerUnit} onChange={(e) => updateRow(r.id, 'bedsPerUnit', Number(e.target.value))} min={1} />
                                  </td>
                                  <td className="sh-td-metric" style={{ color: '#ffffff' }}>{fmt(totalBeds)}</td>
                                  <td className="sh-td-metric">
                                    <input type="number" className="sh-cell-input" value={r.rentPerBed} onChange={(e) => updateRow(r.id, 'rentPerBed', Number(e.target.value))} min={0} />
                                  </td>
                                  <td className="sh-td-metric" style={{ color: '#ffffff' }}>{fmtD(rowPerMetric)}</td>
                                  <td className="sh-td-metric" style={{ color: '#ffffff' }}>{fmtD(rowAnnual)}</td>
                                  <MonthCells />
                                </tr>
                              );
                            })}
                            <tr className="sh-row sh-row-total">
                              <td className="sh-td-label sh-td-bold">Total bed mix income</td>
                              <td className="sh-td-metric sh-td-bold">{fmt(calcs.totalUnits)}</td>
                              <td className="sh-td-metric sh-td-bold"></td>
                              <td className="sh-td-metric sh-td-bold">{fmt(calcs.totalBeds)}</td>
                              <td className="sh-td-metric sh-td-bold"></td>
                              <td className="sh-td-metric sh-td-bold">{perMetric(calcs.grossPotentialRent)}</td>
                              <td className="sh-td-metric sh-td-bold">{fmtD(calcs.grossPotentialRent)}</td>
                              <MonthCells />
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Gross Potential Rent */}
                      <div className="sh-table-wrap">
                        <table className="sh-table">
                          <tbody>
                            <tr className="sh-row sh-row-grand-total">
                              <td className="sh-td-label-wide sh-td-bold">Gross potential rent</td>
                              <td className="sh-td-metric"></td>
                              <td className="sh-td-metric sh-td-bold">{perMetric(calcs.grossPotentialRent)}</td>
                              <td className="sh-td-metric sh-td-bold">{fmtD(calcs.grossPotentialRent)}</td>
                              <MonthCells />
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Gross Income Adjustments */}
                      <div className="sh-table-wrap" style={{ marginTop: 16 }}>
                        <table className="sh-table">
                          <thead>
                            <tr className="sh-cat-header">
                              <th className="sh-th-label-wide">Gross income adjustments</th>
                              <th className="sh-th-metric">% of Revenue</th>
                              <th className="sh-th-metric">{`$${metricLabel}/yr`}</th>
                              <th className="sh-th-metric">Amount/year</th>
                              <MonthHeaders />
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="sh-row">
                              <td className="sh-td-label-wide sh-val-blue sh-link">Concessions</td>
                              <td className="sh-td-metric">
                                <input type="number" className="sh-cell-input" value={concessionsPct} onChange={(e) => setConcessionsPct(Number(e.target.value))} min={0} max={100} style={{ width: 60 }} />
                              </td>
                              <td className="sh-td-metric sh-val-negative">{calcs.concessions > 0 ? fmtNeg(calcs.concessions / (metricDivisor || 1)) : '$0'}</td>
                              <td className="sh-td-metric sh-val-negative">{calcs.concessions > 0 ? fmtNeg(calcs.concessions) : '$0'}</td>
                              <MonthCells />
                            </tr>
                            <tr className="sh-row sh-row-total">
                              <td className="sh-td-label-wide sh-td-bold">Total adjustments</td>
                              <td className="sh-td-metric sh-td-bold"></td>
                              <td className="sh-td-metric sh-td-bold sh-val-negative">{fmtNeg(calcs.concessions / (metricDivisor || 1))}</td>
                              <td className="sh-td-metric sh-td-bold sh-val-negative">{fmtNeg(calcs.concessions)}</td>
                              <MonthCells />
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Other Income */}
                      <div className="sh-table-wrap" style={{ marginTop: 16 }}>
                        <table className="sh-table">
                          <thead>
                            <tr className="sh-cat-header">
                              <th className="sh-th-label-wide">Other income <span className="sh-th-plus">+</span></th>
                              <th className="sh-th-metric">{`$${metricLabel}/yr`}</th>
                              <th className="sh-th-metric">Amount/year</th>
                              <MonthHeaders />
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="sh-row">
                              <td className="sh-td-label-wide sh-val-blue sh-link">Parking</td>
                              <td className="sh-td-metric">{perMetric(parking)}</td>
                              <td className="sh-td-metric"><input type="number" className="sh-cell-input" value={parking} onChange={(e) => setParking(Number(e.target.value))} min={0} /></td>
                              <MonthCells />
                            </tr>
                            <tr className="sh-row">
                              <td className="sh-td-label-wide sh-val-blue sh-link">RUBS / Utility reimbursements</td>
                              <td className="sh-td-metric">{perMetric(rubs)}</td>
                              <td className="sh-td-metric"><input type="number" className="sh-cell-input" value={rubs} onChange={(e) => setRubs(Number(e.target.value))} min={0} /></td>
                              <MonthCells />
                            </tr>
                            <tr className="sh-row">
                              <td className="sh-td-label-wide sh-val-blue sh-link">Furniture premium</td>
                              <td className="sh-td-metric">{perMetric(calcs.furnitureAnnual)}</td>
                              <td className="sh-td-metric">
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6 }}>
                                  <input type="number" className="sh-cell-input" value={furniturePremium} onChange={(e) => setFurniturePremium(Number(e.target.value))} min={0} style={{ width: 60 }} />
                                  <span style={{ color: '#6c7280', fontSize: 11 }}>/bed/mo</span>
                                </div>
                              </td>
                              <MonthCells />
                            </tr>
                            <tr className="sh-row">
                              <td className="sh-td-label-wide sh-val-blue sh-link">Other</td>
                              <td className="sh-td-metric">{perMetric(otherIncome)}</td>
                              <td className="sh-td-metric"><input type="number" className="sh-cell-input" value={otherIncome} onChange={(e) => setOtherIncome(Number(e.target.value))} min={0} /></td>
                              <MonthCells />
                            </tr>
                            <tr className="sh-row sh-row-total">
                              <td className="sh-td-label-wide sh-td-bold">Total other income</td>
                              <td className="sh-td-metric sh-td-bold">{perMetric(calcs.totalOther)}</td>
                              <td className="sh-td-metric sh-td-bold">{fmtD(calcs.totalOther)}</td>
                              <MonthCells />
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Total Potential Income */}
                      <div className="sh-table-wrap">
                        <table className="sh-table">
                          <tbody>
                            <tr className="sh-row sh-row-grand-total">
                              <td className="sh-td-label-wide sh-td-bold">Total potential income</td>
                              <td className="sh-td-metric"></td>
                              <td className="sh-td-metric sh-td-bold">{perMetric(calcs.totalPotentialIncome)}</td>
                              <td className="sh-td-metric sh-td-bold">{fmtD(calcs.totalPotentialIncome)}</td>
                              <MonthCells />
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Income Adjustments */}
                      <div className="sh-table-wrap" style={{ marginTop: 16 }}>
                        <table className="sh-table">
                          <thead>
                            <tr className="sh-cat-header">
                              <th className="sh-th-label-wide">
                                Income adjustments <span className="sh-th-plus" onClick={addIncomeAdj}>+</span>
                              </th>
                              <th className="sh-th-metric">% of income</th>
                              <th className="sh-th-metric">{`$${metricLabel}/yr`}</th>
                              <th className="sh-th-metric">Amount/year</th>
                              <MonthHeaders />
                            </tr>
                          </thead>
                          <tbody>
                            {incomeAdjustments.map((adj) => {
                              const base = adj.from === 'grossPotentialRent'
                                ? calcs.grossPotentialRent : calcs.totalPotentialIncome;
                              const amount = base * (adj.pct / 100);
                              return (
                                <tr key={adj.id} className="sh-row">
                                  <td className="sh-td-label-wide">
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                      <input
                                        className="sh-cell-input sh-cell-input-left"
                                        value={adj.name}
                                        onChange={(e) => updateIncomeAdj(adj.id, 'name', e.target.value)}
                                        style={{ color: '#ffffff', minWidth: 120 }}
                                      />
                                      <span className="sh-trash" onClick={() => removeIncomeAdj(adj.id)} style={{ fontSize: 11 }}>✕</span>
                                    </div>
                                    <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                                      <span style={{ color: '#6c7280', fontSize: 11 }}>From:</span>
                                      <select
                                        className="sh-adj-from-select"
                                        value={adj.from}
                                        onChange={(e) => updateIncomeAdj(adj.id, 'from', e.target.value)}
                                      >
                                        <option value="totalPotentialIncome">Total potential income</option>
                                        <option value="grossPotentialRent">Gross potential rent</option>
                                      </select>
                                    </div>
                                  </td>
                                  <td className="sh-td-metric">
                                    <input
                                      type="number"
                                      className="sh-cell-input"
                                      value={adj.pct}
                                      onChange={(e) => updateIncomeAdj(adj.id, 'pct', Number(e.target.value))}
                                      min={0} max={100}
                                      style={{ width: 60 }}
                                    />
                                    <span style={{ color: '#6c7280', fontSize: 11, marginLeft: 2 }}>%</span>
                                  </td>
                                  <td className="sh-td-metric sh-val-negative">{amount > 0 ? fmtNeg(amount / (metricDivisor || 1)) : '$0'}</td>
                                  <td className="sh-td-metric sh-val-negative">{amount > 0 ? fmtNeg(amount) : '$0'}</td>
                                  <MonthCells />
                                </tr>
                              );
                            })}
                            <tr className="sh-row sh-row-total">
                              <td className="sh-td-label-wide sh-td-bold">Total adjustments</td>
                              <td className="sh-td-metric sh-td-bold"></td>
                              <td className="sh-td-metric sh-td-bold sh-val-negative">{fmtNeg(totalIncomeAdjustments / (metricDivisor || 1))}</td>
                              <td className="sh-td-metric sh-td-bold sh-val-negative">{fmtNeg(totalIncomeAdjustments)}</td>
                              <MonthCells />
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Effective Gross Income */}
                      <div className="sh-table-wrap" style={{ marginTop: 16 }}>
                        <table className="sh-table">
                          <tbody>
                            <tr className="sh-row sh-row-grand-total">
                              <td className="sh-td-label-wide sh-td-bold">Effective gross revenue</td>
                              <td className="sh-td-metric"></td>
                              <td className="sh-td-metric sh-td-bold">{perMetric(effectiveGrossIncome)}</td>
                              <td className="sh-td-metric sh-td-bold">{fmtD(effectiveGrossIncome)}</td>
                              <MonthCells />
                            </tr>
                          </tbody>
                        </table>
                      </div>

                    </div>
                  )}
                </div>
              </div>

              {/* ── Section 3: Expenses ───────────── */}
              <div className="sh-section" style={{ marginTop: 32 }}>
                <div className="sh-section-num">3</div>
                <div className="sh-section-card">
                  <div className="sh-section-header">
                    <div>
                      <h4 className="sh-section-title">Expenses</h4>
                      <p className="sh-section-subtitle">Operating expenses and capital expenditures per bed</p>
                    </div>
                    <div className="sh-header-right">
                      <div className="sh-display-toggle">
                        <button className={`sh-toggle-btn ${expDisplayMode === 'perBed' ? 'active' : ''}`} onClick={() => setExpDisplayMode('perBed')}>Per Bed</button>
                        <button className={`sh-toggle-btn ${expDisplayMode === 'perSF' ? 'active' : ''}`} onClick={() => setExpDisplayMode('perSF')}>Per SF</button>
                        <button className={`sh-toggle-btn ${expDisplayMode === 'pctEGI' ? 'active' : ''}`} onClick={() => setExpDisplayMode('pctEGI')}>% of EGI</button>
                      </div>
                      <div className="sh-caret" role="button" tabIndex={0}>
                        <svg width="14" height="8" viewBox="0 0 14 8" fill="none">
                          <path d="M1 7L7 1L13 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="sh-body">
                    <div className="sh-table-wrap">
                      <table className="sh-table">
                        <thead>
                          <tr className="sh-cat-header">
                            <th className="sh-th-label-wide">Operating expenses <span className="sh-th-plus">+</span></th>
                            <th className="sh-th-metric">Annual growth</th>
                            <th className="sh-th-metric">{expSecondaryLabel}</th>
                            <th className="sh-th-metric">Amount/year</th>
                            <MonthHeaders />
                          </tr>
                        </thead>
                        <tbody>
                          {expenses.map((exp, i) => {
                            const show = exp.conditional ? furniturePremium > 0 : true;
                            if (!show) return null;
                            return (
                              <tr key={i} className="sh-row">
                                <td className="sh-td-label-wide sh-val-blue sh-link">
                                  {exp.name}
                                  {exp.millRate && <span className="sh-expense-tag">Mill rate: {exp.millRate}</span>}
                                </td>
                                <td className="sh-td-metric sh-val-blue">{exp.growth}</td>
                                <td className="sh-td-metric sh-val-muted">{expSecondaryVal(exp.amount)}</td>
                                <td className="sh-td-metric sh-val-blue">{fmtD(exp.amount)}</td>
                                <MonthCells />
                              </tr>
                            );
                          })}
                          <tr className="sh-row sh-row-total">
                            <td className="sh-td-label-wide sh-td-bold">Total operating expenses</td>
                            <td className="sh-td-metric sh-td-bold"></td>
                            <td className="sh-td-metric sh-td-bold">{expSecondaryVal(totalOpEx)}</td>
                            <td className="sh-td-metric sh-td-bold">{fmtD(totalOpEx)}</td>
                            <MonthCells />
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="sh-table-wrap" style={{ marginTop: 16 }}>
                      <table className="sh-table">
                        <tbody>
                          <tr className="sh-row sh-row-grand-total">
                            <td className="sh-td-label-wide sh-td-bold">Net operating income</td>
                            <td className="sh-td-metric"></td>
                            <td className="sh-td-metric sh-td-bold">{expSecondaryVal(noi)}</td>
                            <td className="sh-td-metric sh-td-bold">{fmtD(noi)}</td>
                            <MonthCells />
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className="sh-table-wrap" style={{ marginTop: 16 }}>
                      <table className="sh-table">
                        <thead>
                          <tr className="sh-cat-header">
                            <th className="sh-th-label-wide">Capital expenditures <span className="sh-th-plus">+</span></th>
                            <th className="sh-th-metric">Annual growth</th>
                            <th className="sh-th-metric">{expSecondaryLabel}</th>
                            <th className="sh-th-metric">Amount/year</th>
                            <MonthHeaders />
                          </tr>
                        </thead>
                        <tbody>
                          {capex.map((exp, i) => (
                            <tr key={i} className="sh-row">
                              <td className="sh-td-label-wide sh-val-blue sh-link">{exp.name}</td>
                              <td className="sh-td-metric sh-val-blue">{exp.growth}</td>
                              <td className="sh-td-metric sh-val-muted">{expSecondaryVal(exp.amount)}</td>
                              <td className="sh-td-metric sh-val-blue">{fmtD(exp.amount)}</td>
                              <MonthCells />
                            </tr>
                          ))}
                          <tr className="sh-row sh-row-total">
                            <td className="sh-td-label-wide sh-td-bold">Total capital expenditures</td>
                            <td className="sh-td-metric sh-td-bold"></td>
                            <td className="sh-td-metric sh-td-bold">{expSecondaryVal(totalCapEx)}</td>
                            <td className="sh-td-metric sh-td-bold">{fmtD(totalCapEx)}</td>
                            <MonthCells />
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

            </>
          )}

          {/* ════════════════════════════════════════
              Tab D: Disposition (placeholder)
              ════════════════════════════════════════ */}
          {activeTab === 'disposition' && (
            <div className="sh-section">
              <div className="sh-section-num"></div>
              <div className="sh-section-card">
                <div className="sh-tab-placeholder">
                  <span className="sh-tab-placeholder-text">Disposition tab coming soon</span>
                </div>
              </div>
            </div>
          )}

        </div>{/* .sh-content-area */}
      </div>{/* .sh-main-layout */}
    </div>
  );
}
