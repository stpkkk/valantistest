import { CircularProgress, Grid } from '@mui/material'
import React from 'react'

const Loader: React.FC = () => {
	return (
		<Grid
			container
			spacing={0}
			direction='column'
			alignItems='center'
			justifyContent='center'
			sx={{ minHeight: '100vh' }}
		>
			<CircularProgress size={100} color='inherit' />
		</Grid>
	)
}

export default Loader
