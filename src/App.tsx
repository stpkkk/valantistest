import { Container } from '@mui/material'
import { AppTable, Filters, Loader } from './components'
import { useDataFetching } from './hooks'

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
