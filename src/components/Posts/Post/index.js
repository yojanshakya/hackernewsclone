import moment from 'moment';
import React from 'react'
import { Link } from 'react-router-dom'

import {themeContext} from '../../../contexts/theme-context.js';

export function Post({ post }) {
	let { title,by: author,url,kids: comments = [],epochTime, id } = post;
	console.log(post)

	let theme = React.useContext(themeContext);

	let time = moment(epochTime).format('lll');

	console.log("post -> ",post)
	return (
		<div className="post mt-2">

			<h4  >
				<a href={url} target='_blank' className={theme=='light'?"color-primary": 'color-primary-dark'}>
					{title}
				</a>
				
			</h4>

			<p className='color-secondary'>
				by
				<Link to={"/user" + `?id=${author}`} >
					<u className={theme=='light'?" ": 'dark'}> {author} </u>
				</Link>
				on {time} with

				<Link to={{pathname: '/post', search: 'id=23', state: {post}} }> <u className={theme=='light'?" ": 'dark'}>{comments.length}</u> </Link>
				comments
			</p>
		</div>
	)
}
