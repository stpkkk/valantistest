import { IProduct } from '../../types/types'

export const removeDuplicates = (items: IProduct[]) => {
	const uniqueItemsMap = new Map()
	items.forEach(item => {
		if (!uniqueItemsMap.has(item.id)) {
			uniqueItemsMap.set(item.id, item)
		}
	})
	return Array.from(uniqueItemsMap.values())
}
