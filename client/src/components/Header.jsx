import { Link } from 'react-router-dom';

export default function Header() {


    return (
        <header className ='main-header'>
            <h1>Grocery Compare</h1>
            <nav className='nav-bar'>
                <Link className="link" to='/'>Home</Link>
                <Link className="link" to="/products">Products</Link>
                <Link className="link" to="/about">About</Link>
            </nav>

        </header>

    )
}