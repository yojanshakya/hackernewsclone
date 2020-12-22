import React from 'react'
import { themeContext } from '../../contexts/theme-context'

export function Error({error= "There was some error"}) {
	
	let theme = React.useContext(themeContext);

	return (
		<h2 className={theme=='dark'? 'color-primary-dark': ''}>
			{error}
		</h2>
	)
}
