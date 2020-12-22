import React from 'react'
import { Comment } from './Comment'
import { Link, useLocation } from 'react-router-dom'
import moment from 'moment';
import { fetchComments } from '../../api';
import { themeContext } from '../../contexts/theme-context';
import { Error } from '../Error';
import { Loading } from '../Loading';


export function CommentsContainer({ comments }) {


	let [fetchedComments,setFetchedComments] = React.useState(null);
	let [loading,setLoading] = React.useState(true);
	let [error,setError] = React.useState('');


	React.useEffect(
		() => {
			setLoading(true);
			setError(null);
			fetchComments(comments)
				.then(
					(fetched) => {
						setLoading(false);
						setError(null);
						setFetchedComments(fetched);

					}
				)
				.catch(
					(err) => {
						setLoading(false);
						setError(err.message);
						setFetchedComments(null);
					}
				)
		},[comments]
	)



	if (loading) {
		return <Loading />

	} else if (fetchedComments) {
		return (
			<div>
				{fetchedComments.map((comment,i) => <Comment comment={comment} key={i} />)}
			</div>
		)
	}


	return <Error error={error} />


}


export function PostComments(props) {

	let { post } = useLocation().state;
	let { by: author,kids: comments = [],time: epochTime,title,url } = post;

	let time = moment(epochTime).format('lll');


	let theme = React.useContext(themeContext);
	return (
		<div>

			<div className="mb-2">
				<h1 > <a className={theme == 'light' ? "color-primary" : 'color-primary-dark'} href={url} target="_blank" >{title}</a> </h1>
				<p className="color-secondary">
					by <Link to={{pathname:'/user', search:`?id=${author}`}}><u className={theme == 'light' ? " " : 'color-dark'}>{author}</u>
					</Link> on {time} with <u className={theme == 'light' ? " " : 'color-dark'}>{comments.length}</u> comments
				 </p>			
				</div>

			{
				comments.length > 0
					? <CommentsContainer comments={comments} />
					: <p>No Comments</p>

			}
		</div>
	)
}