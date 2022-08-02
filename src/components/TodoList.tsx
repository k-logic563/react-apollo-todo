import React from 'react'
import { Checkbox, Stack, Box, Button } from '@mantine/core'
import { useApolloClient, gql } from '@apollo/client'

import { ALL_TODOS } from '../App'
import { Todo } from '../types'

type Props = {
  loading: boolean
  data: {
    allTodos: Todo[]
  }
}

const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      id
    }
  }
`

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
  const deleteTodo = (id: string) => {
    client.mutate({
      mutation: DELETE_TODO,
      variables: { id },
      refetchQueries: [{ query: ALL_TODOS }]
    })
  }

  if (loading) return <p>Now Loading...</p>

  return (
    <Stack spacing="sm">
      { data && data.allTodos.map(todo => (
        <Box key={todo.id} sx={() => ({
          display: 'flex',
          justifyContent: 'space-between'
        })}>
          <Checkbox
            checked={todo.completed}
            label={todo.text}
            onChange={() => toggleCompleted(todo.id)}
          />
          <Button color="red" disabled={!todo.completed} onClick={() => deleteTodo(todo.id)} compact>delete</Button>
        </Box>
      ))}
    </Stack>
  )
}
