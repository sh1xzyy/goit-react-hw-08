import s from './HomePage.module.css'

import { Link } from 'react-router-dom'

const HomePage = () => {
	return (
		<div className={s.homePageWrapper}>
			<div className={s.wrapper}>
				<h1 className={s.title}>My notebook</h1>
				<p className={s.text}>
					Write down ideas, dreams and important thoughts here. Organize your
					notes and don't forget the important things!
				</p>
				<Link to='/contacts' className={s.link}>
					Go to my notes
				</Link>
			</div>
		</div>
	)
}

export default HomePage
