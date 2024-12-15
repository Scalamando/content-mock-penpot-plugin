<script setup lang="ts">
import { useAttrs, type BaseHTMLAttributes } from "vue"

const props = defineProps<{
  id: string
  label: string
  containerAttrs?: BaseHTMLAttributes
}>()

const value = defineModel()
const attrs = useAttrs()
</script>

<template>
  <div class="form-group" v-bind="containerAttrs">
    <label :for="props.id" class="label">{{ props.label }}</label>
    <slot>
      <input :id="props.id" class="input" v-model="value" v-bind="attrs" />
    </slot>
  </div>
</template>

<style scoped>
.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .label {
    font-size: 0.75rem;
    line-height: 1.2;
    text-transform: uppercase;
    font-weight: 500;
  }
}
</style>
