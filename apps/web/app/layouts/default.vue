<script setup lang="ts">
</script>

<template>
  <div class="min-h-screen flex flex-col relative">
    <div class="flex justify-end items-center px-3 py-2 bg-white dark:bg-zinc-900 shadow-md">
      <div class="relative">
        <UiMainDropdown />
      </div>
    </div>

    <main class="flex-1">
      <slot />
    </main>

    <footer class="fixed bottom-0 w-full bg-white shadow-md dark:bg-zinc-900">
      <UiTabBar />
    </footer>
  </div>
</template>
