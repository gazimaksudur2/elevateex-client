import { Outlet } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import Footer from '../shared/Footer';

const MainLayout = () => {
    return (
        <div className='min-h-screen flex flex-col justify-between'>
            <Navbar />
            <div className='mt-6'>
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;