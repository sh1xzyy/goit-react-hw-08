import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.baseURL = 'https://68067e0ce81df7060eb757ba.mockapi.io'

export const fetchContacts = createAsyncThunk(
	'contacts/fetchAll',
	async (_, thunkAPI) => {
		try {
			const response = await axios.get('/contacts')
			return response.data
		} catch (error) {
			thunkAPI.rejectWithValue(error)
		}
	}
)

export const addContact = createAsyncThunk(
	'contacts/addContact',
	async (value, thunkAPI) => {
		try {
			const response = await axios.post('/contacts', value)
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
			const response = await axios.delete(`/contacts/${id}`)
			return response.data
		} catch (error) {
			thunkAPI.rejectWithValue(error)
		}
	}
)
