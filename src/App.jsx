import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import './App.css'
import RestrictedRoute from './components/RestrictedRoute'
import PrivateRoute from './components/PrivateRoute'
import { refreshUser } from './redux/auth/operations'
import { selectIsRefreshing } from './redux/auth/selectors'
import Loader from './components/Loader/Loader'
import ContactsPage from './pages/ContactsPage/ContactsPage'
import AppBar from './components/AppBar/AppBar'
import NotFound from './components/NotFound/NotFound'

const App = () => {
	const dispatch = useDispatch()
	const isRefreshing = useSelector(selectIsRefreshing)

	useEffect(() => {
		dispatch(refreshUser())
	}, [dispatch])
	return (
		<>
			{isRefreshing && <Loader />}
			<AppBar />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route
					path='/contacts'
					element={
						<PrivateRoute component={<ContactsPage />} redirectTo='/login' />
					}
				/>
				<Route
					path='/login'
					element={
						<RestrictedRoute component={<LoginPage />} redirectTo='/contacts' />
					}
				/>
				<Route
					path='/register'
					element={
						<RestrictedRoute
							component={<RegisterPage />}
							redirectTo='/contacts'
						/>
					}
				/>
				<Route path='*' element={<NotFound />} />
			</Routes>
		</>
	)
}

export default App
