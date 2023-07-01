import { Alert, AlertTitle, Slide } from '@mui/material';
import * as React from 'react';
import type { Direction, Snackbar } from '@/lib';
import type { CommonProps } from '@/types';

export interface SnackbarItemProps extends CommonProps, Snackbar {
	/**
	 * Callback calling after component entered
	 * @param {number} id id of snack
	 * @returns {void}
	 */
	readonly onMounted: (id: number) => void;
	/**
	 * Callback calling after component exited
	 * @param {number} id id of snack
	 * @returns {void}
	 */
	readonly onUnmounted: (id: number) => void;
	/**
	 * Callback calling after user click on close icon
	 * @param {number} id if of snack
	 * @returns {void}
	 */
	readonly onClose: (id: number) => void;
	/**
	 * Animation direction
	 */
	readonly direction: Direction;
}

export const SnackbarItem: React.FC<SnackbarItemProps> = React.memo((props) => {
	const {
		direction,
		onMounted,
		onUnmounted,
		message,
		open,
		duration,
		id,
		onClose,
		closable,
		title,
		...rest
	} = props;

	const handleClose = React.useCallback(() => {
		onClose(id);
	}, []);
	const handleMounted = React.useCallback(() => {
		onMounted(id);
	}, []);
	const handleUnmounted = React.useCallback(() => {
		onUnmounted(id);
	}, []);

	return (
		<Slide
			in={open}
			onExited={handleUnmounted}
			onEntered={handleMounted}
			direction={direction}
			timeout={duration}
			mountOnEnter
			unmountOnExit>
			<Alert {...rest} onClose={closable ? handleClose : undefined}>
				{title ? <AlertTitle>{title}</AlertTitle> : null}
				{message}
			</Alert>
		</Slide>
	);
});
