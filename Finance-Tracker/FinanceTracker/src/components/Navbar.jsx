import { Link } from 'react-router-dom';
import './Navbar.css'
export default function Navbar(){
    return (
        <>
        <nav className='navbar'>
            <h2>
                Finance Tracker
            </h2>
            <div>
                <Link to ='/'>Home</Link>
                <Link to ='/login'>Login</Link>
                <Link to ='/signup'>Signup</Link>
                <Link to ='/dashboard'>Dashboard</Link>
            </div>
        </nav>
        </>
    )
}