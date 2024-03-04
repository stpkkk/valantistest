import { createTheme } from '@mui/material/styles'

const theme = createTheme({
	palette: {
		primary: {
			main: '#ff00ff',
		},
	},
	typography: {
		allVariants: {
			color: 'white',
		},
	},
	components: {
		MuiInputBase: {
			styleOverrides: {
				root: {
					color: 'white',
				},
			},
		},
		MuiTextField: {
			styleOverrides: {
				root: {
					'& .MuiOutlinedInput-root': {
						'& fieldset': {
							borderColor: 'white',
						},
						'&:hover fieldset': {
							borderColor: '#ff00ff',
						},
					},
				},
			},
		},
	},
})

export default theme
