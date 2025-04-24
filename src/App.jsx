import Container from './components/Container/Container'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { fetchContacts } from './redux/contacts/operations'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import LoginPage from './pages/LoginPage/LoginPage'
import RegisterPage from './pages/RegisterPage/RegisterPage'
import TasksPage from './pages/TasksPage/TasksPage'
import './App.css'
import Header from './components/Header/Header'

const App = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchContacts())
	}, [dispatch])
	return (
		<>
			<Header />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/tasks' element={<TasksPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
			</Routes>
			<Container></Container>
		</>
	)
}

export default App
