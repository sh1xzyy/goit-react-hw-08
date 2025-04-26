import clsx from 'clsx'
import s from './UserMenu.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserInfo } from '../../redux/auth/selectors'
import { logout } from '../../redux/auth/operations'
import toast from 'react-hot-toast'
import { NavLink } from 'react-router-dom'

const UserMenu = () => {
	const dispatch = useDispatch()

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
		<ul className={s.authLinks}>
			<li>
				<NavLink
					className={({ isActive }) => isLinkActive(isActive)}
					to='/contacts'
				>
					Contacts
				</NavLink>
			</li>
			<li>
				<p className={s.userName}>
					Hi <span>{name}</span>!
				</p>
			</li>
			<li>
				<button className={s.logoutBtn} type='button' onClick={onLogoutClick}>
					Logout
				</button>
			</li>
		</ul>
	)
}

export default UserMenu
