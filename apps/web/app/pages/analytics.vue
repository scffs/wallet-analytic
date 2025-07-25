<script setup lang="ts">
const auth = useAuthStore()

const goHome = () => {
  navigateTo('/')
}
</script>

<template>
  <UiPage :back="true">
    <div class="flex items-center justify-center">
      <UCard class="w-full max-w-md">
        <template #header>
          <h2 class="text-xl font-semibold text-center">Статистика</h2>
        </template>


        <template #footer>
          <div class="flex flex-col space-y-2">
            <UButton
                v-if="auth.isAuthenticated"
                @click="goHome"
                block
            >
              <UIcon name="i-heroicons-home" class="mr-2"/>
              На главную
            </UButton>
          </div>
        </template>
      </UCard>
    </div>
  </UiPage>
</template>

