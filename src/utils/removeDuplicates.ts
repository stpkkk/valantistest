import { IProduct } from '../../types'

const removeDuplicates = (items: IProduct[]) => {
	const uniqueItemsMap = new Map()
	items.forEach(item => {
		if (!uniqueItemsMap.has(item.id)) {
			uniqueItemsMap.set(item.id, item)
		}
	})
	return Array.from(uniqueItemsMap.values())
}

export default removeDuplicates
