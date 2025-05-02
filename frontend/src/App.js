import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './redux/store.jsx';
import { Provider } from 'react-redux';
import { Layout } from './components/Layout.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Job from './components/Job.jsx';
import Apply from './components/Apply.jsx';
import MyApplication from './components/MyApplication.jsx';
import About from './components/About.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Home from './components/Home.jsx';

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
