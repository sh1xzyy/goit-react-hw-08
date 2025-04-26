import { useDispatch, useSelector } from 'react-redux'
import s from './ModalWarning.module.css'
import toast from 'react-hot-toast'
import { deleteContact } from '../../redux/contacts/operations'
import {
	selectCurrentContact,
	selectLoading,
} from '../../redux/contacts/selectors'
import { setModalType } from '../../redux/contacts/slice'
import Loader from '../Loader/Loader'

const ModalWarning = () => {
	const dispatch = useDispatch()
	const { id } = useSelector(selectCurrentContact)
	const isLoading = useSelector(selectLoading)

	const handleWarningSubmit = async () => {
		try {
			await dispatch(deleteContact(id)).unwrap()
			toast.success('The note has been successfully deleted.')
			dispatch(setModalType(null))
		} catch (error) {
			toast.error('Something went wrong!')
		}
	}

	return (
		<>
			{isLoading && <Loader />}
			<div className={s.messageWrapper}>
				<p className={s.message}>Are you sure you want to delete this note?</p>
				<button
					onClick={handleWarningSubmit}
					className={s.submitBtn}
					type='submit'
				>
					Yes!
				</button>
			</div>
		</>
	)
}

export default ModalWarning
