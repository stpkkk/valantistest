import { CircularProgress, Container, Grid } from '@mui/material'
import AppTable from './components/AppTable'

function App() {
	return (
		<Container maxWidth='lg'>
			{true ? (
				<AppTable />
			) : (
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
			)}
		</Container>
	)
}

export default App
