import React from 'react';
import {NavLink} from 'react-router-dom';
import './nav.css'

export function Nav({theme,setTheme}) {
	
	return (
		<nav className="nav mb-2">
			<ul className="nav-items">
				<NavLink to="/" 
					exact 
					activeClassName={theme=='light' ? 'nav-active-link' : 'nav-active-link-dark'} 
					className={theme=='dark'? 'nav-link-dark': ''}
				>
					Top
				</NavLink>
				<NavLink to="/new" 
					activeClassName={theme=='light' ? 'nav-active-link' : 'nav-active-link-dark'}  
				  className={theme=='dark'? 'nav-link-dark': ''}>
					New
				</NavLink >
			</ul>

			<div style={{fontSize: '32px', cursor:'pointer'}} onClick={()=> setTheme((theme)=> theme=='dark'? 'light': 'dark' )}>
			  {theme=='dark' ? '💡':'🔦'}
			</div>
		</nav>
	)
}
