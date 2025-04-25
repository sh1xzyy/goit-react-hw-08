import { useDispatch } from 'react-redux'
import s from './ModalWarning.module.css'
import toast from 'react-hot-toast'
import { deleteContact } from '../../redux/contacts/operations'

const ModalWarning = () => {
	const dispatch = useDispatch()

	return (
		<div className={s.messageWrapper}>
			<p className={s.message}>Are you sure you want to delete this note?</p>
			<button
				onClick={handleWarningSubmit}
				className={s.submitBtn}
				type='button'
			>
				Yes!
			</button>
		</div>
	)
}

export default ModalWarning
