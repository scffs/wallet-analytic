<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { useI18n } from 'vue-i18n'

const { locale, setLocale, t } = useI18n()

interface Locale {
  code: 'en' | 'ru'
  label: string
}

const availableLocales: Locale[] = [
  { code: 'en', label: 'English' },
  { code: 'ru', label: 'Русский' },
]

const switchLocale = (code: 'ru' | 'en') => {
  if (locale.value !== code) {
    setLocale(code)
  }
}

const languageChildren: DropdownMenuItem[][] = [
  availableLocales.map((lang) => ({
    label: lang.label,
    icon: locale.value === lang.code ? 'i-heroicons-check' : undefined,
    click: () => switchLocale(lang.code),
  })),
]

const items = computed<DropdownMenuItem[][]>(() => [
  [
    {
      label: t('settings.settings'),
      icon: 'i-lucide-cog',
      click: () => navigateTo('/settings'),
    },
  ],
  [
    {
      label: t('settings.language'),
      icon: 'i-lucide-globe',
      children: languageChildren,
      trigger: 'click',
    },
  ],
  [
    {
      label: 'GitHub',
      icon: 'i-simple-icons-github',
      to: 'https://github.com/your-org/your-repo',
      target: '_blank',
    },
    {
      label: 'API',
      icon: 'i-lucide-cloud',
      disabled: true,
    },
  ],
])
</script>

<template>
  <UDropdownMenu :items="items" :ui="{ content: 'w-64' }">
    <template #default>
      <UButton color="neutral" variant="ghost" class="p-2">
        <UIcon
            name="i-heroicons-cog-6-tooth"
            class="w-6 h-6 text-current"
        />
      </UButton>
    </template>
  </UDropdownMenu>
</template>
