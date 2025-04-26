import clsx from 'clsx'
import s from './AuthMenu.module.css'
import { NavLink } from 'react-router-dom'

const AuthMenu = () => {
	const isLinkActive = isActive => clsx(s.navLink, isActive && s.active)

	return (
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
	)
}

export default AuthMenu
