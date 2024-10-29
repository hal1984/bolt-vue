<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore } from '../stores/todo'
import { useTitle } from '@vueuse/core'

useTitle('Todos - Vue Best Practices')

const todoStore = useTodoStore()
const newTodo = ref('')

function handleSubmit() {
  if (newTodo.value.trim()) {
    todoStore.addTodo(newTodo.value.trim())
    newTodo.value = ''
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Todo List</h1>
      
      <form @submit.prevent="handleSubmit" class="mb-6">
        <div class="flex gap-2">
          <input
            v-model="newTodo"
            type="text"
            placeholder="Add new todo"
            class="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          />
          <button
            type="submit"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add
          </button>
        </div>
      </form>

      <ul class="divide-y divide-gray-200">
        <li v-for="todo in todoStore.todos" :key="todo.id" class="py-4 flex items-center justify-between">
          <div class="flex items-center">
            <input
              type="checkbox"
              :checked="todo.completed"
              @change="todoStore.toggleTodo(todo.id)"
              class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <span
              :class="['ml-3', todo.completed ? 'line-through text-gray-400' : 'text-gray-900']"
            >
              {{ todo.text }}
            </span>
          </div>
          <button
            @click="todoStore.deleteTodo(todo.id)"
            class="ml-2 text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>