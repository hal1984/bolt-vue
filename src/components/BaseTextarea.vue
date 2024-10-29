<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: string
  label: string
  error?: string
  id: string
  rows?: number
  placeholder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string]
}>()

const textareaClass = computed(() => ({
  'block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm': true,
  'border-red-300': props.error
}))
</script>

<template>
  <div>
    <label :for="id" class="block text-sm font-medium text-gray-700">{{ label }}</label>
    <div class="mt-1">
      <textarea
        :id="id"
        :value="modelValue"
        :rows="rows || 4"
        :placeholder="placeholder"
        @input="emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        :class="textareaClass"
      />
    </div>
    <p v-if="error" class="mt-1 text-sm text-red-600">{{ error }}</p>
  </div>
</template>