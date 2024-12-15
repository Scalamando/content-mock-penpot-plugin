<script setup lang="ts">
import { RouterLink, type RouteLocationRaw } from "vue-router"

const props = withDefaults(
  defineProps<{
    appearance?: "primary" | "secondary"
    variant?: "default" | "destructive"
    asLink?: RouteLocationRaw
  }>(),
  {
    appearance: "primary",
    variant: "default",
  },
)
</script>

<template>
  <component
    :is="asLink != null ? RouterLink : 'button'"
    :to="asLink"
    :data-appearance="props.appearance"
    :data-variant="props.variant === 'default' ? undefined : props.variant"
    class="button"
    :class="{
      'icon-left': $slots['icon-left'] != null,
      'icon-right': $slots['icon-right'] != null,
    }"
  >
    <div v-if="$slots['icon-left']" class="icon">
      <slot name="icon-left" />
    </div>
    <slot />
    <div v-if="$slots['icon-right']" class="icon">
      <slot name="icon-right" />
    </div>
  </component>
</template>

<style scoped>
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  &:not(:disabled) {
    cursor: pointer;
  }

  &.icon-left {
    padding-left: 1.25rem;
  }

  &.icon-right {
    padding-right: 1.25rem;
  }

  .icon {
    width: 1rem;
    height: 1rem;
    margin-block: -0.25rem;
  }
}
</style>
