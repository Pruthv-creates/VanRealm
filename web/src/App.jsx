import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import ExplorePlants from './pages/ExplorePlants';
import PlantDetail from './pages/PlantDetail';
import Tours from './pages/Tours';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar />
        <main style={{ flex: 1, paddingBottom: '40px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<ExplorePlants />} />
            <Route path="/plant/:id" element={<PlantDetail />} />
            <Route path="/tours" element={<Tours />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
