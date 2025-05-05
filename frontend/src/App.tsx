import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { Layout } from './components/Layout';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Job from './pages/Job';
import Apply from './components/Apply';
import MyApplication from './pages/MyApplication';
import About from './pages/About';
import Home from './pages/Home';

function App() {
  return (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route element ={<Layout />}>
              <Route path='/' element={<Home />} />
              <Route path='/home' element={<Home />} />
              <Route path='/job' element= {<Job />} />
              <Route path='job/apply/:id' element = {<Apply />} />
              <Route path='/application' element = {<MyApplication />} />
              <Route path='/about' element= {<About />}/>
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
