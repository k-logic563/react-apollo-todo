import React, { useState } from 'react'

interface Props {
  addTodo: (arg: any) => any
}

export const AddTodo: React.FC<Props> = ({ addTodo }) => {
  const [text, setText] = useState<string>('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!text.trim()) return;

    addTodo({
      variables: { text }
    })

    setText('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="submit">Add Todo</button>
    </form>
  )
}
