import { Form, Formik } from 'formik'
import FormField from '../FormField/FormField'
import s from './RegisterForm.module.css'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../../redux/auth/operations'
import { showWarningMessage, showSuccessMessage } from '../../message/message'
import { HashLoader } from 'react-spinners'
import { selectIsLoading } from '../../redux/auth/selectors'

const RegisterForm = () => {
	const dispatch = useDispatch()
	const isLoading = useSelector(selectIsLoading)

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.min(3, 'Min 3 characters')
			.max(32, 'Max 32 characters')
			.required('Enter your Name'),
		email: Yup.string()
			.min(3, 'Min 3 characters')
			.max(32, 'Max 32 characters')
			.required('Enter your Email'),
		password: Yup.string()
			.min(6, 'Min 6 letter')
			.max(32, 'Max 32 letter')
			.matches(/[A-Z]/, 'At least one capital letter')
			.matches(/[a-z]/, 'At least one lowercase letter')
			.matches(/\d/, 'At least one digit')
			.matches(/[@$!%*?&]/, 'At least one special character (@$!%*?&)')
			.required('Enter your password'),
		confirmPassword: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Passwords must match')
			.required('Confirm your password'),
	})

	const onFormSubmit = async ({ name, email, password }, actions) => {
		try {
			await dispatch(register({ name, email, password })).unwrap()
			showSuccessMessage('You have successfully registered!')
		} catch (error) {
			showWarningMessage('Your email address has already been authorized!')
		} finally {
			actions.resetForm()
		}
	}

	const initialValues = {
		name: '',
		email: '',
		password: '',
		confirmPassword: '',
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
								type='email'
								labelName='Your email'
								fieldName='email'
								placeholder='youremail@example.com'
							/>
							<FormField
								type='password'
								labelName='Your password'
								fieldName='password'
								placeholder='...'
							/>
							<FormField
								type='password'
								labelName='Confirm your password'
								fieldName='confirmPassword'
								placeholder='...'
							/>
						</div>
						<button className={s.submitBtn} type='submit'>
							Register
						</button>
					</Form>
				</Formik>
			</div>
		</>
	)
}

export default RegisterForm
