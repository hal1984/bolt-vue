import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Todo {
  id: number
  text: string
  completed: boolean
}

export const useTodoStore = defineStore('todo', () => {
  const todos = ref<Todo[]>([])
  const filter = ref<'all' | 'active' | 'completed'>('all')

  function addTodo(text: string) {
    todos.value.push({
      id: Date.now(),
      text,
      completed: false
    })
  }

  function toggleTodo(id: number) {
    const todo = todos.value.find(todo => todo.id === id)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  function deleteTodo(id: number) {
    todos.value = todos.value.filter(todo => todo.id !== id)
  }

  return {
    todos,
    filter,
    addTodo,
    toggleTodo,
    deleteTodo
  }
})