import { HashLoader } from 'react-spinners'
import s from './Loader.module.css'

const Loader = () => {
	return (
		<div className={s.loaderWrapper}>
			<HashLoader color='#36d7b7' size={24} />
		</div>
	)
}

export default Loader
