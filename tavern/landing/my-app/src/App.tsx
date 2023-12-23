import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Grid from './component/Grid';
import Header from './component/Header';
import Contact from './component/Contact';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <main>
          <Routes>
            <Route path="/contact" element={<Contact />} />
            <Route path="/" element={<Grid />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

