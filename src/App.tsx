import { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import AppTable from './components/AppTable'
import Loader from './components/Loader'
import Filters from './components/Filters'
import { fetchData } from '../api/index.'
import { LIMIT } from '../app-config'
import { IProduct } from '../types/types'
import { removeDuplicates } from './utils/removeDuplicates'

function App() {
	const [loading, setIsLoading] = useState(false)
	const [items, setItems] = useState<IProduct[]>([])
	const [page, setPage] = useState<number>(0)
	const [filter, setFilter] = useState<IProduct>({
		product: '',
		price: '',
		brand: '',
	})

	// Function to construct updated filters
	const updateFilters = () => {
		const updatedFilters: Partial<IProduct> = {}

		if (filter.product?.trim().toLowerCase()) {
			updatedFilters.product = filter.product.trim()
		}

		const price = +parseFloat(filter.price.toString())
		if (!Number.isNaN(price) && price > 0) {
			updatedFilters.price = price
		}

		if (filter.brand && filter.brand.trim().toLowerCase()) {
			updatedFilters.brand = filter.brand.trim()
		}

		return updatedFilters
	}

	const getItems = async () => {
		setIsLoading(true)
		try {
			// Get list of ids
			let getIdsResponse = await fetchData('get_ids', {
				offset: page * LIMIT,
				limit: LIMIT,
			})

			// Construct updated filters
			const updatedFilters = updateFilters()

			if (Object.keys(updatedFilters).length > 0) {
				// Filter ids based on the updated filters
				const filteredIds = await fetchData('filter', updatedFilters)
				getIdsResponse = getIdsResponse.filter(id => filteredIds.includes(id))
			}

			if (getIdsResponse.length > 0) {
				// Fetch detailed items based on filtered ids
				const itemsResult = await fetchData('get_items', {
					ids: getIdsResponse,
				})

				const uniqueItems = removeDuplicates(itemsResult)
				setItems(uniqueItems)
				console.log(items)
			} else {
				setItems([])
			}
		} catch (error) {
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		getItems()
	}, [page])

	return (
		<Container maxWidth='lg' sx={{ py: 10, px: 4 }}>
			<Filters
				setFilter={setFilter}
				filter={filter}
				getItems={getItems}
				setPage={setPage}
			/>
			{!loading ? (
				<AppTable items={items} setPage={setPage} page={page} />
			) : (
				<Loader />
			)}
		</Container>
	)
}

export default App
