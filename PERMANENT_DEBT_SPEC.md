# Permanent Debt Feature Specification

## Product Requirement

Enable users to calculate permanent debt amounts using three industry-standard methods (DSCR, Debt Yield, LTV) to support various lending scenarios and underwriting requirements.

## User Stories

1. **As a real estate developer**, I want to calculate permanent debt using DSCR so that I can ensure the property generates sufficient income to cover debt service
2. **As a lender**, I want to see debt yield calculations to assess loan risk independent of interest rates
3. **As an investor**, I want to use LTV calculations to understand leverage based on property value
4. **As a financial analyst**, I want to compare all three methods side-by-side to find the optimal loan structure

## Calculation Methods

### 1. DSCR (Debt Service Coverage Ratio)

**Purpose**: Ensures property income covers debt payments by a safety margin

**Formula**:
```
Debt Service = NOI / DSCR
Loan Amount = Debt Service / Annual Debt Service Rate

Where Annual Debt Service Rate is:
  - Interest Only: APR
  - Amortizing: Monthly Payment Factor × 12
```

**Inputs**:
- Target DSCR (multiplier, e.g., 1.25x means income is 1.25× debt service)
- Net Operating Income (annual, $)
- APR (%)
- Amortization period (if not interest-only)

**Example**:
- NOI: $5,000,000
- Target DSCR: 1.25x
- APR: 4.70%
- Interest-only: Yes

```
Annual Debt Service = $5,000,000 / 1.25 = $4,000,000
Loan Amount = $4,000,000 / 0.047 = $85,106,383
```

### 2. Debt Yield

**Purpose**: Measures property's income return on loan amount (lender's perspective)

**Formula**:
```
Loan Amount = NOI / Target Debt Yield
```

**Inputs**:
- Target Debt Yield (%, e.g., 8% means property generates 8% return on loan)
- Net Operating Income (annual, $)

**Example**:
- NOI: $5,000,000
- Target Debt Yield: 8.0%

```
Loan Amount = $5,000,000 / 0.08 = $62,500,000
```

**Note**: Debt yield is independent of interest rate and amortization period

### 3. LTV (Loan-to-Value)

**Purpose**: Calculates loan as percentage of property value (traditional metric)

**Formula**:
```
Loan Amount = Stabilized Value × LTV
```

**Inputs**:
- Target LTV (%, e.g., 65% means loan is 65% of property value)
- Stabilized Value (appraised/projected value, $)

**Example**:
- Stabilized Value: $75,000,000
- Target LTV: 65%

```
Loan Amount = $75,000,000 × 0.65 = $48,750,000
```

## Common Loan Terms

These apply to all calculation methods:

- **Interest Only**: Yes/No toggle
  - Yes: Monthly payment = Loan × (APR/12)
  - No: Amortizing payment using standard mortgage formula

- **APR**: Annual Percentage Rate (%)

- **Fees & Closing Costs**: Percentage of loan amount (%)
  - Calculated as: Loan Amount × (Fees % / 100)

- **Amortization Period**: Loan term in months (only if not interest-only)
  - Common values: 180 (15 years), 240 (20 years), 300 (25 years), 360 (30 years)

## Output Metrics

All calculations produce these metrics (regardless of input method):

### Primary Outputs
- **Loan Amount**: Calculated based on selected method
- **Annual Debt Service**: Total yearly payment amount
- **Monthly Payment**: Debt service / 12

### Derived Metrics
- **DSCR**: NOI / Annual Debt Service (shows coverage ratio)
- **Debt Yield**: (NOI / Loan Amount) × 100 (shows return on loan)
- **LTV**: (Loan Amount / Stabilized Value) × 100 (shows leverage)
- **Fees & Closing Costs**: Loan Amount × (Fees % / 100)

### Timeline
- **Loan Funding Date**: Current date + loan term months
- **Loan Payoff Date**: Funding date + amortization period months

### Performance Metrics
- **Cash-on-Cash Return**: ((NOI - Annual Debt Service) / Loan Amount) × 100
- **Cash Flow After Financing**: From projection table

## User Interface Specification

### Layout Structure

```
┌─────────────────────────────────────────────────────────────┐
│  [4] Permanent Debt                          [Toggle: ON]   │
│      Include permanent debt in this Pro Forma                │
├─────────────────────────────────────────────────────────────┤
│  [📊 DSCR] [📈 Debt Yield] [🏢 LTV]                         │
│   Active    (Debt Service)  (Loan-to-Value)                 │
├───────────────────────┬─────────────────────────────────────┤
│  METHOD INPUTS        │  CALCULATED METRICS                 │
│  -------------------- │  ---------------------------------  │
│  Target DSCR: [- 1.25x +] │  [Loan Funding: Nov 2030]      │
│  NOI: $5,000,000      │  [Loan Payoff: Nov 2035]           │
│                       │  [DSCR: 1.25×] [Fees: $760,037]    │
│  LOAN TERMS          │  [Cash-on-Cash: 7.68%]              │
│  -------------------- │                                     │
│  Interest Only: Yes   │  FINANCIAL TABLE                    │
│  APR: [- 4.70% +]     │  ┌───────────────────────────────┐ │
│  Fees: [- 4.00% +]    │  │ Debt Service | $19M | $893K  │ │
│                       │  │ Cash Flow    | ($216K)       │ │
│                       │  └───────────────────────────────┘ │
│                       │                                     │
│                       │  ℹ️ Calculation Method              │
│                       │  DSCR Method: Loan = (NOI ÷ DSCR)  │
│                       │  ÷ Debt Service Rate                │
└───────────────────────┴─────────────────────────────────────┘
```

