import s from './ContactList.module.css'
import Contact from '../Contact/Contact'
import { useSelector } from 'react-redux'
import {
	selectFilteredContacts,
	selectModalType,
} from '../../redux/contacts/selectors'
import Modal from '../Modal/Modal'

const ContactList = () => {
	const filteredContacts = useSelector(selectFilteredContacts)
	const modalType = useSelector(selectModalType)
	return (
		<>
			{modalType && <Modal />}
			<table className={s.table}>
				<thead>
					<tr>
						<th>Name</th>
						<th>Number</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className={s.userList}>
					{filteredContacts.map(contact => {
						return <Contact key={contact.id} contact={contact} />
					})}
				</tbody>
			</table>
		</>
	)
}

export default ContactList
