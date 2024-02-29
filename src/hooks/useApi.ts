import { useEffect, useState, useCallback } from 'react'
import md5 from 'md5'
import { IProduct } from '../../types/types'
import { API_URL, PASSWORD } from '../../app-config'

const useApi = () => {
	const [loading, setLoading] = useState(false)
	const [data, setData] = useState<IProduct[]>([])

	const generateAuthString = useCallback(() => {
		const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '')
		const authString = `${PASSWORD}_${timestamp}`
		return authString
	}, [])

	type AuthData = {
		action: string
		// Add any other properties needed for authentication
	}

	type IdsData = {
		result: string[]
		// Add any other properties specific to get_ids response
	}

	type ItemsData = {
		result: IProduct[]
		// Add any other properties specific to get_items response
	}

	const fetchData = useCallback(async () => {
		try {
			const authString: string = generateAuthString()
			const authData: AuthData = { action: 'get_ids' }

			const headers: HeadersInit = {
				'Content-Type': 'application/json',
				'X-Auth': md5(authString),
			}

			const fetchOptions = (
				data: AuthData | Record<string, unknown>
			): RequestInit => ({
				method: 'POST',
				headers,
				body: JSON.stringify(data),
			})

			setLoading(true)

			const getIdsResponse = await fetch(API_URL, fetchOptions(authData))

			if (!getIdsResponse.ok) {
				console.error('Ошибка запроса get_ids:', getIdsResponse.status)
				return
			}

			const idsData: IdsData = await getIdsResponse.json()
			const allIds: string[] = idsData.result

			const getItemsResponse = await fetch(
				API_URL,
				fetchOptions({ action: 'get_items', params: { ids: allIds } })
			)

			if (!getItemsResponse.ok) {
				console.error('Ошибка запроса get_items:', getItemsResponse.status)
				return
			}

			const itemsData: ItemsData = await getItemsResponse.json()
			const allItems: IProduct[] = itemsData.result
			setData(allItems)
		} catch (error) {
			console.error('Произошла ошибка:', error)
		} finally {
			setLoading(false)
		}
	}, [generateAuthString, setLoading, setData])

	useEffect(() => {
		fetchData()
	}, [fetchData])

	return { loading, data }
}

export default useApi
