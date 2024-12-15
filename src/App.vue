<script setup lang="ts">
import { RouterView, useRouter } from "vue-router"
import { usePluginStorage } from "./composables/usePluginStorage"
import { usePenpotStore } from "./stores/penpot"
import { watch } from "vue"

const penpot = usePenpotStore()

const { data: onboarded, isLoaded } = usePluginStorage<boolean>("onboarded", false)
const router = useRouter()
watch(isLoaded, (loaded) => {
  if (loaded && onboarded.value == false) {
    router.replace("/onboarding")
  }
})
</script>

<template>
  <main :data-theme="penpot.theme">
    <RouterView />
  </main>
</template>
