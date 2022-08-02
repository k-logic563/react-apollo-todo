import React from 'react'
import { Group, Button } from '@mantine/core'

import { FILTER } from '../types'

type Props = {
  toggleCompleted: (arg: any) => any
}

export const TodoFilter: React.FC<Props> = ({
  toggleCompleted
}) => {
  return (
    <Button.Group>
      <Button onClick={() => toggleCompleted({ variables: { filter: FILTER.SHOW_ALL }})}>
        ALL
      </Button>
      <Button onClick={() => toggleCompleted({ variables: { filter: FILTER.SHOW_ACTIVE }})}>
        Active
      </Button>
      <Button onClick={() => toggleCompleted({ variables: { filter: FILTER.SHOW_COMPLETED }})}>
        Completed
      </Button>
    </Button.Group>
  )
}
