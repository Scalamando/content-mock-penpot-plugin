import type { PluginGetDataMessage } from "@/model"
import { sendMessage } from "@/utils"
import { ref, watch, type MaybeRefOrGetter, type Ref } from "vue"
import { onWindowMessage } from "./onWindowMessages"

export function usePluginStorage<T extends string | number | boolean | object | null>(
  key: string,
  defaults: MaybeRefOrGetter<T>,
) {
  const data = ref(typeof defaults === "function" ? defaults() : defaults) as Ref<T>
  const isLoaded = ref(false)

  onWindowMessage((msg) => {
    if (msg.type !== "get-data" || msg.key !== key) return

    const { data: newData } = msg as PluginGetDataMessage<T>
    if (newData !== undefined) {
      data.value = newData
    }

    isLoaded.value = true
  })

  watch(data, (newData) => sendMessage({ type: "set-data", key, data: newData }), {
    deep: true,
  })

  sendMessage({ type: "get-data", key })

  return {
    data,
    isLoaded,
  }
}
