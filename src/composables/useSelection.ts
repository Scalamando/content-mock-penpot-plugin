import type { SelectionShape } from "@/model"
import { ref } from "vue"
import { onWindowMessage } from "./onWindowMessages"

export function useSelection() {
  const selection = ref<SelectionShape[]>([])

  onWindowMessage((ev) => {
    if (ev.type === "select") {
      selection.value = ev.selection ?? []
    }
  })

  return selection
}
