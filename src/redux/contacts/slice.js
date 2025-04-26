import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import {
	addContact,
	deleteContact,
	editContact,
	fetchContacts,
} from './operations'
import { logout } from '../auth/operations'

const initialState = {
	items: [],
	loading: false,
	error: null,
	currentContact: null,
	modalType: null,
}

const contactsSlice = createSlice({
	name: 'contacts',
	initialState,
	reducers: {
		setCurrentContact: (state, action) => {
			state.currentContact = action.payload
		},
		setModalType: (state, action) => {
			state.modalType = action.payload
		},
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
			.addCase(editContact.fulfilled, (state, { payload }) => {
				state.loading = false
				state.error = null
				state.items = state.items.map(item =>
					item.id === payload.id ? payload : item
				)
			})
			.addCase(logout.fulfilled, state => {
				state.items = []
			})
			.addMatcher(
				isAnyOf(
					deleteContact.pending,
					addContact.pending,
					fetchContacts.pending,
					editContact.pending
				),
				state => {
					state.loading = true
				}
			)
			.addMatcher(
				isAnyOf(
					deleteContact.rejected,
					addContact.rejected,
					fetchContacts.rejected,
					editContact.rejected
				),
				(state, action) => {
					state.loading = false
					state.error = action.payload
				}
			)
	},
})

export default contactsSlice.reducer
export const { setCurrentContact, setModalType } = contactsSlice.actions
