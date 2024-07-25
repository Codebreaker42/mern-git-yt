import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route,Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import Sidebar from './components/Sidebar'
import LikesPages from './pages/LikesPages'
function App() {
  return (
    <>
      <div className='flex text-white'>
        {/* common component that's why outside the Routes  */}
        <Sidebar/>
        <div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/signin' element={<LoginPage/>}/>
            <Route path='/signup' element={<SignUpPage/>}/>
            <Route path='/explore' element={<ExplorePage/>}/>
            <Route path='/likes' element={<LikesPages/>}/>
          </Routes>
          <footer>Footer</footer>
        </div>
      </div>
    </>
  )
}

export default App
