import { Link } from 'react-router-dom';

function Header(props) {

    return (
        <header classname ='main-header'>
            
            <nav classname='nav-bar'>

                <Link to='/'>Home</Link>
                <Link to="/about">About Us</Link>
                <img className="logo"
                // src="" 
                alt="website logo"></img>

            </nav>

        </header>

    )
}

export default Header