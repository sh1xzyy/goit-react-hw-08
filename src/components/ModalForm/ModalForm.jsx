import { useDispatch, useSelector } from 'react-redux'
import { editContact } from '../../redux/contacts/operations'
import toast from 'react-hot-toast'
import {
	selectCurrentContact,
	selectLoading,
} from '../../redux/contacts/selectors'
import s from './ModalForm.module.css'
import { Formik, Form } from 'formik'
import FormField from '../FormField/FormField'
import { setModalType } from '../../redux/contacts/slice'
import * as Yup from 'yup'
import Loader from '../Loader/Loader'

const ModalForm = () => {
	const dispatch = useDispatch()
	const isLoading = useSelector(selectLoading)
	const initialValues = useSelector(selectCurrentContact)

	const validationSchema = Yup.object({
		name: Yup.string()
			.min(3, 'Too Short!')
			.max(50, 'Too Long')
			.required('Required'),
		number: Yup.string()
			.min(3, 'Too Short!')
			.max(50, 'Too Long')
			.required('Required'),
	})

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
		<>
			{isLoading && <Loader />}
			<Formik
				initialValues={initialValues}
				onSubmit={handleSubmit}
				validationSchema={validationSchema}
			>
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
		</>
	)
}

export default ModalForm
