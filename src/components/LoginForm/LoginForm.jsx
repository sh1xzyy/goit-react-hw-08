import { Form, Formik } from 'formik'
import FormField from '../FormField/FormField'
import s from './LoginForm.module.css'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/auth/operations'
import { selectIsLoading, selectIsLoggedIn } from '../../redux/auth/selectors'
import { Navigate } from 'react-router-dom'
import Loader from '../Loader/Loader'
import toast from 'react-hot-toast'

const LoginForm = () => {
	const dispatch = useDispatch()
	const isLoading = useSelector(selectIsLoading)
	const isLoggedIn = useSelector(selectIsLoggedIn)

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
			toast.success('You have successfully you have successfully logged!')
		} catch (error) {
			toast.error('First you must register!')
		} finally {
			actions.resetForm()
		}
	}

	if (isLoggedIn) {
		return <Navigate to='/contacts' />
	}

	const initialValues = {
		email: '',
		password: '',
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
