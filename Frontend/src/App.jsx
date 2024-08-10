import './App.css'
import { Navigate, Route,Routes } from 'react-router-dom'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import ExplorePage from './pages/ExplorePage'
import Sidebar from './components/Sidebar'
import LikesPages from './pages/LikesPages'
import {Toaster} from 'react-hot-toast'
import { useAuthContext } from './context/AuthContext'


function App() {
  // const authUser=true;
  const {authUser,loading}=useAuthContext(); //custom hook => use this to check user is authenticated or not.
  // console.log("Authenticated User:",authUser); 
  if(loading) return null; 
  return (
    <>
      <div className='flex text-white'>
        {/* common component that's why outside the Routes  */}
        <Sidebar/>
        <div className='max-w-5xl my-5 text-white mx-auto transition-all duration-300 flex-1'>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='/signin' element={!authUser?<LoginPage/>:<Navigate to="/"/>}/>
            <Route path='/signup' element={!authUser?<SignUpPage/>:<Navigate to="/"/>}/>
            <Route path='/explore' element={authUser?<ExplorePage/>:<Navigate to="/signin"/>}/>
            <Route path='/likes' element={authUser?<LikesPages/>:<Navigate to="/signin"/>}/>
          </Routes>
          <Toaster/>
        </div>
      </div>
    </>
  )
}

export default App
