import Header from './Header';
import Footer from './Footer';
import { Outlet } from 'react-router-dom';

export function Layout(){
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