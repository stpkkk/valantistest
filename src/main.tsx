import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material/styles'
import App from './App.tsx'
import '../styles/global.css'
import theme from '../styles/theme.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</React.StrictMode>
)
