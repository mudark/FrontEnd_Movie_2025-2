import React,{ useState } from 'react'
import MovieTable from './movieTable.jsx'
import { BrowserRouter,Routes, Route } from 'react-router-dom';
import './App.css'

function App() {

  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MovieTable />} />
          <Route path="/search" element={<MovieTable />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
