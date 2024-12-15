import { useCollections } from "@/composables/useCollections"
import { useSelection } from "@/composables/useSelection"
import { useTheme } from "@/composables/useTheme"
import { defineStore } from "pinia"

export const usePenpotStore = defineStore("penpot", () => {
  const theme = useTheme()
  const selection = useSelection()
  const {
    collections,
    byId: collectionsById,
    create: createCollection,
    update: updateCollection,
    remove: removeCollection,
    reset: resetCollections,
    importNew: importCollections,
  } = useCollections()

  return {
    theme,
    selection,
    collections,
    collectionsById,
    createCollection,
    updateCollection,
    removeCollection,
    resetCollections,
    importCollections,
  }
})
