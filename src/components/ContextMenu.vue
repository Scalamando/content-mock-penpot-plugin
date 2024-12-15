<script setup lang="ts" generic="T extends Record<string, any>">
import { useMouse } from "@vueuse/core"
import { ref, toRaw, useTemplateRef, watch, type Ref } from "vue"

const props = defineProps<{
  initialContext: T
}>()

const show = defineModel()
const rootEl = useTemplateRef("rootEl")

const context = ref(toRaw(props.initialContext)) as Ref<T>

const { x: mouseX, y: mouseY } = useMouse()
const position = ref({
  left: 0,
  top: 0,
})

watch(show, (isShowing) => {
  if (isShowing) {
    setupListeners()

    // NOTE: The plugin wrapper hides overflow, so we need to keep the menu inside
    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize)
    const menuWidth = 15 * rem

    position.value = {
      left: Math.min(mouseX.value, document.body.offsetWidth - menuWidth),
      top: mouseY.value,
    }
  } else {
    removeListeners()
  }
})

function showMenu(e: Event, ctx?: T) {
  e.preventDefault()
  if (ctx != null) {
    context.value = ctx
  }
  show.value = true
}

function setupListeners() {
  document.addEventListener("click", onDocumentAction, true)
  document.addEventListener("contextmenu", onDocumentAction, true)
}

function removeListeners() {
  document.removeEventListener("click", onDocumentAction, true)
  document.removeEventListener("contextmenu", onDocumentAction, true)
}

function onDocumentAction(e: Event) {
  if (e.target !== rootEl.value || !rootEl.value?.contains(e.target as HTMLElement)) {
    // Clicked element is not part of the context menu
    show.value = false
  }
}
</script>

<template>
  <slot v-bind="{ showMenu }" />
  <Teleport to="body">
    <div class="context-menu-wrapper" @contextmenu="$event.preventDefault()">
      <ul
        ref="rootEl"
        v-if="show"
        class="context-menu"
        :style="{ top: position.top + 'px', left: position.left + 'px' }"
        tabindex="-1"
        role="menu"
        aria-orientation="vertical"
      >
        <slot name="menu" v-bind="{ context }" />
      </ul>
    </div>
  </Teleport>
</template>

<style scoped>
.context-menu-wrapper {
  display: contents;
}

.context-menu {
  --menu-shadow-color: rgb(0 0 0 / 0.6);
  --panel-border-color: var(--background-quaternary);
  --menu-background-color: var(--background-tertiary);

  position: absolute;
  display: grid;
  width: 15rem;
  max-height: 100vh;
  overflow-y: auto;
  padding: 0.25rem;
  border-radius: 0.5rem;
  box-shadow: 0px 0px 0.75rem 0px var(--menu-shadow-color);
  border: 0.125rem solid var(--panel-border-color);
  background-color: var(--menu-background-color);
}
</style>
