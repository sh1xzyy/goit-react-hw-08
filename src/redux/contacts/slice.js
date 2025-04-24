import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { addContact, deleteContact, fetchContacts } from './operations'

const contactsSlice = createSlice({
	name: 'contacts',
	initialState: {
		items: [],
		loading: false,
		error: null,
	},
	extraReducers: builder => {
		builder
			.addCase(fetchContacts.fulfilled, (state, action) => {
				state.loading = false
				state.error = null
				state.items = action.payload
			})
			.addCase(addContact.fulfilled, (state, action) => {
				state.loading = false
				state.error = null
				state.items.push(action.payload)
			})
			.addCase(deleteContact.fulfilled, (state, action) => {
				state.loading = false
				state.error = null
				state.items = state.items.filter(item => item.id !== action.payload.id)
			})
			.addMatcher(
				isAnyOf(
					deleteContact.rejected,
					addContact.rejected,
					fetchContacts.rejected
				),
				(state, action) => {
					state.loading = false
					state.error = action.payload
				}
			)
			.addMatcher(
				isAnyOf(
					deleteContact.pending,
					addContact.pending,
					fetchContacts.pending
				),
				state => {
					state.loading = true
				}
			)
	},
})

export default contactsSlice.reducer
