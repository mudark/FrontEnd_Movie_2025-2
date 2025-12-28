import React,{useState,createContext} from 'react';
import MoviePage from './pages/moviePage.jsx';
import MyPage from './pages/myPage.jsx';
import LoginPage from './pages/loginPage.jsx';
import SignupPage from './pages/signupPage.jsx';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import {MyMoviesProvider} from './hooks/useMyMoviesContext.jsx';
import './App.css'

function App() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center">
      <BrowserRouter> 
        <MyMoviesProvider>    
          <Routes>
            <Route path="/" element={<MoviePage />} />
            <Route path="/search" element={<MoviePage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage/>} />
          </Routes>
        </MyMoviesProvider>     
      </BrowserRouter>
    </div>
  )
}

export default App;
