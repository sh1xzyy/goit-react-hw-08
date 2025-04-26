import { Link } from 'react-router-dom'
import s from './NotFound.module.css'
const NotFound = () => {
	return (
		<div className={s.notFoundWrapper}>
			<div className={s.wrapper}>
				<p className={s.text}>This page does not exist</p>
				<Link className={s.link} to='/'>
					Go Home
				</Link>
			</div>
		</div>
	)
}

export default NotFound
