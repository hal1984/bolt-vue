<script setup lang="ts">
import { computed } from 'vue'
import { useTitle } from '@vueuse/core'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import BaseInput from '../components/BaseInput.vue'
import BaseTextarea from '../components/BaseTextarea.vue'

useTitle('Contact - Vue Best Practices')

interface ContactForm {
  name: string
  email: string
  message: string
}

const state = reactive<ContactForm>({
  name: '',
  email: '',
  message: ''
})

const rules = {
  name: { required, minLength: minLength(2) },
  email: { required, email },
  message: { required, minLength: minLength(10) }
}

const v$ = useVuelidate(rules, state)

const getErrorMessage = (fieldErrors: any[]): string => {
  if (!fieldErrors?.length) return ''
  
  const errorMap: Record<string, string> = {
    required: 'This field is required',
    email: 'Please enter a valid email address',
    minLength: 'This field is too short'
  }
  
  return errorMap[fieldErrors[0].$validator] || 'Invalid input'
}

const handleSubmit = async () => {
  const isValid = await v$.value.$validate()
  
  if (isValid) {
    try {
      // Simulate API call
      console.log('Form submitted:', state)
      
      // Reset form and validation
      Object.assign(state, {
        name: '',
        email: '',
        message: ''
      })
      v$.value.$reset()
      
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto">
      <h1 class="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>
      
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <BaseInput
          id="name"
          label="Name"
          v-model="state.name"
          placeholder="Your name"
          :error="v$.name.$error ? getErrorMessage(v$.name.$errors) : ''"
        />

        <BaseInput
          id="email"
          label="Email"
          type="email"
          v-model="state.email"
          placeholder="your.email@example.com"
          :error="v$.email.$error ? getErrorMessage(v$.email.$errors) : ''"
        />

        <BaseTextarea
          id="message"
          label="Message"
          v-model="state.message"
          placeholder="Your message here..."
          :error="v$.message.$error ? getErrorMessage(v$.message.$errors) : ''"
        />

        <button
          type="submit"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Send Message
        </button>
      </form>
    </div>
  </div>
</template>