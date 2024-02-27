import { useEffect, useState, useCallback } from 'react'
import md5 from 'md5'
import { IProduct } from '../../types'

const useApi = (url: string) => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<IProduct[]>([])
	const password = 'Valantis'

	const generateAuthString = useCallback(() => {
		const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '')
		const authString = `${password}_${timestamp}`
		return authString
	}, [password])

	const fetchData = useCallback(async () => {
		const authString = generateAuthString()

		try {
			setLoading(true)
			const getIdsResponse = await fetch(url, {
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

			const getItemsResponse = await fetch(url, {
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

			console.log('Все товары:', allItems)
		} catch (error) {
			console.error('Произошла ошибка:', error)
		} finally {
			setLoading(false)
		}
	}, [url, generateAuthString])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return { loading, data }
}

export default useApi
