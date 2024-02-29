import React, { useCallback } from 'react'
import { Button, Grid, TextField } from '@mui/material'
import { IProduct } from '../../types/types'

interface IFilters {
	filter: Partial<IProduct>
	setFilter: React.Dispatch<React.SetStateAction<Partial<IProduct>>>
}

const Filters: React.FC<IFilters> = ({ setFilter, filter }) => {
	const handleInputChange = useCallback(
		(e: { target: { name: string; value: string } }) => {
			const { name, value } = e.target
			setFilter(prev => ({
				...prev,
				[name]: value,
			}))
		},
		[setFilter]
	)
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}

	return (
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
				value={filter.product}
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
				value={filter.brand}
				onChange={handleInputChange}
			/>
			<Button type='submit' variant='contained'>
				Submit
			</Button>
		</Grid>
	)
}

export default Filters
