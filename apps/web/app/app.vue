<template>
  <UApp>
    <AppLoader v-if="showLoader" />

    <AppAuthErrorPage
        v-else-if="auth.error"
        :error="auth.error"
        @retry="retryAuth"
    />

    <AppAuthErrorPage
        v-else-if="hasError"
    />

    <ClientOnly v-else>
      <NuxtLayout>
        <div class="w-full overflow-hidden">
          <div class="h-full w-full overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none]">
            <div class="[&::-webkit-scrollbar]:hidden">
              <NuxtPage />
            </div>
          </div>
        </div>
      </NuxtLayout>
    </ClientOnly>
  </UApp>
</template>

<script setup lang="ts">
import { init } from '~/core/init'

const auth = useAuthStore()
const isLoading = ref(true)
const hasError = ref(false)

const showLoader = computed(() => auth.loading || isLoading.value)

const retryAuth = async () => {
  isLoading.value = true
  try {
    await auth.initialize()
  } finally {
    isLoading.value = false
  }
}
const hasInitialized = ref(false)

onMounted(async () => {
  if (hasInitialized.value) {
    return
  }

  hasInitialized.value = true

  try {
    await init()
    await auth.initialize()
  } catch (error) {
    hasError.value = true
    console.error('Initialization failed:', error)
  } finally {
    isLoading.value = false
  }
})
</script>

<style>
html {
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE/Edge */
}

html::-webkit-scrollbar {
  display: none; /* Chrome/Safari/Opera */
}
</style>