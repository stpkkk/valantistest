import React, { useCallback } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { IProduct } from '../../types/types'

interface IFilters {
	filter: Partial<IProduct>
	getItems: () => void
	setFilter: React.Dispatch<React.SetStateAction<IProduct>>
	setPage: React.Dispatch<React.SetStateAction<number>>
}

const Filters: React.FC<IFilters> = ({
	setFilter,
	filter,
	getItems,
	setPage,
}) => {
	const handleInputChange = useCallback(
		(e: { target: { name: string; value: string } }) => {
			const { name, value } = e.target
			setFilter(prev => ({
				...prev,
				[name]: value,
			}))
		},
		[]
	)

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		getItems()
		setPage(0)
	}

	return (
		<>
			<Grid
				container
				gap={5}
				justifyContent='center'
				sx={{ mb: 5 }}
				component='form'
				onSubmit={handleSubmit}
			>
				<TextField
					id='product'
					label='Name'
					variant='outlined'
					name='product'
					value={filter.product?.toLowerCase()}
					onChange={handleInputChange}
				/>
				<TextField
					id='price'
					label='Price'
					variant='outlined'
					name='price'
					value={filter.price}
					onChange={handleInputChange}
				/>
				<TextField
					id='brand'
					label='Brand'
					variant='outlined'
					name='brand'
					value={filter.brand?.toLowerCase()}
					onChange={handleInputChange}
				/>
				<Button
					type='submit'
					variant='contained'
					sx={{ maxWidth: '150px', width: '100%' }}
					color='success'
				>
					Submit
				</Button>
			</Grid>
		</>
	)
}

export default Filters
