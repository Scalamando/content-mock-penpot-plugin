import type { ContentCollection } from "@/model"
import { computed, readonly } from "vue"
import { usePluginStorage } from "./usePluginStorage"
import builtinCollections from "@/assets/collections.json"

export function useCollections() {
  const { data: collections } = usePluginStorage<ContentCollection[]>(
    "collections",
    builtinCollections,
  )
  const collectionsById = computed(() =>
    Object.fromEntries(collections.value.map((col) => [col.id, col])),
  )

  function create(newCollection: ContentCollection) {
    collections.value.push(newCollection)
  }

  function update(
    id: ContentCollection["id"],
    updatedCollection: Omit<ContentCollection, "id" | "builtin">,
  ) {
    const index = collections.value.findIndex((col) => col.id === id)
    if (index === -1) return

    collections.value[index] = {
      ...collections.value[index],
      icon: updatedCollection.icon,
      title: updatedCollection.title,
      content: updatedCollection.content,
    }
  }

  function remove(id: ContentCollection["id"]) {
    const index = collections.value.findIndex((col) => col.id === id)
    if (index === -1) return

    collections.value.splice(index, 1)
  }

  function reset() {
    collections.value = builtinCollections
  }

  function importNew(importedCollections: ContentCollection[]) {
    const newCollections = importedCollections.filter(
      (icol) => collections.value.findIndex((col) => icol.id === col.id) === -1,
    )
    // TODO: validate new collections
    collections.value.push(...newCollections)

    return newCollections
  }

  return {
    collections: readonly(collections),
    byId: collectionsById,
    create,
    update,
    remove,
    reset,
    importNew,
  }
}
