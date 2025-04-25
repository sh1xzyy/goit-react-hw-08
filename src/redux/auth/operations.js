import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const authInstance = axios.create({
	baseURL: 'https://connections-api.goit.global/',
})

export const register = createAsyncThunk(
	'auth/register',
	async (data, thunkAPI) => {
		try {
			const response = await authInstance.post('/users/signup', data)
			return response.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message)
		}
	}
)

export const login = createAsyncThunk('auth/login', async (data, thunkAPI) => {
	try {
		const response = await authInstance.post('/users/login', data)
		return response.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message)
	}
})

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
	try {
		const token = thunkAPI.getState().auth.token
		if (!token) {
			return thunkAPI.rejectWithValue('No token available')
		}

		const response = await authInstance.post('/users/logout', null, {
			headers: { Authorization: `Bearer ${token}` },
		})
		return response.data
	} catch (error) {
		return thunkAPI.rejectWithValue(error.message)
	}
})

export const refreshUser = createAsyncThunk(
	'auth/refresh',
	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.token

			if (!token) {
				return thunkAPI.rejectWithValue('No valid token')
			}

			const response = await authInstance.get('/users/current', {
				headers: { Authorization: `Bearer ${token}` },
			})
			return response.data
		} catch (error) {
			return thunkAPI.rejectWithValue(error.message)
		}
	}
)
