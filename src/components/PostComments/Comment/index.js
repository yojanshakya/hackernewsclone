import React from 'react';
import './comment.css';
import moment from 'moment';
import { Link } from 'react-router-dom';

import {themeContext} from '../../../contexts/theme-context.js'


export function Comment({comment}) {

	let {by, text, epochTime} = comment;
	let time = moment(epochTime).format('lll');

	let theme = React.useContext(themeContext);

	return (
		
		<div className={`${theme=='light'?'comment' : 'comment-dark'} mt-1`}>
			<p  className="color-secondary">by 
				<Link to={{pathname:'/user', search:`id=${by}`}}> <u className={theme=='light'? '': 'color-dark'}>{by}</u> </Link>
			{time} </p>
			<p className={`${theme=='dark'? 'color-dark': ''} mt-1`}>
				{text}
			</p>
		</div>
	)
}
