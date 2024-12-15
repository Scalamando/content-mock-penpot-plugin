<script setup lang="ts">
import { Icon } from "@iconify/vue"

const props = defineProps<{
  id: string
  title: string
  icon: string
  smartReplaceable?: boolean
}>()

const selection = defineModel()
</script>

<template>
  <label class="card" :class="{ 'smart-replace': smartReplaceable }">
    <input
      :id="`col-custom-${props.id}`"
      type="radio"
      name="collection"
      :value="props.id"
      v-model="selection"
      class="input"
    />
    <div class="content">
      <Icon v-if="props.icon !== ''" :icon="`feather:${props.icon}`" class="icon" />
      <p class="name">{{ props.title }}</p>
      <Icon v-if="smartReplaceable" icon="feather:zap" class="smart-replace-icon" />
    </div>
  </label>
</template>

<style scoped>
.card {
  cursor: pointer;

  &.smart-replace {
    color: var(--accent-primary);
  }

  .content {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.25rem;
    padding: 0.5rem;
    text-align: center;
    aspect-ratio: 1/1;
    border-radius: 0.5rem;

    background: var(--background-tertiary);

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

    .smart-replace-icon {
      color: var(--accent-primary);
      position: absolute;
      top: 0.5rem;
      left: 0.5rem;
      width: 1rem;
      height: 1rem;
    }

    .name {
      hyphens: auto;
      overflow-wrap: break-word;
    }
  }

  &:focus-within .content {
    border: 2px solid var(--accent-primary);
    background: var(--background-primary);
  }

  .input {
    /* Screen reader only */
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;

    &:checked + .content {
      border: 2px solid var(--accent-primary);
      background: var(--background-primary);
    }
  }
}
</style>
