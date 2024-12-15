<script setup lang="ts">
import { useTextareaAutosize } from "@vueuse/core"
import { useAttrs, type BaseHTMLAttributes } from "vue"

const props = defineProps<{
  id: string
  label: string
  containerAttrs: BaseHTMLAttributes
}>()

const value = defineModel<string>()
const attrs = useAttrs()

const { textarea, input } = useTextareaAutosize({
  input: value,
})
</script>

<template>
  <div class="form-group" v-bind="containerAttrs">
    <label :for="props.id" class="label">{{ props.label }}</label>
    <slot name="hint" />
    <textarea ref="textarea" v-model="input" class="input textarea" v-bind="attrs" />
  </div>
</template>

<style scoped>
.form-group {
  min-height: 0rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  .label {
    font-size: 0.75rem;
    line-height: 1.2;
    text-transform: uppercase;
    font-weight: 500;
  }

  .textarea {
    min-height: calc(2rem * 1.75); /* 2 lines */
    line-height: 1.75;
    text-wrap: nowrap;
    resize: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
