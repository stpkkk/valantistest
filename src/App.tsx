import { Container } from '@mui/material'
import AppTable from './components/AppTable'
import useApi from './hooks/useApi'
import Loader from './components/Loader'

function App() {
	const { loading, data } = useApi()

	return (
		<Container maxWidth='lg'>
			{!loading ? <AppTable products={data} /> : <Loader />}
		</Container>
	)
}

export default App
