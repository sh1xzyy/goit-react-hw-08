import { useEffect, useState } from 'react'
import ContactForm from '../../components/ContactForm/ContactForm'
import ContactList from '../../components/ContactList/ContactList'
import Container from '../../components/Container/Container'
import SearchBox from '../../components/SearchBox/SearchBox'
import Section from '../../components/Section/Section'
import s from './TasksPage.module.css'
import { useDispatch } from 'react-redux'
import { fetchContacts } from '../../redux/contacts/operations'

const TasksPage = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(fetchContacts())
	}, [dispatch])
	return (
		<>
			<Section>
				<h2 className={s.title}>PhoneBook</h2>
			</Section>
			<Section>
				<Container>
					<ContactForm />
				</Container>
			</Section>
			<Section>
				<Container>
					<SearchBox />
				</Container>
			</Section>
			<Section>
				<Container>
					<ContactList />
				</Container>
			</Section>
		</>
	)
}

export default TasksPage
