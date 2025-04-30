import Header from './Header';
import Footer from './Footer';
import { useSelector } from 'react-redux';
function Home(){
    const username = useSelector((state) => state.username.user)
    return(
        <>
        <Header />
        <h1 className='home'>WELCOME TO JOBHUNT, {username}</h1>
        <Footer />
        </>
    )
}

export default Home;