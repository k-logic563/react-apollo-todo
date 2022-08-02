import React from 'react'
import { Button, TextInput, Group } from '@mantine/core'
import { useForm } from '@mantine/form'

interface Props {
  addTodo: (arg: any) => any
}

export const AddTodo: React.FC<Props> = ({ addTodo }) => {
  const form = useForm({
    initialValues: {
      text: '',
    },
    validate: {
      text: (value: string) => value.trim() ? null : 'Please Enter Your Todos!!',
    },
  })

  const handleSubmit = (values: { text: string }) => {
    addTodo({
      variables: { text: values.text }
    })

    form.reset()
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <TextInput
        required
        label="Enter Todo"
        {...form.getInputProps('text')}
      />
      <Group position="right" mt="md">
        <Button type="submit">Submit</Button>
      </Group>
    </form>
  )
}
