import s from './Modal.module.css'
import { IoMdClose } from 'react-icons/io'
import ModalForm from '../ModalForm/ModalForm'
import { useDispatch, useSelector } from 'react-redux'
import { selectModalType } from '../../redux/contacts/selectors'
import ModalWarning from '../ModalWarning/ModalWarning'
import { setModalType } from '../../redux/contacts/slice'

const Modal = () => {
	const dispatch = useDispatch()
	const modalType = useSelector(selectModalType)

	const handleClose = () => {
		dispatch(setModalType(null))
	}

	// const handleWarningSubmit = async () => {
	// 	try {
	// 		await dispatch(deleteContact(contact.id)).unwrap()
	// 		toast.success('The note has been successfully deleted.')
	// 	} catch (error) {
	// 		toast.error('Something went wrong!')
	// 	}
	// }

	return (
		<div className={s.modalOverlay}>
			<div className={s.modal}>
				<button onClick={handleClose} className={s.closeModal} type='button'>
					<IoMdClose />
				</button>
				{modalType === 'form' ? (
					<ModalForm />
				) : modalType === 'warning' ? (
					<ModalWarning />
				) : null}
			</div>
		</div>
	)
}

export default Modal
