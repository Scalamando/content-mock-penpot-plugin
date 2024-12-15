import type { PluginMessageEvent } from "@/model"
import { onMounted, onBeforeUnmount } from "vue"

export function onWindowMessage(cb: (event: PluginMessageEvent) => void) {
  const listener = (ev: MessageEvent<PluginMessageEvent>) => {
    cb(ev.data)
  }

  onMounted(() => {
    window.addEventListener("message", listener)
  })
  onBeforeUnmount(() => {
    window.removeEventListener("message", listener)
  })
}
