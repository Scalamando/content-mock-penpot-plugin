<script setup lang="ts">
import PButton from "@/components/PButton.vue"
import { usePluginStorage } from "@/composables/usePluginStorage"
import { Icon } from "@iconify/vue/dist/iconify.js"
import { onBeforeRouteLeave } from "vue-router"

const { data: onboarded } = usePluginStorage<boolean>("onboarded", false)
onBeforeRouteLeave(() => {
  console.log("beforeLeave", { onboarded })
  onboarded.value = true
})
</script>

<template>
  <div class="view-margin">
    <h1 class="title-l">Welcome to ContentMock!</h1>
    <p class="body-l">
      Say goodbye to lorem ipsum &mdash; quickly replace placeholders with realistic, usable
      content.
    </p>

    <h2 class="headline-l">How to Get Started</h2>
    <ol class="body-l">
      <li>Open ContentMock and select a collection.</li>
      <li>In Penpot, select one or more text layers.</li>
      <li>Click <strong>'Replace X instances'</strong> in ContentMock.</li>
    </ol>

    <video autoplay muted loop playsinline class="onboarding-video">
      <source src="/get-started.webm" type="video/webm" />
    </video>

    <h2 class="headline-l">SmartReplace</h2>
    <p class="body-l">
      Save time with SmartReplace! It automatically matches and replaces layers based on collection
      names.
    </p>
    <video autoplay muted loop playsinline class="onboarding-video">
      <source src="/smart-replace.webm" type="video/webm" />
    </video>
    <p class="body-l">
      Look for the <Icon icon="feather:zap" /> symbol on collections after making a selection. Click
      the <Icon icon="feather:zap" /> button to replace all matching layers instantly.
    </p>

    <PButton asLink="/" class="ack-btn">Got it!</PButton>
  </div>
</template>

<style scoped>
h2 {
  margin-top: 1rem;
  + p {
    margin-top: 0.75rem;
  }
}
p {
  margin-top: 0.5rem;
}
.ack-btn {
  width: 100%;
  margin-top: 0.5rem;
}
.onboarding-video {
  width: 100%;
}
</style>
