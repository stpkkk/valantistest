import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
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
				input: {
					color: 'white',
					'&:hover': {
						border: 'red',
					},
				},
			},
		},
		MuiOutlinedInput: {
			styleOverrides: {
				notchedOutline: {
					borderColor: 'white',
					// '&:hover': {
					// 	border: 'red',
					// },
				},
			},
		},
	},
})
