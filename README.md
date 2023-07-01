Implementation snacks stack using effector and MUI

# Introduction

This's a simple implementation of [notistack](https://github.com/iamhosseindhv/notistack) recommended by MUI docs for stack of snacks. It usings react context and hooks for work and this is very bad integrated with effector logic. This library is a solve of the problem. It provides integration effector logic and MUI snacks stack.

# Installation

`npm install effector-mui-snacks`

> The package need react, react-dom, effector, effector-react and @mui/material to be installed

# Using

1. Create snacks model

You can pass [config](#fabric-config) into fabric

```ts
import { create } from 'effector-mui-snacks';

export const snacks = createSnackbarStackModel(); // You may pass [config](#fabric-config), but It'll work and without it
```

2. Add `SnackbarList` component into the component tree and pass into it model

```tsx
import { SnackbarList } from 'effector-mui-snacks';
import { snacks } from '/path/to/model';

export const SomeComponent: FC = () => {
	return (
		<>
			...
			<SnackbarList model={snacks} />
		</>
	);
};
```

3. Import styles into the root of the project

```tsx
...
import 'effector-mui-snacks/dist/style.css'
...

```

4. Create snack called create event with snack data

Simple variant

```ts
...
import { snacks } from '/path/to/model'

...
sample({
  clock: someUnit,
  fn: () => ({ message: 'some message' }),
  target: snacks.create
})

```

Or more complex one

```ts
...
import { snacks } from '/path/to/model'

...
sample({
  clock: someUnit,
  fn: () => ({ message: 'some message', color: 'success', title: 'Some title', timeout: 2400 }) as const, // Need 'cause some properties have strict types
  target: snacks.create
})

```

# Types

## Fabric config

Every property can be static(written in table types) or reactive(stores with written types). If value is reactive and It's changed the config changes too.

| property name | type                                 | required | default value                                  | description                              |
| ------------- | ------------------------------------ | -------- | ---------------------------------------------- | ---------------------------------------- |
| duration      | number                               | false    | 250                                            | duration of snack animation              |
| variant       | 'standard' \| 'outlined' \| 'filled' | false    | 'standard'                                     | MUI snack filling variant                |
| closable      | boolean                              | false    | true                                           | can snack be closed manual               |
| timeout       | number                               | false    | 3000                                           | how long(ms) snack will be shown         |
| maxCount      | number                               | false    | 3                                              | how many snacks max can be in this stack |
| position      | [Position](#position)                | false    | { 'vertical': 'bottom', 'horizontal': 'left' } | where stack will be                      |

## Position

Type describe the position

```ts
type Vertical = 'top' | 'bottom';
type Horizontal = 'left' | 'right' | 'center';

interface Position {
	readonly vertical: Vertical;
	readonly horizontal: Horizontal;
}
```
