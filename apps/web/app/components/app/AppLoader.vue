<script setup lang="ts">
const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    text?: string
    progressClass?: string
    textClass?: string
  }>(),
  {
    text: '',
    progressClass: 'w-64',
    textClass: '',
  },
)

const defaultText = t('loading')
const loadingText = computed(() => (props.text ? props.text : defaultText))
console.log('loadingText', loadingText.value)
</script>

<template>
  <div
      class="fixed inset-0 z-[9999] flex flex-col items-center justify-center backdrop-blur-sm pointer-events-none"
  >
    <UProgress
        class="mb-4"
        :class="progressClass"
    />
    <span
        v-if="loadingText"
        class="text-sm font-medium"
        :class="textClass"
    >
      {{ loadingText }}
    </span>

    <slot />
  </div>
</template>