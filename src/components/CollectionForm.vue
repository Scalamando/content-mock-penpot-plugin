<script setup lang="ts">
import type { ContentCollection } from "@/model"
import { computed, ref, toValue } from "vue"
import PButton from "./PButton.vue"
import PInput from "./PInput.vue"
import PTextarea from "./PTextarea.vue"
import { usePenpotStore } from "@/stores/penpot"
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue"
import { Icon } from "@iconify/vue"
import PIconButton from "./PIconButton.vue"
import { useFetch } from "@vueuse/core"

const props = defineProps<{
  id?: string
  formTitle: string
}>()

const emits = defineEmits<{
  submit: [ContentCollection]
}>()

const penpot = usePenpotStore()
const collection = computed(() => penpot.collections.find((col) => col.id == props.id))

// Helper functions for the textarea content
const escapeLineBreaks = (str: string) => str.replace(/\n/g, "\\n")
const unescapeLineBreaks = (str: string) => str.replace(/\\n/g, "\n")

const title = ref(collection.value?.title ?? "")
const icon = ref(collection.value?.icon ?? "")
const content = ref(toValue(collection.value)?.content.map(escapeLineBreaks).join("\n") ?? "")

const { data: iconData, isFetching } = useFetch<{
  prefix: string
  total: number
  uncategorized: string[]
  categories: Record<string, string[]>
}>("https://api.iconify.design/collection?prefix=feather").json()
const feIcons = computed(() => {
  const iconNames = new Set<string>()
  for (const iconName of iconData.value?.uncategorized ?? []) {
    iconNames.add(iconName)
  }
  for (const category in iconData.value?.categories) {
    for (const iconName of iconData.value?.categories[category]) {
      iconNames.add(iconName)
    }
  }
  return Array.from(iconNames)
})

function onSubmit(e: Event) {
  e.preventDefault()

  const transformedContent = content.value
    .split(/\r?\n/g)
    .map((line) => unescapeLineBreaks(line.trim()))
    .filter((line) => line !== "")

  if (collection.value != null) {
    // Editing an existing collection
    emits("submit", {
      builtin: collection.value.builtin,
      id: collection.value.id,
      title: title.value,
      icon: icon.value,
      content: transformedContent,
    })
  } else {
    // New collection
    emits("submit", {
      builtin: false,
      id: crypto.randomUUID(),
      title: title.value,
      icon: icon.value,
      content: transformedContent,
    })
  }
}
</script>

<template>
  <div class="wrapper">
    <RouterLink to="/" class="back-link body-s">&longleftarrow; Discard and go back</RouterLink>

    <h2 class="headline-l">{{ props.formTitle }}</h2>
    <form class="form" @submit="onSubmit">
      <PInput
        id="title"
        label="Title"
        v-model="title"
        required
        :container-attrs="{ style: 'grid-area: title' }"
      />

      <PInput id="icon" label="Icon" :container-attrs="{ style: 'grid-area: icon' }">
        <Popover class="popover">
          <PopoverButton id="icon" class="popover-btn" data-appearance="secondary" type="button">
            <Icon :icon="`feather:${icon}`" height="16" />
            <Icon icon="feather:chevron-down" />
          </PopoverButton>
          <PopoverPanel class="popover-panel" v-slot="{ close }">
            <div class="grid" v-if="!isFetching">
              <PButton
                appearance="secondary"
                @click="
                  () => {
                    icon = ''
                    close()
                  }
                "
                class="clear"
              >Clear</PButton>
              <PIconButton
                v-for="feIcon in feIcons"
                :key="feIcon"
                :icon="`feather:${feIcon}`"
                :appearance="icon === feIcon ? 'primary' : 'secondary'"
                @click="
                  () => {
                    icon = feIcon
                    close()
                  }
                "
              />
            </div>
          </PopoverPanel>
        </Popover>
      </PInput>

      <PTextarea
        id="content"
        label="Content"
        v-model="content"
        :container-attrs="{ style: 'grid-area: content' }"
        :placeholder="`First Item\nItem with\\nline break`"
      >
        <template #hint>
          <p class="body-s">
            Each line will be treated as a separate item. Empty lines will be removed. Use '\n' for
            line breaks.
          </p>
        </template>
      </PTextarea>
      <PButton class="form-submit" style="grid-area: submit">Save</PButton>
    </form>
  </div>
</template>

<style scoped>
.wrapper {
  max-height: calc(100dvh - 1rem);
  height: 100%;
  display: flex;
  flex-direction: column;
}

.headline-l {
  margin-top: 1rem;
}

.form {
  margin-top: 0.75rem;
  display: grid;
  grid-template-columns: minmax(0px, 1fr) minmax(0px, auto);
  grid-template-areas: "title icon" "content content" "submit submit";
  gap: 0.75rem;
  height: 100%;
  min-height: 0;
  flex: 0 1 auto;
}

.form-submit {
  margin-top: 0.25rem;
}

:deep(.popover) {
  position: relative;
}

:deep(.popover-btn) {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding-block: 8px;
  padding-inline: 8px 6px;

  font-size: var(--font-size-s);
  line-height: var(--font-line-height-m);
}

:deep(.popover-panel) {
  position: absolute;
  right: 0;
  width: 300px;
  height: 300px;
  overflow-y: scroll;

  border-radius: var(--spacing-8);
  padding-block: var(--spacing-8);
  padding-inline: var(--spacing-8);
  background: var(--background-tertiary);
  box-shadow: 0px 0px 0.75rem 0px rgb(0 0 0 / 0.6);

  .grid {
    display: grid;
    gap: 0.5rem;
    grid-template-columns: repeat(auto-fit, minmax(2.5rem, 1fr));
    grid-auto-rows: 2.5rem;

    .clear {
      grid-column: 1 / span 2;
    }
  }
}
</style>
