<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
  error: Object as () => NuxtError,
})

const { t } = useI18n()
</script>

<template>
  <div class="bg-brand-light dark:bg-brand-dark min-h-screen flex items-center justify-center p-4">
    <div class="w-full max-w-md text-center">
      <div class="mx-auto w-24 h-24 flex items-center justify-center">
        <UIcon
            name="i-heroicons-exclamation-triangle"
            class="text-red-500 dark:text-red-400 text-6xl"
        />
      </div>

      <h1 class="text-5xl font-bold text-gray-900 dark:text-white mb-2">
        {{ error?.statusCode || 'Error' }}
      </h1>

      <p class="text-xl text-gray-600 dark:text-gray-300 mb-8" v-if="error?.statusMessage">
        {{ error.statusMessage}}
      </p>


      <UButton
          icon="i-heroicons-arrow-left"
          size="xl"
          color="primary"
          variant="solid"
          :label="t('error.back_home')"
          :to="$localePath('/')"
          class="mx-auto"
      />
    </div>
  </div>
</template>