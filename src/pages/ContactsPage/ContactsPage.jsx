import { useEffect } from 'react'
import ContactForm from '../../components/ContactForm/ContactForm'
import ContactList from '../../components/ContactList/ContactList'
import Container from '../../components/Container/Container'
import SearchBox from '../../components/SearchBox/SearchBox'
import Section from '../../components/Section/Section'
import s from './ContactsPage.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { fetchContacts } from '../../redux/contacts/operations'
import { selectModalType } from '../../redux/contacts/selectors'
import Modal from '../../components/Modal/Modal'

const ContactsPage = () => {
	const dispatch = useDispatch()
	const modalType = useSelector(selectModalType)

	useEffect(() => {
		dispatch(fetchContacts())
	}, [dispatch])
	return (
		<>
			{modalType && <Modal />}
			<div className={s.contactPageWrapper}>
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
			</div>
		</>
	)
}

export default ContactsPage
