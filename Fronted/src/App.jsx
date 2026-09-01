import {Route, Routes} from 'react-router-dom'
import Post from './pages/Post';
import Login from './pages/Login';
import Signup from './pages/Signup';
import NotFound from './pages/Notfound';


const App = () => {
  return(
    <Routes>
      <Route path='/' element={<Post />} />
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='*' element={<NotFound />} />
    </Routes>


  )

}

export default App;