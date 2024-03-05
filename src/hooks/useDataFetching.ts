import { useEffect, useState } from 'react'
import { fetchData } from '../../api/index.'
import { LIMIT, REQUEST_DELAY } from '../../app-config'
import { removeDuplicates } from '../utils'
import { IProduct } from '../../types'

const useDataFetching = (initialFilter: IProduct) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [items, setItems] = useState<IProduct[]>([])
	const [page, setPage] = useState<number>(0)
	const [totalItemsQuantity, setTotalItemsQuantity] = useState<number>(0)
	const [filter, setFilter] = useState<Partial<IProduct>>(initialFilter)

	const updateFilters = () => {
		const { product, price, brand } = filter
		const updatedFilters: Partial<IProduct> = {}

		if (product?.trim()) {
			updatedFilters.product = product.trim().toLowerCase()
		}

		const parsedPrice = parseFloat(price?.toString() || '')
		if (!Number.isNaN(parsedPrice) && parsedPrice > 0) {
			updatedFilters.price = parsedPrice
		}

		if (brand?.trim()) {
			updatedFilters.brand = brand.trim().toLowerCase()
		}

		return updatedFilters
	}

	const fetchItems = async (ids: string[]) => {
		try {
			const itemsResult = await fetchData('get_items', { ids })
			const uniqueItems = removeDuplicates(itemsResult)
			setItems(uniqueItems)
			return uniqueItems
		} catch (error: any) {
			console.error(
				'Error fetching items:',
				error.message || 'An error occurred',
				error
			)
			throw error
		}
	}

	const getItems = async () => {
		setLoading(true)
		try {
			const updatedFilters = updateFilters()

			if (Object.values(updatedFilters).length > 0) {
				const filteredIds = await fetchData('filter', updatedFilters)

				const paginatedFilteredIds = filteredIds.slice(
					page * LIMIT,
					(page + 1) * LIMIT
				)

				const filteredItemsResult = await fetchItems(paginatedFilteredIds)
				setItems(filteredItemsResult)
				setTotalItemsQuantity(filteredIds.length)
			} else {
				const allItemIds = await fetchData('get_ids')
				const allItemsResult = await fetchItems(allItemIds)
				setItems(allItemsResult.slice(page * LIMIT, (page + 1) * LIMIT))
				setTotalItemsQuantity(allItemsResult.length)
			}
		} catch (error: any) {
			console.error(error.message || 'An error occurred', error)
			// Retry the request if an error occurred
			console.log('Request due to error')
			setTimeout(getItems, REQUEST_DELAY)
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getItems()
	}, [page])

	return {
		loading,
		items,
		page,
		totalItemsQuantity,
		filter,
		setFilter,
		setPage,
		getItems,
	}
}

export default useDataFetching
