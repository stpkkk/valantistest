import React, { useState } from 'react'
import {
	TableContainer,
	TableHead,
	TableRow,
	TableCell,
	TableBody,
	TablePagination,
	Table,
	Paper,
} from '@mui/material'
import { IProduct } from '../../types'

interface IAppTable {
	products: IProduct[]
}
// const data = [
// 	{ id: '415515151', brand: 'dewdewdew', price: 1600, product: 'Кольцо' },
// 	{ id: '41551515', brand: 'dewdewdew', price: 1600, product: 'Кольцо' },
// 	{ id: '415515', brand: 'dewdewdew', price: 1600, product: 'Кольцо' },
// 	{ id: '41151', brand: 'dewdewdew', price: 1600, product: 'Кольцо' },
// 	{ id: '5515151', brand: 'dewdewdew', price: 1600, product: 'Кольцо' },
// 	{ id: '4115151', brand: 'dewdewdew', price: 1600, product: 'Кольцо' },
// ]

const AppTable: React.FC<IAppTable> = ({ products }) => {
	const [page, setPage] = useState(0)
	const [rowsPerPage, setRowsPerPage] = useState(50)

	const handleChangePage = (_event: unknown, newPage: number) => {
		setPage(newPage)
	}

	const handleChangeRowsPerPage = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		setRowsPerPage(+event.target.value)
		setPage(0)
	}

	return (
		<Paper sx={{ my: 10 }}>
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
						{products
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map((product, index) => (
								<TableRow key={index}>
									<TableCell>{product.id}</TableCell>
									<TableCell>{product.product}</TableCell>
									<TableCell>{product.brand}</TableCell>
									<TableCell>{product.price} ₽</TableCell>
								</TableRow>
							))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				component='div'
				count={products.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	)
}

export default AppTable
