import { gql, useQuery, useMutation } from '@apollo/client'

import { AddTodo } from './components/AddTodo'
import { TodoList } from './components/TodoList'
import { TodoFilter } from './components/TodoFilter'

export const ALL_TODOS = gql`
  query {
    allTodos {
      id
      text
      completed
    }
  }
`

const ADD_TODO = gql`
  mutation addTodo($text: String!) {
    addTodo(text: $text) {
      id
      text
      completed
    }
  }
`

const SET_FILTER = gql`
  mutation setFilter($filter: FILTER!) {
    setFilter(filter: $filter)
  }
`

export const App = () => {
  const { loading, data } = useQuery(ALL_TODOS)
  const [addTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: ALL_TODOS }]
  })
  const [toggleCompleted] = useMutation(SET_FILTER, {
    refetchQueries: [{ query: ALL_TODOS }]
  })

  return (
    <>
      <AddTodo addTodo={addTodo} />
      <TodoList { ...{ loading, data }} />
      <TodoFilter toggleCompleted={toggleCompleted} />
    </>
  )
}
