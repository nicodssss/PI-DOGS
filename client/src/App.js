import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Cards from "./components/Cards";
import DogDetail from "./components/DogDetail";

import LandingPage from "./components/LandingPage";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/home' element={<Cards/>} />
        <Route path='/home/:id' element={<DogDetail/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;