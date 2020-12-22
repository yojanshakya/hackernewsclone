import React from 'react';
import './userProfile.css';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import moment from 'moment';

import { Post } from '../Posts/Post'
import { fetchUser } from '../../api';
import { UserPosts } from './userPosts';
import { themeContext } from '../../contexts/theme-context';
import { Loading } from '../Loading';
import { Error } from '../Error';



function UserDetail({ className: outerClass,user,...props }) {
	let { id,karma,created,about } = user;

	let joined = moment(created).format('lll');


	let theme = React.useContext(themeContext);

	return (
		<div>
			<h2 className={`mt-2 ${theme=='light'? '': 'color-dark'}`}>{id}</h2>
			<p className={'color-secondary'}>joined {joined} has <b>{karma}</b> karma</p>


			<p className={`bio mt-1 ${theme=='light'? '': 'color-dark'}`} dangerouslySetInnerHTML={{__html: about}}>
				
			</p>
		</div>
	)
}



export function UserProfile(props) {

	let query = useLocation().search;
	let id = queryString.parse(query).id;

	let [user,setUser] = React.useState(null);
	let [loading,setLoading] = React.useState(true);
	let [error,setError] = React.useState('There was some error');


	let theme = React.useContext(themeContext);
	React.useEffect(
		() => {
			setLoading(true);
			setError('');

			fetchUser(id)
				.then(
					(fetchedUser) => {
						setError('');
						setLoading(false);
						setUser(fetchedUser);

					}
				)
				.catch(
					(err) => {
						setLoading(false);
						setError(err.message);
						setUser(null);
					}
				)
		},[id]
	)

	if (loading) {
		return <Loading/>;
	}
	else if (user) {
		return (
			<div className="my-2">

				<UserDetail user={user}></UserDetail>
				<h3 className={`mt-2 ${theme=='light'? '': 'color-dark'}`}>Posts</h3>
				<UserPosts submitted={user.submitted} />


			</div>
		)
	}
	else {
		return <Error error={error} />
	}



}
