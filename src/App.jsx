import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SiteLayout from './components/SiteLayout.jsx'
import HomePage from './pages/HomePage.jsx'
import RepairsPage from './pages/RepairsPage.jsx'
import ProcessPage from './pages/ProcessPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import ContactPage from './pages/ContactPage.jsx'
import CertificateGeneratePage from './pages/CertificateGeneratePage.jsx'
import CertificateVerifyPage from './pages/CertificateVerifyPage.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<HomePage />} />
          <Route path="repairs" element={<RepairsPage />} />
          <Route path="process" element={<ProcessPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="certificate/generate" element={<CertificateGeneratePage />} />
          <Route path="certificate/verify/:id" element={<CertificateVerifyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
