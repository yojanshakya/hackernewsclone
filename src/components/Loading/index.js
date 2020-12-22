import React from 'react';
import { themeContext } from '../../contexts/theme-context';

export function Loading({ loadInterval = 1000,loadingText = 'Loading' }) {

	let [loading,setLoading] = React.useState(loadingText);

	let theme = React.useContext(themeContext);

	React.useEffect(
		() => {
			let interId = setInterval(
				() => {
					setLoading(
						(loading) => {
							if (loading == loadingText + '...') {
								return loadingText;
							}
							return loading + '.';
						}
					)
				},loadInterval
			)

			return () => clearInterval(interId);

		},[]
	)

	return (
		<h2 className={theme == 'dark' ? 'color-primary-dark' : ''}>
			{loading}
		</h2>
	)
}
