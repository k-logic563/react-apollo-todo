import React from 'react'
import { useApolloClient, gql } from '@apollo/client'

import { ALL_TODOS } from '../App'
import { Todo } from '../types'

type Props = {
  loading: boolean
  data: {
    allTodos: Todo[]
  }
}

const TOGGLE_COMPLETED = gql`
  mutation toggleCompleted($id: ID!) {
    toggleCompleted(id: $id) {
      id
      text
      completed
    }
  }
`

export const TodoList: React.FC<Props> = ({
  loading,
  data
}) => {
  const client = useApolloClient()
  const toggleCompleted = (id: string) => {
    client.mutate({
      mutation: TOGGLE_COMPLETED,
      variables: { id },
      refetchQueries: [{ query: ALL_TODOS }]
    })
  }

  if (loading) return <p>Now Loading...</p>

  return (
    <ul>
      { data && data.allTodos.map(t => (
        <li
          key={t.id}
          style={{ textDecoration: t.completed ? 'line-through' : 'none' }}
          onClick={() => toggleCompleted(t.id)}
        >
          {t.text}
        </li>
      ))}
    </ul>
  )
}
