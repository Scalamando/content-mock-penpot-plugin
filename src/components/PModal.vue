<script setup lang="ts">
import PButton from "./PButton.vue"

const props = defineProps<{
  title: string
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()
</script>

<template>
  <Teleport to="body" v-if="open">
    <div class="modal-overlay"></div>
    <div class="modal import-reset-modal">
      <h2 class="headline-l">{{ props.title }}</h2>
      <div class="body"><slot /></div>
      <div class="actions">
        <slot name="actions">
          <PButton @click="emit('close')">Ok</PButton>
        </slot>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.modal-overlay {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(2px);
}

.modal {
  --menu-shadow-color: rgb(0 0 0 / 0.6);
  --panel-border-color: var(--background-tertiary);
  --menu-background-color: var(--background-primary);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85%;

  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 0.75rem 0px var(--menu-shadow-color);
  border: 0.125rem solid var(--panel-border-color);
  background-color: var(--menu-background-color);

  .headline-l {
    margin-top: 0;
  }

  .body {
    margin-top: 0.5rem;
  }

  .actions {
    display: flex;
    gap: 0.5rem;
    margin-top: 0.75rem;
  }
}
</style>
