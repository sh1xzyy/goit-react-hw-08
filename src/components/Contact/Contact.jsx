import { useDispatch } from 'react-redux'
import s from '../Contact/Contact.module.css'
import { deleteContact } from '../../redux/contacts/operations'

const Contact = ({ contact }) => {
	const dispatch = useDispatch()
	return (
		<tr className={s.userItem}>
			<td className={s.userItemWrapper}>
				<p className='user-text'>{contact.name}</p>
			</td>
			<td className={s.userItemWrapper}>
				<p className='user-text'>{contact.number}</p>
			</td>
			<td className={s.userItemWrapper}>
				<button
					className={s.userItemBtn}
					type='button'
					onClick={() => dispatch(deleteContact(contact.id))}
				>
					Delete
				</button>
			</td>
		</tr>
	)
}

export default Contact
