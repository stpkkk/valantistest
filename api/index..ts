import md5 from 'md5'
import { API_URL, PASSWORD } from '../app-config'

const createAuthString = () => {
	const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '')
	const authString = `${PASSWORD}_${timestamp}`
	return md5(authString)
}

export const fetchData = async (action: string, params = {}) => {
	try {
		const requestOptions = {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-Auth': createAuthString(),
			},
			body: JSON.stringify({
				action,
				params,
			}),
		}

		try {
			const response = await fetch(API_URL, requestOptions)

			if (!response.ok) {
				throw new Error(`HTTP error! Status: ${response.status}`)
			}

			const data = await response.json()
			return data.result
		} catch (error) {
			console.error('Error:', error)
			throw error
		}
	} catch (error) {
		console.error('Error:', error)
		throw error
	}
}
