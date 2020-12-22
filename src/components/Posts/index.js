import React from 'react'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'

import { fetchMainPosts } from '../../api';
import { Post } from './Post';
import './posts.css'
import { Loading } from '../Loading';
import { Error } from '../Error';
import { themeContext } from '../../contexts/theme-context';



export function Posts(props) {

	let { pathname } = useLocation();

	let [loading,setLoading] = useState(true);
	let [error,setError] = useState('');
	let [posts,setPosts] = useState('');

	let theme = React.useContext(themeContext);
	React.useEffect(
		() => {
			let postType = pathname == '/' ? 'top' : 'new';

			setLoading(true);
			fetchMainPosts(postType)
				.then(
					(fetchedPosts) => {
						
						setError(null);
						setLoading(false);
						setPosts(fetchedPosts);
					}
				)
				.catch(
					(fetchError) => {
					
						setLoading(false);
						setError(fetchError.message);
						setPosts(null);
					}
				)

		},[pathname]
	)


	if (loading) {
		return <Loading />
	}
	else if (error) {
		return <Error error={error} />
	}
	else if (posts) {
		return (
			<div>
				{posts.map((post,i) => <Post key={i} post={post} />)}
			</div>);
	}
	else {
		return (
			<div className={theme=='dark'? 'color-primary-dark': ''}>
				There are no posts
			</div>
		)
	}



}
