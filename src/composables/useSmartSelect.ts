import type { ContentCollection } from "@/model"
import { usePenpotStore } from "@/stores/penpot"
import { randomOf, sendMessage } from "@/utils"
import { computed } from "vue"

export interface SmartSelection {
  selectionId: string
  collectionId: string
}

const unify = (str: string) => str.trim().toLocaleLowerCase().replace(/\s/g, "-")

export function useSmartSelect() {
  const penpot = usePenpotStore()

  const unifiedCollection = computed(() =>
    penpot.collections.map((col) => ({
      id: col.id,
      title: unify(col.title),
    })),
  )

  const unifiedSelection = computed(() =>
    penpot.selection.map((sel) => ({
      id: sel.id,
      name: unify(sel.name),
    })),
  )

  const smartSelection = computed(() => {
    const selectMap: Array<SmartSelection> = []

    for (const selection of unifiedSelection.value) {
      const collection = findCollectionByTitle(selection.name)
      if (collection !== undefined) {
        selectMap.push({ selectionId: selection.id, collectionId: collection.id })
      }
    }

    return selectMap
  })

  const isSmartSelectPossible = computed(() => smartSelection.value.length > 0)

  function isSmartSelectable(collectionId: ContentCollection["id"]) {
    return smartSelection.value.some((sel) => sel.collectionId === collectionId)
  }

  function findCollectionByTitle(title: string) {
    return unifiedCollection.value.find((col) => title.includes(col.title))
  }

  function smartReplace(smartSelection: Array<SmartSelection>) {
    const replaceMapWithContent = smartSelection.map(
      ({ selectionId, collectionId }) =>
        [selectionId, randomOf(penpot.collectionsById[collectionId].content)] as [string, string],
    )
    sendMessage({ type: "smart-replace", replaceMap: replaceMapWithContent })
  }

  return {
    smartSelection,
    isSmartSelectPossible,
    isSmartSelectable,
    smartReplace,
  }
}
