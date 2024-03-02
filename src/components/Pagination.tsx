import React from 'react'
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { IProduct } from '../../types/types'

interface IPagination {
	setPage: React.Dispatch<React.SetStateAction<number>>
	page: number
	items: IProduct[]
}

const Pagination: React.FC<IPagination> = ({ setPage, page, items }) => {
	const onNextPage = () => {
		setPage(prev => prev + 1)
	}

	const onPreviousPage = () => {
		setPage(prev => Math.max(0, prev - 1))
	}

	return (
		<Box
			display='flex'
			flexDirection='column-reverse'
			justifyContent='flex-end'
			alignItems='end'
			gap={2}
			p={2}
			boxShadow={2}
		>
			<Box>
				<Typography color={'secondary'}>
					{page + 1}-{items.length}
				</Typography>
			</Box>
			<Box
				gap={2}
				display='flex'
				alignItems='center'
				justifyContent='flex-end'
				width='100%'
			>
				<Button
					variant='contained'
					color='primary'
					size='small'
					startIcon={<ArrowBackIos />}
					onClick={onPreviousPage}
				>
					Previous
				</Button>
				<Button
					variant='contained'
					color='primary'
					endIcon={<ArrowForwardIos />}
					size='small'
					onClick={onNextPage}
				>
					Next
				</Button>
			</Box>
		</Box>
	)
}

export default Pagination
