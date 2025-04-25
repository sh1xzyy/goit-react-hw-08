import { createAsyncThunk } from '@reduxjs/toolkit'
import { authInstance } from '../auth/operations'

export const fetchContacts = createAsyncThunk(
	'contacts/fetchAll',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.token
			const response = await authInstance.get('/contacts', {
				headers: { Authorization: `Bearer ${token}` },
			})
			return response.data
		} catch (error) {
			thunkAPI.rejectWithValue(error)
		}
	}
)

export const addContact = createAsyncThunk(
	'contacts/addContact',
	async (body, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.token
			const response = await authInstance.post('/contacts', body, {
				headers: { Authorization: `Bearer ${token}` },
			})
			return response.data
		} catch (error) {
			thunkAPI.rejectWithValue(error)
		}
	}
)

export const deleteContact = createAsyncThunk(
	'contacts/deleteContact',
	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.token
			const response = await authInstance.delete(`/contacts/${id}`, {
				headers: { Authorization: `Bearer ${token}` },
			})
			return response.data
		} catch (error) {
			thunkAPI.rejectWithValue(error)
		}
	}
)

export const editContact = createAsyncThunk(
	'contacts/editContact',
	async ({ id, ...body }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.token
			const response = await authInstance.patch(`/contacts/${id}`, body, {
				headers: { Authorization: `Bearer ${token}` },
			})
			return response.data
		} catch (error) {
			thunkAPI.rejectWithValue(error)
		}
	}
)
