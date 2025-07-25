<script setup lang="ts">
import { getCurrentInstance } from 'vue'
const auth = useAuthStore()

defineProps({
  error: {
    type: [String, Error],
    default: 'A we inside telegram?',
  },
})

defineEmits(['retry'])

const instance = getCurrentInstance()
const hasRetryListener = instance?.vnode.props?.onRetry !== undefined
</script>

<template>
  <div class="flex items-center justify-center h-screen">
    <UCard>
      <template #header>
        <h2 class="text-xl font-semibold text-primary-500 text-center">Core service error</h2>
      </template>

      <p class="text-secondary">{{ error }}</p>

      <template #footer v-if="hasRetryListener">
        <UButton
            @click="$emit('retry')"
            color="primary"
            block
            :loading="auth.loading"
        >
          Login again
        </UButton>
      </template>
    </UCard>
  </div>
</template>
