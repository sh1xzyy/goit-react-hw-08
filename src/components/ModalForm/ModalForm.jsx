import { useDispatch, useSelector } from 'react-redux'
import { editContact } from '../../redux/contacts/operations'
import toast from 'react-hot-toast'
import { selectCurrentContact } from '../../redux/contacts/selectors'
import s from './ModalForm.module.css'
import { Formik, Form } from 'formik'
import FormField from '../FormField/FormField'
import { setModalType } from '../../redux/contacts/slice'

const ModalForm = () => {
	const dispatch = useDispatch()
	const initialValues = useSelector(selectCurrentContact)

	const handleSubmit = async (values, action) => {
		try {
			await dispatch(editContact(values)).unwrap()
			dispatch(setModalType(null))
			toast.success('Note Edited successfully')
		} catch (error) {
			toast.error('Something went wrong')
		} finally {
			action.resetForm()
		}
	}
	return (
		<Formik initialValues={initialValues} onSubmit={handleSubmit}>
			<Form>
				<div className={s.fields}>
					<FormField
						labelName='Name'
						fieldName='name'
						type='text'
						placeholder='...'
					/>
					<FormField
						labelName='Number'
						fieldName='number'
						type='tel'
						placeholder='...'
					/>
				</div>
				<button className={s.saveBtn} type='submit'>
					Save
				</button>
			</Form>
		</Formik>
	)
}

export default ModalForm
