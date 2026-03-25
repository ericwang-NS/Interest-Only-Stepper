import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import PlatformMain from './demos/platform-main/PlatformMain'
import PlatformMainV2 from './demos/platform-main/PlatformMainV2'
import DeveloperFee from './demos/developer-fee/DeveloperFee'
import StudentHousingGenInfo from './demos/student-housing-gen-info/StudentHousingGenInfo'
import DealPipelineList from './demos/deal-pipeline-list/DealPipelineList'
import PermanentDebtSection from './demos/permanent-debt/PermanentDebtSection'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <div style={{ padding: 40, fontFamily: 'sans-serif', background: '#0d1017', minHeight: '100vh', color: '#c8cdd6' }}>
            <h2 style={{ color: '#fff' }}>Demos</h2>
            <ul>
              <li><Link to="/platform" style={{ color: '#4f8cf7' }}>Platform Main (Feedback in Dropdown)</Link></li>
              <li><Link to="/platform-v2" style={{ color: '#4f8cf7' }}>Platform Main V2 (Feedback in Header)</Link></li>
              <li><Link to="/developer-fee" style={{ color: '#4f8cf7' }}>Developer Fee (% of Hard Costs)</Link></li>
              <li><Link to="/student-housing-gen-info" style={{ color: '#4f8cf7' }}>Student Housing — General Information</Link></li>
              <li><Link to="/deal-pipeline-list" style={{ color: '#4f8cf7' }}>Deal Pipeline List (Empty State)</Link></li>
              <li><Link to="/permanent-debt" style={{ color: '#4f8cf7' }}>Permanent Debt (Pro Forma Section)</Link></li>
            </ul>
          </div>
        } />
        <Route path="/platform" element={<PlatformMain />} />
        <Route path="/platform-v2" element={<PlatformMainV2 />} />
        <Route path="/developer-fee" element={<DeveloperFee />} />
        <Route path="/student-housing-gen-info" element={<StudentHousingGenInfo />} />
        <Route path="/deal-pipeline-list" element={<DealPipelineList />} />
        <Route path="/permanent-debt" element={<PermanentDebtSection />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
