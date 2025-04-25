import { createSelector } from '@reduxjs/toolkit'
import { selectNameFilter } from '../filters/selectors'

export const selectContacts = state => state.contacts.items
export const selectLoading = state => state.contacts.loading
export const selectCurrentContact = state => state.contacts.currentContact
export const selectModalType = state => state.contacts.modalType
export const selectError = state => state.contacts.error
export const selectFilteredContacts = createSelector(
	[selectContacts, selectNameFilter],
	(items, filters) => {
		return items.filter(contact =>
			contact.name.toLowerCase().includes(filters.toLowerCase())
		)
	}
)
