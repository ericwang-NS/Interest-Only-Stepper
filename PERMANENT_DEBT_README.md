# Permanent Debt Component - Multi-Method Calculation Interface

## Overview

A production-grade permanent debt calculation interface that allows users to calculate loan amounts using three different methods: **DSCR (Debt Service Coverage Ratio)**, **Debt Yield**, and **LTV (Loan-to-Value)**. Built with a distinctive **Financial Editorial** aesthetic inspired by Bloomberg Terminal meets modern financial magazines.

## Features

### Three Calculation Methods

1. **DSCR (Debt Service Coverage Ratio)**
   - Formula: `Loan = (NOI ÷ Target DSCR) ÷ Debt Service Rate`
   - Inputs: Target DSCR, Net Operating Income
   - Use case: Lenders use DSCR to ensure the property generates enough income to cover debt payments

2. **Debt Yield**
   - Formula: `Loan = NOI ÷ Target Debt Yield`
   - Inputs: Target Debt Yield (%), Net Operating Income
   - Use case: Measures return on the loan amount, independent of interest rates or amortization

3. **LTV (Loan-to-Value)**
   - Formula: `Loan = Stabilized Value × LTV`
   - Inputs: Target LTV (%), Stabilized Property Value
   - Use case: Traditional metric based on property value percentage

### Dynamic Calculations

- **Interest-Only or Amortizing Loans**: Toggle between interest-only and fully amortizing payment structures
- **Real-time Updates**: All metrics recalculate instantly as inputs change
- **Cross-Method Metrics**: Regardless of calculation method, see DSCR, Debt Yield, and LTV for comparison

### Key Outputs

- Loan amount
- Annual debt service
- Monthly payment
- All three metrics (DSCR, Debt Yield, LTV)
- Fees & closing costs
- Loan funding and payoff dates
- Cash-on-cash return
- Financial projection table

## Design Features

### Financial Editorial Aesthetic

- **Typography**: Libre Franklin for display text, IBM Plex Mono for numbers
- **Color Palette**: Dark theme with cyan accents (#00d4ff) for a sophisticated terminal feel
- **Motion**: Smooth tab transitions, floating icons, pulsing effects on key elements
- **Layout**: Asymmetric grid with prominent tabbed navigation
- **Details**: Gradient borders, monospaced numbers with tabular figures, subtle animations

### UI Components

- **Method Tabs**: Large, distinctive tabs with icons and descriptions
- **Smart Inputs**: Increment/decrement buttons, real-time validation
- **Metric Cards**: Gradient backgrounds with hover effects and visual emphasis
- **Financial Table**: Bloomberg-style data table with proper number formatting
- **Methodology Box**: Contextual explanation of the current calculation method

## Running the Demo

### Prerequisites

Make sure you have Node.js installed (v16 or higher recommended).

### Installation

```bash
cd demo-app
npm install
```

### Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Navigate to Demo

Once the dev server is running, navigate to:
- **Home**: `http://localhost:5173/`
- **Permanent Debt Demo**: `http://localhost:5173/demos/permanent-debt`

## File Structure

```
demo-app/
└── src/
    └── demos/
        └── back-of-envelope/
            ├── PermanentDebt.jsx      # Main component with logic
            ├── PermanentDebt.css      # Financial Editorial styles
            └── BackOfEnvelope.jsx     # Original component (reference)
```

## Component Architecture

### State Management

The component uses React hooks to manage:
- Calculation method selection
- All input values (DSCR, Debt Yield, LTV, NOI, etc.)
- Loan terms (interest-only, APR, fees, amortization)
- Calculated results (updated via useEffect)

### Calculation Logic

Each method has its own formula:

```javascript
// DSCR Method
const annualDebtServiceRate = interestOnly
  ? apr / 100
  : monthlyPaymentFactor * 12
loanAmount = (netOperatingIncome / targetDscr) / annualDebtServiceRate

// Debt Yield Method
loanAmount = debtYieldNoi / (targetDebtYield / 100)

// LTV Method
loanAmount = stabilizedValue * (targetLtv / 100)
```

### Responsive Design

- Desktop: Side-by-side input/output layout
- Tablet: Stacked layout with adjusted metrics grid
- Mobile: Single-column with collapsed table

## Customization

### Changing Colors

Edit CSS variables in `PermanentDebt.css`:

```css
:root {
  --pd-color-accent: #00d4ff;          /* Primary accent color */
  --pd-color-accent-dim: #0088aa;      /* Dimmed accent */
  --pd-color-success: #00ff9d;         /* Success color */
  /* ... more variables ... */
}
```

### Adjusting Formulas

Update the calculation logic in the `useEffect` hook in `PermanentDebt.jsx` (lines 36-116).

### Adding New Metrics

1. Add state for the new metric
2. Update the calculation in `useEffect`
3. Add display in the metrics grid or table

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari 14+

## Performance

- Animations use CSS transforms for GPU acceleration
- Calculations optimized with proper dependency arrays in useEffect
- Font loading optimized with Google Fonts display=swap

## Credits

**Design System**: Northspyre Design Tokens
**Fonts**: Libre Franklin (Google Fonts), IBM Plex Mono (Google Fonts)
**Framework**: React 18 + Vite
**Aesthetic**: Financial Editorial (Bloomberg-inspired)

---

**Built by**: Northspyre Design Agent
**Date**: February 2026
**Version**: 1.0.0
