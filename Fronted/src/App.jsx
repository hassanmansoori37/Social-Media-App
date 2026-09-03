import {Navigate, Route, Routes} from 'react-router-dom'
import Post from './pages/Post';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/Notfound';
import axios from 'axios';
import { baseUrl } from './core';
import { useEffect } from 'react';
import { store } from './store/states';
import SplaceScreen from './pages/SplachScreen';


const App = () => {
  const {globalLogin, globalLogout, user, isLogin} = store()


  useEffect(() => {
    getProfile()
  }, [])


  const getProfile = async() => {
    
    try {
      const resp = await axios.get(`${baseUrl}/api/v1/profile` , {
        headers: {
          token: localStorage.getItem("token")
        }
      })

      // console.log(resp.data.data);
      globalLogin(resp.data.data)

    } catch (error) {
      console.log(error);
      globalLogout()
      
    }
  }

  // console.log(user, isLogin);
  

  return(

    <>
      {isLogin == null ? <SplaceScreen /> : null}

      {isLogin == true ? 
      <Routes>
        <Route path='/' element={<Post />} />
      <Route path='*' element={<Navigate to = '/' />} />
      </Routes> : null}

      {isLogin == false ? 
      <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='*' element={<Navigate to='/' />} />
      </Routes> : null}

      </>
  
    


  )

}

export default App;