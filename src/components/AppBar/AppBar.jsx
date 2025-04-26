import clsx from 'clsx'
import s from './AppBar.module.css'
import Navigation from '../Navigation/Navigation'
import { NavLink } from 'react-router-dom'

const AppBar = () => {
	const isLinkActive = isActive => clsx(s.navLink, isActive && s.active)

	return (
		<header className={s.header}>
			<div className='container'>
				<nav className={s.headerNav}>
					<NavLink className={({ isActive }) => isLinkActive(isActive)} to='/'>
						Home
					</NavLink>
					<Navigation />
				</nav>
			</div>
		</header>
	)
}

export default AppBar
