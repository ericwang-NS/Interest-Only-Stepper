# Quick Start - Permanent Debt Demo

## Run the Demo in 3 Steps

### 1. Install Dependencies

```bash
cd demo-app
npm install
```

### 2. Start Dev Server

```bash
npm run dev
```

### 3. Open in Browser

Navigate to: **http://localhost:5173/demos/permanent-debt**

## What You'll See

A sophisticated permanent debt calculator with three calculation methods:

1. **DSCR Tab** - Calculate loan based on debt service coverage ratio
2. **Debt Yield Tab** - Calculate loan based on return on loan amount
3. **LTV Tab** - Calculate loan based on property value percentage

## Try It Out

### Test DSCR Method
1. Click the "DSCR" tab (should be selected by default)
2. Adjust "Target DSCR" using the +/- buttons (try 1.25x)
3. Set "Net Operating Income" (try $5,000,000)
4. Watch the loan amount and metrics update in real-time

### Test Debt Yield Method
1. Click the "Debt Yield" tab
2. Set "Target Debt Yield" (try 8.0%)
3. Adjust "Net Operating Income" (try $5,000,000)
4. See how the calculation changes compared to DSCR

### Test LTV Method
1. Click the "LTV" tab
2. Set "Target LTV" (try 65%)
3. Enter "Stabilized Value" (try $75,000,000)
4. Compare results across all three methods

### Modify Loan Terms
- Toggle "Interest only?" between Yes/No
- Adjust APR with +/- buttons
- Change "Fees & closing costs"
- If amortizing, set the amortization period

## Key Features to Notice

✨ **Smooth Tab Transitions**: Click between methods to see animated transitions
🎯 **Real-time Calculations**: Every input updates results immediately
📊 **Cross-Method Metrics**: See DSCR, Debt Yield, and LTV regardless of method
💎 **Financial Editorial Design**: Bloomberg-inspired aesthetic with cyan accents
🔢 **Monospaced Numbers**: Proper tabular figure formatting for financial data
⚡ **Hover Effects**: Cards and buttons respond to interaction
📱 **Responsive**: Resize browser to see mobile/tablet layouts

## Troubleshooting

**Port already in use?**
Vite will automatically try the next available port (5174, 5175, etc.)

**Fonts not loading?**
Check your internet connection - fonts are loaded from Google Fonts

**Styles not applied?**
Make sure both `PermanentDebt.jsx` and `PermanentDebt.css` are in the same directory

**Numbers showing as "—"?**
This is the placeholder for undefined/infinite values - enter valid inputs

## Next Steps

- Read [PERMANENT_DEBT_README.md](./PERMANENT_DEBT_README.md) for detailed documentation
- Customize colors by editing CSS variables in `PermanentDebt.css`
- Modify formulas in the `useEffect` hook in `PermanentDebt.jsx`
- Add new metrics by extending the state and calculations

---

Need help? Check the main README or component files for more details.
