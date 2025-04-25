import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import s from './Navigation.module.css'
import clsx from 'clsx'
import { logout } from '../../redux/auth/operations'
import {
	selectIsLoading,
	selectIsLoggedIn,
	selectUserInfo,
} from '../../redux/auth/selectors'
import Loader from '../Loader/Loader'
import toast from 'react-hot-toast'

const Navigation = () => {
	const dispatch = useDispatch()
	const isLoggedIn = useSelector(selectIsLoggedIn)
	const isLoading = useSelector(selectIsLoading)
	const { name } = useSelector(selectUserInfo)
	const isLinkActive = isActive => clsx(s.navLink, isActive && s.active)

	const onLogoutClick = async () => {
		try {
			const response = await dispatch(logout()).unwrap()
			toast.success('You have successfully logged out!')
			return response.data
		} catch (error) {
			toast.error('Something went wrong!')
		}
	}

	return (
		<>
			{isLoading && <Loader />}
			<nav className={s.headerNav}>
				<NavLink className={({ isActive }) => isLinkActive(isActive)} to='/'>
					Home
				</NavLink>
				{isLoggedIn ? (
					<ul className={s.authLinks}>
						<li>
							<NavLink
								className={({ isActive }) => isLinkActive(isActive)}
								to='/tasks'
							>
								Tasks
							</NavLink>
						</li>
						<li>
							<p className={s.userName}>
								Hi <span>{name}</span>!
							</p>
						</li>
						<li>
							<button
								className={s.logoutBtn}
								type='button'
								onClick={onLogoutClick}
							>
								Logout
							</button>
						</li>
					</ul>
				) : (
					<ul className={s.authLinks}>
						<li>
							<NavLink
								className={({ isActive }) => isLinkActive(isActive)}
								to='/register'
							>
								Register
							</NavLink>
						</li>
						<li>
							<NavLink
								className={({ isActive }) => isLinkActive(isActive)}
								to='/login'
							>
								Login
							</NavLink>
						</li>
					</ul>
				)}
			</nav>
		</>
	)
}

export default Navigation
