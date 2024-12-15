<script setup lang="ts">
import PButton from "@/components/PButton.vue"
import PModal from "@/components/PModal.vue"
import type { ContentCollection } from "@/model"
import { usePenpotStore } from "@/stores/penpot"
import { Icon } from "@iconify/vue"
import { useFileDialog } from "@vueuse/core"
import { ref } from "vue"

const penpot = usePenpotStore()

// Export

function exportCollections() {
  const blob = new Blob([JSON.stringify(penpot.collections)], { type: "application/json" })
  const url = URL.createObjectURL(blob)
  const filename = `penpot-content-mock-export-${new Date().toISOString()}.json`

  // Initiate download
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  document.body.appendChild(a)
  a.click()

  // Clean up
  document.body.removeChild(a)
  setTimeout(() => URL.revokeObjectURL(a.href), 40 * 1000) // 40s
}

// Import

type ImportModalStatus =
  | { status: "closed" }
  | { status: "success"; newCollections: ContentCollection[] }
  | { status: "failure" }
const importModal = ref<ImportModalStatus>({ status: "closed" })

const { open: openImportDialog, onChange: onImportFileChange } = useFileDialog({
  multiple: false,
  accept: "application/json",
  reset: true,
})

onImportFileChange(async (files) => {
  if (files === null) return

  const [fileToImport] = files
  const jsonCollections = await fileToImport.text()

  try {
    const collections = JSON.parse(jsonCollections)
    const newCollections = penpot.importCollections(collections)
    importModal.value = { status: "success", newCollections }
  } catch (error) {
    console.error(
      "Failed to the selected file. Please open an issue at https://github.com/Scalamando/content-mock-penpot-plugin/issues with your file and the following error message attached:\n",
      error,
    )
    importModal.value = { status: "failure" }
  }
})

// Reset

const showResetModal = ref(false)

function reset() {
  penpot.resetCollections()
  showResetModal.value = false
}
</script>

<template>
  <RouterLink to="/" class="back-link body-s view-margin">&longleftarrow; Go back</RouterLink>

  <h1 class="headline-l">Settings</h1>

  <div class="settings-group">
    <h2 class="headline-m">Export Collections</h2>
    <p class="body-m">
      Export a backup of all your collections, including changes to built-in collections.
    </p>
    <PButton @click="exportCollections" class="button">
      <template #icon-left>
        <Icon icon="feather:download" class="icon" />
      </template>
      Export
    </PButton>
  </div>

  <div class="settings-group">
    <h2 class="headline-m">Import Collections</h2>
    <p class="body-m">Import collections from a backup file.</p>
    <PButton @click="() => openImportDialog()" class="button">
      <template #icon-left>
        <Icon icon="feather:file-plus" class="icon" />
      </template>
      Import
    </PButton>
  </div>

  <div class="settings-group">
    <h2 class="headline-m">Reset Collections</h2>
    <p class="body-m">
      WARNING: This will reset all collections, including your custom collections.
    </p>
    <PButton @click="showResetModal = true" variant="destructive" class="button">
      <template #icon-left>
        <Icon icon="feather:trash" class="icon" />
      </template>
      Reset
    </PButton>
  </div>

  <!-- Import Success Modal -->
  <PModal
    :title="importModal.status === 'success' ? 'Import Successful' : 'Import Failed'"
    :open="importModal.status !== 'closed'"
  >
    <template v-if="importModal.status === 'success'">
      <p class="body-m">
        The following {{ importModal.newCollections.length }} collections were imported:
      </p>
      <ol class="body-m">
        <li v-for="col in importModal.newCollections" :key="col.id">{{ col.title }}</li>
      </ol>
    </template>
    <template v-else>
      <p class="body-m">
        An error occured when trying to import the selected file. The file may be corrupted. Please
        check the browser console for more details.
      </p>
    </template>
    <template #actions>
      <PButton @click="importModal = { status: 'closed' }" class="action-btn">Ok</PButton>
    </template>
  </PModal>

  <!-- Reset Confirmation Modal -->
  <PModal title="Are you sure?" :open="showResetModal">
    <p class="body-m">Proceeding will delete all your customizations.</p>
    <template #actions>
      <PButton @click="reset" variant="destructive" class="action-btn">Yes</PButton>
      <PButton @click="showResetModal = false" appearance="secondary" class="action-btn"
        >No, don't reset</PButton
      >
    </template>
  </PModal>
</template>

<style scoped>
.headline-l {
  margin-top: 1rem;
}

.settings-group {
  border-top: 1px solid var(--background-quaternary);
  margin-top: 1.25rem;
  padding-top: 1rem;

  &:first-of-type {
    margin-top: 0.5rem;
  }

  .body-m {
    margin-top: 0.5rem;
  }

  .button {
    margin-top: 0.75rem;
  }
}

.body-m {
  margin-top: 0.5rem;
}

.action-btn {
  width: 100%;
  flex: 1 0 0;
  text-wrap: nowrap;
}

.modal-overlay {
  position: absolute;
  inset: 0;
  backdrop-filter: blur(2px);
}
</style>
