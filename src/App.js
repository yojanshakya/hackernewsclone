import React from 'react'
import { Nav,PostComments,Posts,UserProfile } from './components';
import { BrowserRouter as Router,Route,Switch } from 'react-router-dom';
import './App.css';

import { themeContext } from './contexts/theme-context.js';
//todo : code splitting


function App() {

	let [theme,setTheme] = React.useState('light');

	return (
		<themeContext.Provider value={theme}>

			<div  className ={`App  ${theme=='dark'? 'dark': null}`}>

				<div className={`container  `}>
					<Router>
						<Nav setTheme={setTheme} theme={theme}></Nav>

						<Switch>

							<Route path='/user'>
								<UserProfile>
								</UserProfile>
							</Route>

							<Route path='/post'>
								<PostComments />
							</Route>

							<Route path='/new'>
								<Posts />
							</Route>

							<Route path='/'>
								<Posts />
							</Route>

						</Switch>
					</Router>
				</div>
			</div>
		</themeContext.Provider>
	);
}

export default App;