### Interaction Patterns

1. **Tab Switching**: Click tabs to change calculation method
   - Inputs panel updates to show method-specific fields
   - Calculations update automatically
   - Smooth transition animations

2. **Input Changes**: Use increment buttons or direct input
   - Real-time validation
   - Results update on every keystroke/click
   - Invalid inputs show "—" placeholder

3. **Responsive Behavior**:
   - Desktop: Side-by-side input/output
   - Tablet: Stacked with 3-column metrics grid
   - Mobile: Single column, simplified table

## Technical Implementation

### Component Structure

```javascript
PermanentDebt/
├── State Management
│   ├── calculationMethod: 'dscr' | 'debt-yield' | 'ltv'
│   ├── interestOnly: boolean
│   ├── Common inputs (apr, fees, loanTerm, amortization)
│   ├── DSCR inputs (targetDscr, netOperatingIncome)
│   ├── Debt Yield inputs (targetDebtYield, debtYieldNoi)
│   ├── LTV inputs (targetLtv, stabilizedValue)
│   └── results: { loanAmount, annualDebtService, ... }
│
├── Calculation Engine (useEffect)
│   ├── Switch on calculationMethod
│   ├── Calculate loanAmount
│   ├── Derive all metrics
│   └── Update results state
│
└── Rendering
    ├── Header with toggle
    ├── Method tabs
    ├── Input panel (dynamic based on method)
    └── Results panel (metrics + table + methodology)
```

### Formula Implementation

```javascript
// DSCR Method
const monthlyRate = (apr / 100) / 12
let annualDebtServiceRate

if (interestOnly) {
  annualDebtServiceRate = apr / 100
} else {
  const numPayments = amortizationPeriod
  const monthlyPaymentFactor =
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)
  annualDebtServiceRate = monthlyPaymentFactor * 12
}

loanAmount = (netOperatingIncome / targetDscr) / annualDebtServiceRate

// Debt Yield Method
loanAmount = debtYieldNoi / (targetDebtYield / 100)

// LTV Method
loanAmount = stabilizedValue * (targetLtv / 100)
```

## Design System

### Typography
- **Display Font**: Libre Franklin (600-700 weight)
- **Body Font**: Libre Franklin (400-500 weight)
- **Monospace/Numbers**: IBM Plex Mono (500-600 weight)

### Color Palette
- **Primary Accent**: #00d4ff (Cyan)
- **Success**: #00ff9d (Green)
- **Warning**: #ffb800 (Yellow)
- **Background**: #1a1d25 (Dark Blue-Gray)
- **Surface**: #23262f, #2a2e38 (Elevated surfaces)
- **Text**: #f0f2f5 (Primary), #b8bcc5 (Secondary), #7e8494 (Muted)

### Key Visual Elements
- Gradient borders on active elements
- Monospaced numbers with tabular figures
- Subtle animations on hover/focus
- Financial table with gridlines
- Bloomberg-inspired data density

## Validation Rules

### Input Constraints
- Target DSCR: min 0.5, max 5.0, step 0.05
- Target Debt Yield: min 1.0%, max 20.0%, step 0.1%
- Target LTV: min 1%, max 95%, step 1%
- NOI: min $0, no max
- Stabilized Value: min $0, no max
- APR: min 0%, max 20%, step 0.1%
- Fees: min 0%, max 10%, step 0.1%
- Amortization: min 12 months, max 600 months

### Error Handling
- Division by zero → show "—" placeholder
- Infinite/NaN results → show "—" placeholder
- Negative values → prevent in UI (min constraints)

## Accessibility

- Semantic HTML (labels, proper heading hierarchy)
- Keyboard navigation (tab through inputs, arrow keys for sliders)
- ARIA labels for increment buttons
- High contrast ratios (WCAG AA compliant)
- Focus indicators on all interactive elements

## Performance

- useEffect dependency array properly configured
- Calculations memoized where appropriate
- CSS animations use transforms (GPU-accelerated)
- Fonts loaded with display=swap to prevent FOUT

## Browser Compatibility

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile Safari/Chrome (iOS 14+, Android 10+)

## Testing Scenarios

### Happy Path
1. Select DSCR method
2. Enter NOI: $5,000,000, Target DSCR: 1.25x
3. Set APR: 4.70%, Interest-only: Yes
4. Verify loan amount ≈ $85M
5. Switch to Debt Yield method
6. Verify metrics recalculate correctly

### Edge Cases
1. Zero NOI → loan amount = $0
2. Very high DSCR (e.g., 3.0x) → smaller loan
3. Very low debt yield (e.g., 2%) → larger loan
4. Toggle interest-only → payment changes
5. Switch between methods → state preserved correctly

### Validation
1. Enter negative values → prevented by input min
2. Enter invalid numbers → UI prevents/corrects
3. Delete all input → show placeholder

## Future Enhancements

- Save/load calculation scenarios
- Compare multiple methods side-by-side
- Export results to PDF/Excel
- Sensitivity analysis (vary inputs, see loan range)
- Historical rate data integration
- Loan amortization schedule table
- Chart visualizations (loan amount by method, cash flow over time)

---

**Document Version**: 1.0
**Last Updated**: February 2026
**Status**: Implementation Complete
