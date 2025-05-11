import { BrowserRouter } from 'react-router-dom';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import AppRoutes from './components/AppRoutes';

function App() {
  return (
  <Provider store={store}>
    <BrowserRouter>
       <AppRoutes />
    </BrowserRouter>
   </Provider>
  );
}

export default App;
