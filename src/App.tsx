import useApi from './hooks/useApi'

function App() {
	const apiUrl = 'https://api.valantis.store:41000/'
	const { loading, data } = useApi(apiUrl)

	if (loading) return <h1>Loading...</h1>

	return (
		<div>
			{data
				.slice(0, 10) //?Выводим первые 10 продуктов
				.map((product, index) => (
					<div key={index}>{product.product}</div>
				))}
		</div>
	)
}

export default App
