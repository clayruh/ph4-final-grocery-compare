import { Link } from 'react-router-dom';

export default function Header() {


    return (
        <header className ='main-header'>
            
            <nav className='nav-bar'>

                <Link className="link" to='/'>Home</Link>
                <Link className="link" to="/about">About Us</Link>
                <Link className="link" to="/products">Products</Link>

            </nav>

        </header>

    )
}