import { nanoid } from '@reduxjs/toolkit'
import s from './FormField.module.css'
import { ErrorMessage, Field } from 'formik'

const FormField = ({ labelName, fieldName, placeholder, type = 'text' }) => {
	const fieldId = nanoid()
	return (
		<div className={s.fieldWrapper}>
			<label className={s.label} htmlFor={fieldId}>
				{labelName}
			</label>
			<Field
				type={type}
				className={s.field}
				name={fieldName}
				placeholder={placeholder}
				id={fieldId}
			/>
			<ErrorMessage className={s.error} name={fieldName} component={'span'} />
		</div>
	)
}

export default FormField
