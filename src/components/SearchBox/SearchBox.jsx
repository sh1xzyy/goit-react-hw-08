import { useDispatch } from 'react-redux'
import s from '../SearchBox/SearchBox.module.css'
import { useState } from 'react'
import { nanoid } from '@reduxjs/toolkit'
import { changeFilter } from '../../redux/filters/slice'

const SearchBox = () => {
	const [value, setValue] = useState('')
	const dispatch = useDispatch()

	const onInputChange = value => {
		setValue(value)
		dispatch(changeFilter(value))
	}

	const id = nanoid()

	return (
		<div className={s.formWrapper}>
			<form className={s.form}>
				<label className={s.label} htmlFor={id}>
					Find contacts by name
				</label>
				<div className={s.fieldWrapper}>
					<input
						className={s.field}
						type='text'
						value={value}
						onChange={e => onInputChange(e.target.value)}
						id={id}
					/>
				</div>
			</form>
		</div>
	)
}

export default SearchBox
