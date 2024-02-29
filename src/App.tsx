import { Container } from '@mui/material'
import AppTable from './components/AppTable'
import useApi from './hooks/useApi'
import Loader from './components/Loader'
import { useState } from 'react'
import { IProduct } from '../types/types'
import Filters from './components/Filters'

function App() {
	const { loading, data } = useApi()
	const [filter, setFilter] = useState<Partial<IProduct>>({
		product: '',
		price: undefined,
		brand: '',
	})

	// const data = [
	// 	{ id: '415515151', brand: 'dewdewdew', price: 1600, product: 'Кольцо' },
	// 	{ id: '41551515', brand: 'dewdewdew', price: 1600, product: 'Кольцо' },
	// 	{ id: '415515', brand: 'dewdewdew', price: 1600, product: 'Кольцо' },
	// 	{ id: '41151', brand: 'dewdewdew', price: 1600, product: 'Кольцо' },
	// 	{ id: '5515151', brand: 'dewdewdew', price: 1600, product: 'Кольцо' },
	// 	{ id: '4115151', brand: 'dewdewdew', price: 1600, product: 'Кольцо' },
	// ]

	return (
		<Container maxWidth='lg' sx={{ py: 10, px: 4 }}>
			<Filters setFilter={setFilter} filter={filter} />
			{!loading ? <AppTable products={data} /> : <Loader />}
		</Container>
	)
}

export default App
