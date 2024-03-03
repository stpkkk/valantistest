// useDataFetching.js
import { useEffect, useState } from 'react'
import { fetchData } from '../../api/index.'
import { LIMIT } from '../../app-config'
import { IProduct } from '../../types/types'
import { removeDuplicates } from '../utils/removeDuplicates'

const useDataFetching = (initialFilter: IProduct) => {
	const [loading, setLoading] = useState<boolean>(false)
	const [items, setItems] = useState<IProduct[]>([])
	const [page, setPage] = useState<number>(0)
	const [totalItemsQuantity, setTotalItemsQuantity] = useState<number>(0)
	const [filter, setFilter] = useState(initialFilter)

	const getTotalItems = async (ids: any) => {
		try {
			const totalItemsResponse = await fetchData('get_items', { ids })
			setTotalItemsQuantity(totalItemsResponse.length)
		} catch (error: any) {
			console.error(
				'Error fetching total items:',
				error.message || 'An error occurred',
				error
			)
		}
	}

	const filterItemIds = async (
		allItemIds: IProduct[],
		updatedFilters: Partial<IProduct>
	) => {
		if (Object.keys(updatedFilters).length === 0) return allItemIds

		const filteredIds = await fetchData('filter', updatedFilters)
		return allItemIds.filter(id => filteredIds.includes(id))
	}

	const updateFilters = () => {
		const updatedFilters: Partial<IProduct> = {}

		if (filter.product?.trim().toLowerCase()) {
			updatedFilters.product = filter.product.trim()
		}

		const price = +parseFloat(filter.price?.toString())
		if (!Number.isNaN(price) && price > 0) {
			updatedFilters.price = price
		}

		if (filter.brand && filter.brand.trim().toLowerCase()) {
			updatedFilters.brand = filter.brand.trim()
		}

		return updatedFilters
	}

	const getItems = async () => {
		setLoading(true)

		try {
			const totalIds = await fetchData('get_ids')
			getTotalItems(totalIds)

			const updatedFilters = updateFilters()
			const itemIds = await fetchData('get_ids', {
				offset: page * LIMIT,
				limit: LIMIT,
			})
			const filteredIds = await filterItemIds(itemIds, updatedFilters)
			const filteredItemIds = itemIds.filter(id => filteredIds.includes(id))

			if (filteredItemIds.length > 0) {
				const itemsResult = await fetchData('get_items', {
					ids: filteredItemIds,
				})
				setItems(removeDuplicates(itemsResult))
			} else {
				setItems([])
			}
		} catch (error: any) {
			console.error(error.message || 'An error occurred', error)
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
