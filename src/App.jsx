import { Routes, Route } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ProgressBar from './components/layout/ProgressBar'
import SocialSidebar from './components/layout/SocialSidebar'
import VuurGuide from './components/ui/VuurGuide'
import Home from './pages/Home'
import BlogDetail from './pages/BlogDetail'

function App() {
  const [showVuur, setShowVuur] = useState(false);
  
  useEffect(() => {
    // Show Vuur after 5 seconds
    const timer = setTimeout(() => {
      setShowVuur(true);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative bg-gray-50 min-h-screen">
      <Navbar />
      <ProgressBar />
      <SocialSidebar />
      {showVuur && <VuurGuide />}
      
      <main className="pt-16 pb-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
        </Routes>
      </main>
      
      <Footer />
    </div>
  )
}

export default App