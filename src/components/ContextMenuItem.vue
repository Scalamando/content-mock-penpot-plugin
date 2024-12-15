<script setup lang="ts">
import { Icon } from "@iconify/vue"
const props = defineProps<{
  icon?: string
}>()
</script>

<template>
  <li class="context-menu-item" role="menuitem">
    <span class="icon-wrapper">
      <Icon v-if="icon" :icon="`feather:${props.icon}`" class="icon" />
    </span>
    <slot />
  </li>
</template>

<style scoped>
.context-menu-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  height: 1.75rem;
  width: 100%;
  line-height: 1.33;
  padding: 0.375rem;
  border-radius: 0.5rem;
  cursor: pointer;

  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.4;
  color: var(--foreground-primary);

  &:hover {
    background-color: var(--background-quaternary);
  }

  .icon-wrapper {
    width: 1rem;

    .icon {
      display: block;
      width: 1rem;
      height: 1rem;
    }
  }
}
</style>
