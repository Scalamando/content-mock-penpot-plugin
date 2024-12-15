<script setup lang="ts">
import CollectionCardNew from "@/components/CollectionCardNew.vue"
import CollectionCardRadio from "@/components/CollectionCardRadio.vue"
import ContextMenu from "@/components/ContextMenu.vue"
import ContextMenuItem from "@/components/ContextMenuItem.vue"
import PButton from "@/components/PButton.vue"
import PIconButton from "@/components/PIconButton.vue"
import { useSmartSelect } from "@/composables/useSmartSelect"
import type { ContentCollection } from "@/model"
import { usePenpotStore } from "@/stores/penpot"
import { sendMessage } from "@/utils"
import { Icon } from "@iconify/vue"
import { useEventListener } from "@vueuse/core"
import { computed, ref, toValue, type DeepReadonly } from "vue"
import { useRoute } from "vue-router"

const penpot = usePenpotStore()

// COLLECTIONS

const byTitle = (a: DeepReadonly<ContentCollection>, b: DeepReadonly<ContentCollection>) =>
  a.title.localeCompare(b.title)

const builtinCollections = computed(() =>
  penpot.collections.filter((col) => col.builtin).sort(byTitle),
)
const customCollections = computed(() =>
  penpot.collections.filter((col) => !col.builtin).sort(byTitle),
)

// SELECTION

const selectedCollectionId = ref("")
const { smartSelection, isSmartSelectPossible, isSmartSelectable, smartReplace } = useSmartSelect()

// Select collection by query `id`
const { id: queryId } = useRoute().query
if (queryId != null && typeof queryId === "string") {
  selectedCollectionId.value = queryId
}

// Deselect collection on click outside
useEventListener(document, "click", (e) => {
  const target = e.target as HTMLElement
  const isOutside =
    !target.classList.contains("input") &&
    !target.classList.contains("content") &&
    !target.classList.contains("icon") &&
    !target.classList.contains("action-btn")

  if (isOutside) {
    selectedCollectionId.value = ""
  }
})

function createOrReplaceText() {
  if (selectedCollectionId.value === "") return

  const collection = penpot.collections.find((c) => c.id === selectedCollectionId.value)
  if (collection == null) return

  if (penpot.selection.length > 0) {
    sendMessage({
      type: "replace",
      content: toValue(collection.content) as string[],
      shapeIds: penpot.selection.map((s) => s.id),
    })
  } else {
    sendMessage({
      type: "create",
      content: toValue(collection.content) as string[],
    })
  }
}

// Scroll Box Shadow
const scrollTop = ref(0)
const isScrolled = computed(() => scrollTop.value > 0)
</script>

<template>
  <div class="start-view-wrapper">
    <div class="action-wrapper" :class="{ 'scroll-shadow': isScrolled }">
      <!-- Create / Replace -->
      <PButton v-if="selectedCollectionId === ''" class="main-btn" disabled
        >Select a collection</PButton
      >
      <PButton
        v-else-if="penpot.selection.length === 0"
        class="main-btn"
        @click="createOrReplaceText()"
      >
        <template #icon-left>
          <Icon icon="feather:plus-square" class="icon" />
        </template>
        <span class="text">Insert {{ penpot.collectionsById[selectedCollectionId].title }}</span>
      </PButton>
      <PButton v-else class="main-btn" @click="createOrReplaceText()">
        <template #icon-left>
          <Icon icon="feather:repeat" class="icon" />
        </template>
        <span class="text"
          >Replace {{ penpot.selection.length }} instance{{
            penpot.selection.length > 1 ? "s" : ""
          }}</span
        >
      </PButton>

      <!-- Smart Replace -->
      <PIconButton
        @click="smartReplace(smartSelection)"
        :disabled="!isSmartSelectPossible"
        icon="feather:zap"
        class="smart-replace-btn"
        :icon-class="isSmartSelectPossible ? 'icon-ping' : undefined"
      />

      <!-- Settings -->
      <PIconButton
        asLink="/settings"
        icon="feather:settings"
        appearance="secondary"
        class="settings-btn"
        icon-class="icon"
      />

      <!-- Help -->
      <PIconButton
        asLink="/help"
        icon="feather:help-circle"
        appearance="secondary"
        class="help-btn"
        icon-class="icon"
      />
    </div>

    <ContextMenu :initial-context="{ id: '' }">
      <template #menu="{ context }">
        <ContextMenuItem icon="edit" @click="$router.push(`/edit/${context.id}`)"
          >Edit</ContextMenuItem
        >
        <ContextMenuItem icon="trash" @click="penpot.removeCollection(context.id)"
          >Delete</ContextMenuItem
        >
      </template>
      <template v-slot="{ showMenu }">
        <div
          class="collections-wrapper"
          @scroll="scrollTop = ($event.target as HTMLElement).scrollTop"
        >
          <h2 class="headline-s">Your Collections</h2>
          <div class="collection-grid custom">
            <CollectionCardRadio
              v-for="col in customCollections"
              :key="col.id"
              @contextmenu="showMenu($event, { id: col.id })"
              :id="col.id"
              :title="col.title"
              :icon="col.icon"
              :smart-replaceable="isSmartSelectable(col.id)"
              v-model="selectedCollectionId"
            />
            <CollectionCardNew />
          </div>

          <template v-if="builtinCollections.length > 0">
            <h2 class="headline-s">Built-in Collections</h2>
            <div class="collection-grid">
              <CollectionCardRadio
                v-for="col in builtinCollections"
                :key="col.id"
                @contextmenu="showMenu($event, { id: col.id })"
                :id="col.id"
                :title="col.title"
                :icon="col.icon"
                :smart-replaceable="isSmartSelectable(col.id)"
                v-model="selectedCollectionId"
              />
            </div>
          </template>
        </div>
      </template>
    </ContextMenu>
  </div>
</template>

<style scoped>
.start-view-wrapper {
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100vh;
}

.action-wrapper {
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  gap: 0.5rem;
  z-index: 10;
  padding: 0.5rem 0;
  background: var(--background-primary);
  transition: box-shadow 200ms ease-in-out;

  &.scroll-shadow {
    box-shadow: 0px 1px 0.75rem 0px rgb(0 0 0 / 0.3);
  }
}

.collections-wrapper {
  z-index: 0;
  overflow-y: scroll;
}

.headline-s {
  margin-top: 1rem;
  & ~ .collection-grid {
    margin-top: 0.5rem;
  }
}

.collection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 0.75rem;
}

@keyframes ping {
  0% {
    scale: 100%;
    rotate: 0deg;
  }

  50% {
    scale: 150%;
    rotate: 10deg;
  }

  100% {
    scale: 100%;
    rotate: 0deg;
  }
}

:deep(.icon-ping) {
  animation: 600ms ping cubic-bezier(0.65, 0, 0.35, 1);
}
:deep(.smart-replace-btn) {
  :deep(.icon-ping) {
    transition:
      scale 300ms cubic-bezier(0.65, 0, 0.35, 1),
      rotate 300ms cubic-bezier(0.65, 0, 0.35, 1);
  }

  &:hover :deep(.icon-ping) {
    scale: 130%;
    rotate: 7deg;
  }
}

.main-btn {
  padding: 8px !important;
  min-width: 0;
  .text {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

:deep(.settings-btn, .help-btn) {
  :deep(.icon) {
    transition: rotate 300ms cubic-bezier(0.65, 0, 0.35, 1);
  }
}

.settings-btn:hover :deep(.icon) {
  rotate: 120deg;
}

.help-btn:hover :deep(.icon) {
  rotate: 20deg;
}
</style>
