import React from 'react'
import { CircularProgress, Grid } from '@mui/material'

const Loader: React.FC = () => {
	return (
		<Grid container mt='200px' display='flex' justifyContent='center'>
			<CircularProgress size={100} color='inherit' />
		</Grid>
	)
}

export default Loader
