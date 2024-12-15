<script setup lang="ts">
import { Icon } from "@iconify/vue"
</script>

<template>
  <div class="card">
    <RouterLink class="content" to="/new">
      <Icon icon="feather:plus-square" class="icon" />
      <p class="name">New</p>
    </RouterLink>
  </div>
</template>

<style scoped>
.card .content {
  width: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  aspect-ratio: 1/1;
  border-radius: 0.5rem;

  text-align: center;
  cursor: pointer;
  color: var(--foreground-secondary);
  border: 2px solid var(--background-tertiary);
  background: transparent;
  text-decoration: none;

  &:hover {
    background: var(--background-quaternary);
    color: var(--foreground-primary);
  }
  &:active {
    background: var(--background-primary);
    color: var(--foreground-primary);
  }

  .icon {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    cursor: pointer;
  }
}
</style>
