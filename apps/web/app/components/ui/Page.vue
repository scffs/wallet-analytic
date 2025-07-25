<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRouter } from 'vue-router'

import { viewport, onBackButtonClick, backButton } from '@telegram-apps/sdk-vue'

type PageInsetName = 'top' | 'bottom' | 'left' | 'right'

interface Colors {
  header?: string
  background?: string
  bottomBar?: string
}

type ColorProp = Colors | string

interface Props {
  colors?: ColorProp
  insets?: boolean | PageInsetName[]
  back?: boolean
  preserveMainButton?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  insets: true,
  back: true,
  preserveMainButton: false,
})

const emit = defineEmits<{
  (e: 'back'): void
}>()

const router = useRouter()
const styleInsets = ref<Record<string, string>>({})
let cleanupBackButton: (() => void) | undefined

watch(
  () => props.back,
  (back) => {
    if (cleanupBackButton) {
      cleanupBackButton()
      cleanupBackButton = undefined
    }

    if (!back) {
      backButton.hide()
      return
    }

    backButton.show()

    cleanupBackButton = onBackButtonClick(() => {
      emit('back')
      router.go(-1)
    })
  },
  { immediate: true },
)

onMounted(() => {
  const styles: Record<string, string> = {}

  if (
    props.insets === true ||
    (Array.isArray(props.insets) && props.insets.includes('top'))
  ) {
    const top = viewport.contentSafeAreaInsetTop?.()
    styles.paddingTop = `${top + 35}px`
  }

  if (
    props.insets === true ||
    (Array.isArray(props.insets) && props.insets.includes('bottom'))
  ) {
    const bottom = viewport.contentSafeAreaInsetBottom?.()
    styles.paddingBottom = `${bottom + 35}px`
  }

  if (
    props.insets === true ||
    (Array.isArray(props.insets) && props.insets.includes('left'))
  ) {
    const left = viewport.contentSafeAreaInsetLeft()
    styles.paddingLeft = `${left}px`
  }

  if (
    props.insets === true ||
    (Array.isArray(props.insets) && props.insets.includes('right'))
  ) {
    const right = viewport.contentSafeAreaInsetRight()
    styles.paddingRight = `${right}px`
  }

  styleInsets.value = styles
})

onUnmounted(() => {
  if (cleanupBackButton) {
    cleanupBackButton()
  }
})
</script>

<template>
  <div class="page" :style="styleInsets">
    <slot />
  </div>
</template>