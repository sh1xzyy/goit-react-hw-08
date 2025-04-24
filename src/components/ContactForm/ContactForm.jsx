import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import s from './ContactForm.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { addContact } from '../../redux/contacts/operations'
import FormField from '../FormField/FormField'
import { HashLoader } from 'react-spinners'
import { selectIsLoading } from '../../redux/auth/selectors'
import { showErrorMessage, showSuccessMessage } from '../../message/message'

const ContactForm = () => {
	const dispatch = useDispatch()
	const isLoading = useSelector(selectIsLoading)

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
			showSuccessMessage('Something went wrong!')
			return response.data
		} catch (error) {
			showErrorMessage('Something went wrong!')
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
			{isLoading && (
				<div className='loaderWrapper'>
					<HashLoader color='#36d7b7' size={24} />
				</div>
			)}
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
