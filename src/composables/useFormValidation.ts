import { ref, computed } from 'vue'

interface ValidationRule {
  validator: (value: any) => boolean
  message: string
}

interface ValidationRules {
  [key: string]: ValidationRule[]
}

export function useFormValidation<T extends object>(initialState: T) {
  const formData = ref<T>({ ...initialState })
  const errors = ref<Partial<Record<keyof T, string>>>({})
  const rules = ref<ValidationRules>({})

  const addRule = (field: keyof T, rule: ValidationRule) => {
    if (!rules.value[field as string]) {
      rules.value[field as string] = []
    }
    rules.value[field as string].push(rule)
  }

  const validate = () => {
    errors.value = {}
    let isValid = true

    Object.keys(rules.value).forEach((field) => {
      const fieldRules = rules.value[field]
      const value = formData.value[field as keyof T]

      for (const rule of fieldRules) {
        if (!rule.validator(value)) {
          errors.value[field as keyof T] = rule.message
          isValid = false
          break
        }
      }
    })

    return isValid
  }

  const isValid = computed(() => Object.keys(errors.value).length === 0)

  return {
    formData,
    errors,
    validate,
    addRule,
    isValid
  }
}