import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { Layout } from './components/Layout';
import Signup from './components/Signup';
import Login from './components/Login';
import Job from './components/Job';
import Apply from './components/Apply';
import MyApplication from './components/MyApplication';
import About from './components/About';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';

function App() {
  return (
  <Provider store={store}>
    <BrowserRouter>
        <Routes>
          <Route element ={<Layout />}>
          <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/job' element= {<Job />}/>
              <Route path='/apply/:id' element = {<Apply />} />
              <Route path='/application' element = {<MyApplication />} />
              <Route path='/about' element= {<About />}/>

          </Route>
        </Route>
           <Route path = '/login' element = {<Login />} />
           <Route path='/signup' element = {<Signup />} />
           <Route path = '*' element ={<Navigate to = '/login'/>} />
        </Routes>
    </BrowserRouter>
   </Provider>
  );
}

export default App;
