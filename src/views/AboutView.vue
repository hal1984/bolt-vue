<script setup lang="ts">
import { useTitle } from '@vueuse/core'

useTitle('About - Vue Best Practices')
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-3xl mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">About This Project</h1>
      
      <div class="prose prose-indigo">
        <p class="text-lg text-gray-700">
          This project demonstrates Vue.js best practices and popular libraries including:
        </p>
        
        <ul class="mt-4 space-y-2">
          <li>Vue 3 with Composition API</li>
          <li>TypeScript for type safety</li>
          <li>Pinia for state management</li>
          <li>Vue Router for navigation</li>
          <li>VueUse for composition utilities</li>
          <li>Tailwind CSS for styling</li>
          <li>ESLint and Prettier for code quality</li>
        </ul>
      </div>
    </div>
  </div>
</template>