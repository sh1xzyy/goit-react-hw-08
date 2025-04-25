import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
	<BrowserRouter>
		<PersistGate loading={null} persistor={persistor}>
			<Provider store={store}>
				<StrictMode>
					<App />
					<Toaster position='top-right' />
				</StrictMode>
			</Provider>
		</PersistGate>
	</BrowserRouter>
)
