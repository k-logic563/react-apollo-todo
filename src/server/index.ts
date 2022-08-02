import { ApolloServer, UserInputError, gql } from 'apollo-server'

import { Todo, FILTER } from '../types'

let filter = FILTER.SHOW_ALL
let todos = [] as Todo[]

const typeDefs = gql`
  enum FILTER {
    SHOW_ALL
    SHOW_COMPLETED
    SHOW_ACTIVE
  }
  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
  }
  type Query {
    allTodos: [Todo!]!
  }
  type Mutation {
    addTodo(text: String!): Todo!
    deleteTodo(id: ID!): Todo!
    toggleCompleted(id: ID!): Todo!
    setFilter(filter: FILTER!): FILTER!
  }
`

const resolvers = {
  Query: {
    allTodos: () => {
      if (filter === 'SHOW_ALL') {
        return todos
      }
      return todos.filter(todo => filter === 'SHOW_COMPLETED' ? todo.completed : !todo.completed)
    }
  },
  Mutation: {
    addTodo: (_: unknown, args: { text: string }) => {
      const todo = { ...args, id: Math.random().toString(32).substring(2), completed: false }
      todos = [...todos, todo]
      return todo
    },
    deleteTodo: (_: unknown, args: { id: string }) => {
      const newTodo = todos.filter(todo => todo.id !== args.id)
      todos = newTodo
      return {
        id: args.id
      }
    },
    toggleCompleted: (_: unknown, args: { id: string }) => {
      const targetTodo = todos.find(todo => todo.id === args.id)
      if (!targetTodo) {
        throw new UserInputError('id not found', {
          invalidArgs: args.id,
        })
      }

      targetTodo.completed = !targetTodo.completed
      todos = todos.map(todo => todo.id === targetTodo.id ? todo : todo)
      return targetTodo
    },
    setFilter: (_: unknown, args: { filter: FILTER }) => {
      return filter = args.filter
    },
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})

export default server
