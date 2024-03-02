import { CircularProgress, Grid } from '@mui/material'
import React from 'react'

const Loader: React.FC = () => {
	return (
		<Grid
			container
			sx={{
				position: 'fixed',
				top: '30%',
				left: '50%',
			}}
		>
			<CircularProgress size={100} color='inherit' />
		</Grid>
	)
}

export default Loader
