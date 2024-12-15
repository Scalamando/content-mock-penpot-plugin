<script setup lang="ts">
import { Icon } from "@iconify/vue"
import type { RouteLocationRaw } from "vue-router"

const props = withDefaults(
  defineProps<{
    icon: string
    appearance?: "primary" | "secondary"
    variant?: "default" | "destructive"
    asLink?: RouteLocationRaw
    iconClass?: string
  }>(),
  {
    appearance: "primary",
    variant: "default",
  },
)
</script>

<template>
  <RouterLink v-if="asLink" :to="asLink" :data-appearance="props.appearance" class="icon-btn">
    <Icon :icon="props.icon" class="icon" />
  </RouterLink>
  <button
    v-else
    type="button"
    :data-appearance="props.appearance"
    :data-variant="props.variant === 'default' ? undefined : props.variant"
    class="icon-btn"
  >
    <Icon :icon="props.icon" class="icon" :class="props.iconClass" />
  </button>
</template>

<style scoped>
.icon-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;

  font-size: 16px;
  border-radius: 8px;
  line-height: 1.2;
  padding: 4px 8px;

  .icon {
    width: 1rem;
    height: 1rem;
    margin-block: -0.25rem;
  }
}
</style>
