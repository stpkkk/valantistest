import { Container } from '@mui/material'
import AppTable from './components/AppTable'
import Loader from './components/Loader'
import Filters from './components/Filters'
import useDataFetching from './hooks/useDataFetching'

function App() {
	const {
		loading,
		items,
		page,
		totalItemsQuantity,
		filter,
		setFilter,
		setPage,
		getItems,
	} = useDataFetching({
		product: '',
		price: '',
		brand: '',
	})

	return (
		<Container maxWidth='lg' sx={{ py: 10, px: 4 }}>
			<Filters
				setFilter={setFilter}
				filter={filter}
				getItems={getItems}
				setPage={setPage}
			/>
			{!loading ? (
				<AppTable
					items={items}
					setPage={setPage}
					page={page}
					totalItemsQuantity={totalItemsQuantity}
				/>
			) : (
				<Loader />
			)}
		</Container>
	)
}

export default App
