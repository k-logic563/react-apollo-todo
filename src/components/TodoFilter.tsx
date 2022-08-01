import React from 'react'

import { FILTER } from '../types'

type Props = {
  toggleCompleted: (arg: any) => any
}

export const TodoFilter: React.FC<Props> = ({
  toggleCompleted
}) => {
  return (
    <>
      <button onClick={() => toggleCompleted({ variables: { filter: FILTER.SHOW_ALL }})}>
        ALL
      </button>
      <button onClick={() => toggleCompleted({ variables: { filter: FILTER.SHOW_ACTIVE }})}>
        Active
      </button>
      <button onClick={() => toggleCompleted({ variables: { filter: FILTER.SHOW_COMPLETED }})}>
        Completed
      </button>
    </>
  )
}
