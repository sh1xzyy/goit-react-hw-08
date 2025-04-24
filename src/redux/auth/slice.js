import { createSlice, isAnyOf } from '@reduxjs/toolkit'
import { login, logout, register } from './operations'

const initialState = {
	user: {
		name: null,
		email: null,
	},
	token: null,
	isLoggedIn: false,
	isLoading: false,
	isRefreshing: false,
}

const authSlice = createSlice({
	name: 'authorization',
	initialState,
	extraReducers: builder =>
		builder
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false
				state.isLoggedIn = true
				state.user = action.payload.user
				state.token = action.payload.token
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false
				state.isLoggedIn = true
				state.user = action.payload.user
				state.token = action.payload.token
			})
			.addCase(logout.fulfilled, state => {
				state.user = { name: null, email: null }
				state.isLoggedIn = false
				state.token = null
			})
			.addMatcher(
				isAnyOf(register.pending, login.pending, logout.pending),
				state => {
					state.isLoading = true
				}
			)
			.addMatcher(
				isAnyOf(register.rejected, login.rejected, logout.rejected),
				state => {
					state.isLoading = false
				}
			),
})

export default authSlice.reducer
