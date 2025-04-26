import { useSelector } from 'react-redux'
import { selectIsLoading, selectIsLoggedIn } from '../../redux/auth/selectors'
import Loader from '../Loader/Loader'
import UserMenu from '../UserMenu/UserMenu'
import AuthMenu from '../AuthMenu/AuthMenu'

const Navigation = () => {
	const isLoggedIn = useSelector(selectIsLoggedIn)
	const isLoading = useSelector(selectIsLoading)

	return (
		<>
			{isLoading && <Loader />}
			{isLoggedIn ? <UserMenu /> : <AuthMenu />}
		</>
	)
}

export default Navigation
