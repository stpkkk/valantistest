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
import Pagination from './Pagination'
import { IProduct } from '../../types'

interface IAppTable {
	items: IProduct[]
	setPage: React.Dispatch<React.SetStateAction<number>>
	page: number
	totalItemsQuantity: number
}

const AppTable: React.FC<IAppTable> = ({
	items,
	setPage,
	page,
	totalItemsQuantity,
}) => {
	return items.length > 0 ? (
		<Paper>
			<Pagination
				setPage={setPage}
				page={page}
				items={items}
				totalItemsQuantity={totalItemsQuantity}
			/>
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
								<TableCell sx={{ maxWidth: '250px' }}>{item.product}</TableCell>
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
			Bad request or something went wrong 😕
		</Typography>
	)
}

export default AppTable
