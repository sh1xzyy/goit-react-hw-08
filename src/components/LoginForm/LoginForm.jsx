import { Form, Formik } from 'formik'
import FormField from '../FormField/FormField'
import s from './LoginForm.module.css'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/auth/operations'
import { showSuccessMessage, showWarningMessage } from '../../message/message'
import { selectIsLoading } from '../../redux/auth/selectors'
import { HashLoader } from 'react-spinners'

const LoginForm = () => {
	const dispatch = useDispatch()
	const isLoading = useSelector(selectIsLoading)

	const validationSchema = Yup.object().shape({
		email: Yup.string()
			.min(3, 'Min 3 characters')
			.max(32, 'Max 32 characters')
			.required('Enter your Email'),
		password: Yup.string()
			.min(6, 'Min 6 letter')
			.max(32, 'Max 32 letter')
			.required('Enter your password'),
	})

	const onFormSubmit = async (values, actions) => {
		try {
			await dispatch(login(values)).unwrap()
			showSuccessMessage('You have successfully you have successfully logged!')
		} catch (error) {
			showWarningMessage('First you must register!')
		} finally {
			actions.resetForm()
		}
	}

	const initialValues = {
		email: '',
		password: '',
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
								labelName='Your email'
								fieldName='email'
								type='email'
								placeholder='youremail@example.com'
							/>
							<FormField
								type='password'
								labelName='Your password'
								fieldName='password'
								placeholder='...'
							/>
						</div>
						<button className={s.submitBtn} type='submit'>
							Login
						</button>
					</Form>
				</Formik>
			</div>
		</>
	)
}

export default LoginForm
