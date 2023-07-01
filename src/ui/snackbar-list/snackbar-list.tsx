import { Collapse, Portal, Stack } from '@mui/material';
import cn from 'classnames';
import { useStoreMap, useUnit } from 'effector-react';
import * as React from 'react';
import { SnackbarItem, SnackbarItemProps } from '../snackbar-item';

import styles from './snackbar-list.module.css';
import { getSlideDirection, type SnackbarStackModel } from '@/lib';
import type { CommonProps } from '@/types';

export interface SnackbarListProps extends CommonProps {
	/**
	 * Model snacks from showing by this list
	 */
	readonly model: SnackbarStackModel;
	/**
	 * Component using for showing snack
	 * @default {SnackbarItem}
	 * @component
	 */
	readonly Item?: React.ComponentType<SnackbarItemProps>;
	/**
	 * DOM selector of the element with will be a container for list. If don't passed list will be mounted where called
	 */
	readonly domRootSelector?: string;
}

/**
 *
 * @component
 * @param {SnackbarListProps}  props
 * @returns {React.ReactElement}
 */
export const SnackbarList: React.FC<SnackbarListProps> = (props) => {
	const { className, model, domRootSelector, Item = SnackbarItem, } = props;
	const { items, close, unmounted, mounted, } = useUnit(model);
	const position = useStoreMap(model.$config, (config) => config.position);
	const { horizontal, vertical, } = position;

	const isEmpty = !items.length;

	const classes = cn(
		styles.container,
		styles[`horizontal__${horizontal}`],
		styles[`vertical__${vertical}`],
		className
	);

	const direction = getSlideDirection(position);

	const list = (
		<Collapse className={classes} in={!isEmpty} mountOnEnter unmountOnExit>
			<Stack direction='column-reverse' alignItems='flex-end' spacing={1}>
				{items.map((snackbar) => (
					<Item
						className={styles.item}
						{...snackbar}
						direction={direction}
						onClose={close}
						onMounted={mounted}
						onUnmounted={unmounted}
						key={snackbar.id}
					/>
				))}
			</Stack>
		</Collapse>
	);

	return domRootSelector ? (
		<Portal container={document.querySelector(domRootSelector)}>{list}</Portal>
	) : (
		list
	);
};
