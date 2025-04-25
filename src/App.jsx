import Container from './components/Container/Container'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import TasksPage from './pages/TasksPage/TasksPage'
import './App.css'
import Header from './components/Header/Header'
import RestrictedRoute from './components/RestrictedRoute'
import PrivateRoute from './components/PrivateRoute'
import { refreshUser } from './redux/auth/operations'
import { selectIsRefreshing } from './redux/auth/selectors'
import Loader from './components/Loader/Loader'

const App = () => {
	const dispatch = useDispatch()
	const isRefreshing = useSelector(selectIsRefreshing)

	useEffect(() => {
		dispatch(refreshUser())
	}, [dispatch])
	return (
		<>
			{isRefreshing && <Loader />}
			<Header />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route
					path='/tasks'
					element={
						<PrivateRoute component={<TasksPage />} redirectTo='/login' />
					}
				/>
				<Route
					path='/login'
					element={
						<RestrictedRoute component={<LoginPage />} redirectTo='/tasks' />
					}
				/>
				<Route
					path='/register'
					element={
						<RestrictedRoute component={<RegisterPage />} redirectTo='/tasks' />
					}
				/>
			</Routes>
			<Container></Container>
		</>
	)
}

export default App
