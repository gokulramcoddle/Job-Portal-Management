import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { store } from './store';
import { Provider } from 'react-redux';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './components/Home';

function App() {
  return (
    <>
     <Provider store={store}>
    <BrowserRouter>
        <Routes>
          <Route element={<ProtectedRoute />}>
              <Route path='/' element={<Home />} />
          </Route>
          <Route path = '/' element ={<Navigate to = '/login'/>} />
          <Route path = '/login' element = {<Login />} />
           <Route path='/signup' element = {<Signup />} />
          <Route path = '/home' element = {<Home />} />  
        </Routes>
    </BrowserRouter>
   </Provider>
  </>
  );
}

export default App;
