import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

function Layout(){
    return(
        <>
        <div className = 'background'></div>
         <Header />
          <main className='main-body'>
         <Outlet />
         </main>
        <Footer />
        </>
    )
}

export default Layout;