import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import BackOfEnvelope from './demos/back-of-envelope/BackOfEnvelope'
import PermanentDebt from './demos/back-of-envelope/PermanentDebt'
import PermanentDebtSection from './demos/permanent-debt/PermanentDebtSection'
import IncomeSection from './demos/income-section/IncomeSection'
import StudentHousingIncome from './demos/student-housing-income/StudentHousingIncome'
import DealUpsellPopup from './demos/deal-upsell-popup/DealUpsellPopup'
import OneTimeCost from './demos/one-time-cost/OneTimeCost'

function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Northspyre Design Demos</h1>
      <p>Interactive demos of Northspyre features for customer presentations.</p>

      <h2>Available Demos</h2>
      <ul style={{ lineHeight: '2', fontSize: '1.125rem' }}>
        <li>
          <Link to="/demos/back-of-envelope" style={{ color: '#2563eb', textDecoration: 'none' }}>
            Back-Of-Envelope: Improved Construction Financing Layout
          </Link>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
            Redesigned layout with APR, Average loan balance, and Loan term moved to Construction Financing section
          </p>
        </li>
        <li>
          <Link to="/demos/permanent-debt" style={{ color: '#2563eb', textDecoration: 'none' }}>
            Permanent Debt: Multi-Method Calculation Interface
          </Link>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
            Calculate permanent debt using DSCR, Debt Yield, or LTV methods with a Financial Editorial aesthetic
          </p>
        </li>
        <li>
          <Link to="/demos/permanent-debt-section" style={{ color: '#2563eb', textDecoration: 'none' }}>
            Permanent Debt Section: Operations Tab
          </Link>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
            High-fidelity replica of the Permanent Debt section from the Operations tab of the Pro Forma
          </p>
        </li>
        <li>
          <Link to="/demos/income-section" style={{ color: '#2563eb', textDecoration: 'none' }}>
            Income Section: Operations Tab
          </Link>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
            High-fidelity replica of the Income section with rental income, recovery, other income, adjustments
          </p>
        </li>
        <li>
          <Link to="/demos/student-housing-income" style={{ color: '#2563eb', textDecoration: 'none' }}>
            Student Housing Income: Operations Tab
          </Link>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
            Bed-based income section for student housing pro forma with lease-up %, seasonal revenue, and per-bed metrics
          </p>
        </li>
        <li>
          <Link to="/demos/one-time-cost" style={{ color: '#2563eb', textDecoration: 'none' }}>
            One-Time Cost: Curve Modal
          </Link>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
            Budget line curve selector with new One-Time option — click any Curve badge to open the modal
          </p>
        </li>
        <li>
          <Link to="/demos/deal-upsell-popup" style={{ color: '#2563eb', textDecoration: 'none' }}>
            Deal Upsell: Core Platform Pop-up
          </Link>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0 0' }}>
            Targeted pop-up overlay on the core Northspyre dashboard encouraging existing users to try Deal
          </p>
        </li>
      </ul>

      <h2>Getting Started</h2>
      <ol>
        <li>Populate design tokens in <code>.design/design-system/tokens.md</code> ✓</li>
        <li>Add reference screenshots to <code>.design/design-system/reference/</code> ✓</li>
        <li>Invoke the design agent: "Help me design [feature name]" ✓</li>
        <li>The agent will generate a design spec and add a demo here ✓</li>
      </ol>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <nav style={{
          borderBottom: '1px solid #e5e7eb',
          padding: '1rem 2rem',
          backgroundColor: '#f9fafb'
        }}>
          <Link to="/" style={{
            fontSize: '1.25rem',
            fontWeight: '600',
            textDecoration: 'none',
            color: '#111827'
          }}>
            Northspyre Design Demos
          </Link>
        </nav>

        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/demos/back-of-envelope" element={<BackOfEnvelope />} />
            <Route path="/demos/permanent-debt" element={<PermanentDebt />} />
            <Route path="/demos/permanent-debt-section" element={<PermanentDebtSection />} />
            <Route path="/demos/income-section" element={<IncomeSection />} />
            <Route path="/demos/student-housing-income" element={<StudentHousingIncome />} />
            <Route path="/demos/one-time-cost" element={<OneTimeCost />} />
            <Route path="/demos/deal-upsell-popup" element={<DealUpsellPopup />} />
          </Routes>
        </main>

        <footer style={{
          borderTop: '1px solid #e5e7eb',
          padding: '1rem 2rem',
          fontSize: '0.875rem',
          color: '#6b7280',
          backgroundColor: '#f9fafb'
        }}>
          Generated by Northspyre Design Agent
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
