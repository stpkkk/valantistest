import React from 'react'
import { CircularProgress, Grid } from '@mui/material'

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
