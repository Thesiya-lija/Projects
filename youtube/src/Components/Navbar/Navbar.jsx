import React, { useState } from 'react';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import logo from '../../assets/Images/ChatTube.png';
import { Link } from 'react-router-dom';
import Theme from '../Theme';
import '../Theme.css';

function Navbar({ setSidebar }) {
    const [theme, setTheme] = useState('light');

    return (
        <>
            <nav className={`navbar flex-div ${theme}-theme`}>
                <div className='nav-left flex-div'>
                    <FontAwesomeIcon icon={faBars} className='menu-icon' onClick={() => setSidebar(prev => !prev)} />
                    <Link to='/'><img src={logo} className='logo' alt='Logo' /></Link>
                </div>
                <div className='nav-middle flex-div'>
                    <div className='search-box flex-div'>
                        <input type='text' placeholder='Search...' />
                        <FontAwesomeIcon icon={faSearch} className='search-icon' />
                    </div>
                    <FontAwesomeIcon icon={faMicrophone} className='microphone-icon' />
                </div>
                <Theme theme={theme} setTheme={setTheme} />
            </nav>
        </>
    );
}

export default Navbar;
