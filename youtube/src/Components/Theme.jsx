import './Theme.css';
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';

function Theme({ theme, setTheme }) {
    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
        } else {
            document.body.classList.add('dark-theme');
            document.body.classList.remove('light-theme');
        }
    }, [theme]);

    const toggleMode = () => {
        if (theme === 'light') {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    };

    return (
        <FontAwesomeIcon
            onClick={toggleMode}
            icon={theme === 'light' ? faSun : faMoon}
            className='toggle-icon'
        />
    );
}

export default Theme;
