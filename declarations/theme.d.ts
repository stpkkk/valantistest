import { CSSProperties } from '@mui/styles'

declare module '@mui/styles' {
	interface Theme {
		overrides: Overrides
	}

	interface Overrides {
		[key: string]: {
			[component: string]: {
				[state: string]: {
					[property: keyof CSSProperties]: string | number | string[]
				}
			}
		}
	}
}
