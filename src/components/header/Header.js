import React from 'react';
import './Header.css';

const Header = () => {
	return (
		<div className="app-header">
			{/* Logo */}
			<div className="logo">LED GAMES</div>

			{/* Need to make it mobile friendly with navbar toggle */}
			<div className="toggle">
				<span></span>
				<span></span>
				<span></span>
			</div>

			{/* Navbar - list of links */}
			<nav className="nav-list">
				<ul>
					<li>
						<a class="list-link" href="/history">Last Played</a>
					</li>
					<li>
						<a class="list-link" href="/about">About</a>
					</li>
					<li>
						<a class="list-link" href="/rules">Rules</a>
					</li>
					<li>
						<a class="list-link" href="/contact">Contact</a>
					</li>
					<li>
						<a class="list-link" href="/auth">Login</a>
					</li>
				</ul>
			</nav>
		</div>
	);
};

export default Header;