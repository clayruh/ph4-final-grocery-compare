import { Link } from 'react-router-dom';

export default function Header(props) {


    return (
        <header className ='main-header'>
            
            <nav className='nav-bar'>

                <Link to='/'>Home</Link>
                <Link to="/about">About Us</Link>
                <img className="logo"
                // src="" 
                alt="website logo"></img>

            </nav>

        </header>

    )
}