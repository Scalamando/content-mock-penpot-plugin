import type { Theme } from "@penpot/plugin-types"
import { ref, onMounted, watch, readonly } from "vue"
import { onWindowMessage } from "./onWindowMessages"

export function useTheme() {
  const theme = ref<Theme>()

  onMounted(() => {
    const url = new URL(window.location.href)
    const initialTheme = url.searchParams.get("theme")
    if (initialTheme != null) {
      theme.value = initialTheme as Theme
    }
  })

  watch(theme, (newTheme) => {
    if (newTheme !== undefined) {
      document.body.setAttribute("data-theme", newTheme)
    }
  })

  onWindowMessage((ev) => {
    if (ev.type === "theme") {
      theme.value = ev.theme
    }
  })

  return readonly(theme)
}
