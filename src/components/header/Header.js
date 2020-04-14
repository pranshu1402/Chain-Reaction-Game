import React from 'react';

const Header = () => {
    return (
        <div className="App_Header">
            {/* Logo */}
            <div className="Logo">Chain Rxn</div>

            {/* Need to make it mobile friendly with navbar toggle */}
            <div className="toggle">
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Navbar - list of links */}
            <nav></nav>
        </div>
    );
};

export default Header;