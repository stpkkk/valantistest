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
	Typography,
} from '@mui/material'
import { IProduct } from '../../types/types'

interface IAppTable {
	products: IProduct[]
}

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

	return products.length ? (
		<Paper>
			<TablePagination
				component='div'
				count={products.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
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
		</Paper>
	) : (
		<Typography component='div' variant='h4' align='center' sx={{ w: '100%' }}>
			There is no products!😕
		</Typography>
	)
}

export default AppTable
