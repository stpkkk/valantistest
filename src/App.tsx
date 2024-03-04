import { Container, Typography } from '@mui/material'
import { AppHeader, AppTable, Filters, Loader } from './components'
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
		<>
			<Container maxWidth='lg' sx={{ p: 4 }}>
				<AppHeader />
				<Typography
					variant='h1'
					display='flex'
					justifyContent='center'
					fontSize={40}
					m='0 0 30px'
				>
					Valantis Test Task
				</Typography>
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
		</>
	)
}

export default App
