import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../Pages/Home';
import About from '../Pages/About';
import Contact from '../Pages/Contact';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const App = () => {
  return (
    <div className="bg-gray-200">
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/about" exact element={<About />} />
        <Route path="/contact" exact element={<Contact />} />
      </Routes>
      <Footer/>
    </Router>
    </div>
  )
}

export default App