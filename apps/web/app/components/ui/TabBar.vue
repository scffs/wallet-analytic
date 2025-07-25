<template>
  <div class="fixed bottom-4 left-0 right-0 flex justify-center z-50 px-4">
    <div class="relative bg-white dark:bg-[#242424] rounded-full shadow-xl h-20 flex items-center transition-all duration-300 max-w-sm w-full">
      <NuxtLink
          v-for="(tab, index) in tabs"
          :key="tab.nameKey"
          :to="localePath(tab.route)"
          class="flex-1 flex flex-col items-center justify-center h-full relative group"
          :class="{
          'text-primary-500 dark:text-primary-400': $route.path === localePath(tab.route),
          'text-gray-400 dark:text-gray-400 pointer-events-none': tab.disabled
        }"
      >
        <div class="relative flex flex-col items-center justify-center h-full">
          <UIcon
              :name="tab.icon"
              class="text-xl transition-transform duration-300"
              :class="{
              'scale-110': $route.path === localePath(tab.route),
              'group-hover:scale-105': $route.path !== localePath(tab.route) && !tab.disabled
            }"
          />
          <span
              class="text-[10px] mt-1 transition-opacity duration-300"
              :class="{
              'opacity-100': $route.path === localePath(tab.route),
              'opacity-70 group-hover:opacity-100': $route.path !== localePath(tab.route) && !tab.disabled,
              'opacity-50': tab.disabled
            }"
          >
            {{ $t(tab.nameKey) }}
          </span>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const localePath = useLocalePath()

const tabs = [
  { nameKey: 'overview', route: '/', icon: 'i-heroicons-home' },
  { nameKey: 'analytics', route: '/analyticss', icon: 'i-heroicons-chart-bar' },
  {
    nameKey: 'transactions',
    route: '/transactions',
    icon: 'i-heroicons-arrows-right-left',
  },
  { nameKey: 'rating', route: '/rating', icon: 'i-heroicons-trophy' },
  {
    nameKey: 'secret',
    route: '/secret',
    icon: 'i-heroicons-question-mark-circle',
    disabled: true,
  },
]
</script>