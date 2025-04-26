import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import s from './ContactForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addContact } from '../../redux/contacts/operations'
import FormField from '../FormField/FormField'
import Loader from '../Loader/Loader'
import toast from 'react-hot-toast'
import { selectLoading } from '../../redux/contacts/selectors'

const ContactForm = () => {
	const dispatch = useDispatch()
	const isLoading = useSelector(selectLoading)

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

	const onFormSubmit = async (value, actions) => {
		try {
			const response = await dispatch(addContact(value)).unwrap()
			toast.success('You have successfully added a contact!')
			return response.data
		} catch (error) {
			toast.error('Something went wrong!')
		} finally {
			actions.resetForm()
		}
	}

	const initialValues = {
		name: '',
		number: '',
	}

	return (
		<>
			{isLoading && <Loader />}
			<div className={s.formWrapper}>
				<Formik
					initialValues={initialValues}
					onSubmit={onFormSubmit}
					validationSchema={validationSchema}
				>
					<Form className={s.form}>
						<div className={s.fields}>
							<FormField
								labelName='Your Name'
								fieldName='name'
								placeholder='...'
							/>
							<FormField
								labelName='Your Phone'
								fieldName='number'
								type='tel'
								placeholder='...'
							/>
						</div>
						<button className={s.submitBtn} type='submit'>
							Add
						</button>
					</Form>
				</Formik>
			</div>
		</>
	)
}

export default ContactForm
