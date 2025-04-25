import { useDispatch } from 'react-redux'
import s from '../Contact/Contact.module.css'
import { setCurrentContact, setModalType } from '../../redux/contacts/slice'

const Contact = ({ contact }) => {
	const dispatch = useDispatch()

	const handleEdit = () => {
		dispatch(setCurrentContact(contact))
		dispatch(setModalType('form'))
	}

	const handleDelete = async () => {
		dispatch(setModalType('warning'))
		handleWarningSubmit()
	}

	return (
		<tr className={s.userItem}>
			<td className={s.userItemWrapper}>
				<p className={s.userText}>{contact.name}</p>
			</td>
			<td className={s.userItemWrapper}>
				<p className={s.userText}>{contact.number}</p>
			</td>
			<td className={s.userItemWrapper}>
				<div className={s.buttonsWrapper}>
					<button
						className={s.userItemBtn}
						type='button'
						onClick={handleDelete}
					>
						Delete
					</button>
					<button className={s.userItemBtn} type='button' onClick={handleEdit}>
						Edit
					</button>
				</div>
			</td>
		</tr>
	)
}

export default Contact
