import React from 'react'
import md5 from 'md5'

function App() {
	const [products, setProducts] = React.useState([])
	const apiUrl = 'https://api.valantis.store:41000/'
	const password = 'Valantis'

	const generateAuthString = () => {
		const timestamp = new Date().toISOString().split('T')[0].replace(/-/g, '')
		const authString = `${password}_${timestamp}`
		return authString
	}

	const fetchData = async () => {
		const authString = generateAuthString()
		try {
			const getIdsResponse = await fetch(apiUrl, {
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

			const getItemsResponse = await fetch(apiUrl, {
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
			setProducts(allItems)

			console.log('Все товары:', allItems)
		} catch (error) {
			console.error('Произошла ошибка:', error)
		}
	}

	React.useEffect(() => {
		fetchData()
	}, [])

	return <div>{products[0] || 'ERROR'}</div>
}

export default App
