import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { FeaturesSection } from "./components/FeaturesSection";
import { DemoSection } from "./components/DemoSection";
import { InstallSection } from "./components/InstallSection";
import { FAQSection } from "./components/FAQSection";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { Analytics } from "./components/Analytics";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
        
        {/* Main Website */}
        <Route path="/" element={
          <div className="min-h-screen bg-background">
            <Analytics pageName="Solexity AI Homepage" />
            <Header />
            <main>
              <HeroSection />
              <FeaturesSection />
              <DemoSection />
              <InstallSection />
              <FAQSection />
            </main>
            <Footer />
            <ScrollToTop />
          </div>
        } />
      </Routes>
    </Router>
  );
}