import React from 'react'
import { fetchPosts } from '../../../api';
import { Error } from '../../Error';
import { Loading } from '../../Loading';
import { Post } from '../../Posts/Post';

export function UserPosts({ submitted }) {
	submitted.length = 50;

	let [posts,setPosts] = React.useState();
	let [loading,setLoading] = React.useState(true);
	let [error,setError] = React.useState('There was some error');

	React.useEffect(
		() => {
			setLoading(true);
			setError('');

			fetchPosts(submitted)
				.then(
					(posts) => {
						setLoading(false);
						setError('');
						setPosts(posts);

						console.log(posts)
					}
				)
				.catch(
					(err) => {
						setError(err.message);
						setLoading(false);
						setPosts(null);
					}
				)
		},[submitted]
	)

	if (loading) {
		return <Loading loadingText={'Loading Posts'} />
	}
	else if (posts) {
		return (
			posts.length > 0
				? (
					<div>
						{posts.map((post,i) => <Post post={post} key={i} />)}
					</div>
				)
				: <p>There are no posts</p>
		)
	}
	else {
		return <Error error={error}/>
	}

}
