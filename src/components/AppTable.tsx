import React from 'react'
import {
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	Table,
	Paper,
	Typography,
} from '@mui/material'
import { IProduct } from '../../types/types'
import Pagination from './Pagination'

interface IAppTable {
	items: IProduct[]
	setPage: React.Dispatch<React.SetStateAction<number>>
	page: number
}

const AppTable: React.FC<IAppTable> = ({ items, setPage, page }) => {
	return items.length > 0 ? (
		<Paper>
			<Pagination setPage={setPage} page={page} items={items} />
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>ID</TableCell>
							<TableCell>Product</TableCell>
							<TableCell>Brand</TableCell>
							<TableCell>Price</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{items.map((item, index) => (
							<TableRow key={index}>
								<TableCell>{item.id}</TableCell>
								<TableCell>{item.product}</TableCell>
								<TableCell>{item.brand || 'Не указан'}</TableCell>
								<TableCell>{item.price} ₽</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Paper>
	) : (
		<Typography component='div' variant='h4' align='center' sx={{ w: '100%' }}>
			There is no products!😕
		</Typography>
	)
}

export default AppTable
