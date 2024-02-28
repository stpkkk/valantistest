import { useEffect, useState, useCallback } from 'react'
import md5 from 'md5'
import { IProduct } from '../../types'
import { API_URL, PASSWORD } from '../../app-config'

const useApi = () => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<IProduct[]>([])

	const generateAuthString = useCallback(() => {
		const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '')
		const authString = `${PASSWORD}_${timestamp}`
		return authString
	}, [])

	const fetchData = useCallback(async () => {
		const authString = generateAuthString()

		try {
			setLoading(true)
			const getIdsResponse = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Auth': md5(authString),
				},
				body: JSON.stringify({
					action: 'get_ids',
				}),
			})

			if (!getIdsResponse.ok) {
				console.error('Ошибка запроса get_ids:', getIdsResponse.status)
				return
			}

			const idsData = await getIdsResponse.json()
			const allIds = idsData.result

			const getItemsResponse = await fetch(API_URL, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'X-Auth': md5(authString),
				},
				body: JSON.stringify({
					action: 'get_items',
					params: { ids: allIds },
				}),
			})

			if (!getItemsResponse.ok) {
				console.error('Ошибка запроса get_items:', getItemsResponse.status)
				return
			}

			const itemsData = await getItemsResponse.json()
			const allItems = itemsData.result
			setData(allItems)
		} catch (error) {
			console.error('Произошла ошибка:', error)
		} finally {
			setLoading(false)
		}
	}, [generateAuthString])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return { loading, data }
}

export default useApi
