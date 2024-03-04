import React from 'react'
import GitHubIcon from '@mui/icons-material/GitHub'
import { Box, Link } from '@mui/material'

const AppHeader: React.FC = () => (
	<Box component='header' display='flex' justifyContent='end' m='0 0 30px'>
		<Link
			href='https://github.com/stpkkk/valantistest'
			target='_blank'
			sx={{
				cursor: 'pointer',
				color: '#FFF',
				transitionProperty: 'color',
				transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
				transitionDuration: '150ms',
				'&:hover': {
					color: 'primary.main',
				},
			}}
		>
			<GitHubIcon fontSize='large' />
		</Link>
	</Box>
)

export default AppHeader
