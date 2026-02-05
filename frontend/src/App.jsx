
import NavBar from './components/NavBar'
import Home from './pages/Home'
import {Routes,Route} from 'react-router-dom'
import SignUp from './pages/SignUp'
import Login from './pages/Login'



function App() {

   return (
    <>
     <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/signup' element={<SignUp/>}></Route>
      <Route path='/login' element={<Login/>}></Route>
    </Routes>
    
    </> 
    
  )
}



export default App
