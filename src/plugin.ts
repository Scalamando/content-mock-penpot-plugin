import type { Shape } from "@penpot/plugin-types"
import type {
  PluginCreateResponse,
  PluginGetDataResponse,
  PluginMessageEvent,
  PluginReplaceResponse,
  PluginResponse,
  PluginSetDataResponse,
  SelectionShape,
} from "./model"

penpot.ui.open("ContentMock", `?theme=${penpot.theme}`)

penpot.on("selectionchange", () => {
  sendMessage({ type: "select", selection: resolveShapes(penpot.selection) })
})

penpot.on("themechange", (theme) => {
  sendMessage({ type: "theme", theme })
})

penpot.ui.onMessage<PluginResponse>((msg) => {
  switch (msg.type) {
    case "load":
      initPlugin()
      break
    case "create":
      createText(msg)
      break
    case "replace":
      replaceSelection(msg)
      break
    case "smart-replace":
      smartReplace(msg.replaceMap)
      break
    case "get-data":
      getData(msg)
      break
    case "set-data":
      setData(msg)
      break
  }
})

function initPlugin() {
  // Send the initial selection on plugin load
  sendMessage({ type: "select", selection: resolveShapes(penpot.selection) })
}

function createText(msg: PluginCreateResponse) {
  const text = penpot.createText(randomOf(msg.content))
  if (text) {
    text.x = penpot.viewport.center.x
    text.y = penpot.viewport.center.y
    penpot.selection = [text]
  }
}

function replaceSelection(msg: PluginReplaceResponse) {
  for (const id of msg.shapeIds) {
    const shape = penpot.currentPage?.getShapeById(id)
    if (shape?.type !== "text") continue

    // NOTE: Penpot seems to delete fills sometimes
    const shapeFills = shape.fills
    shape.characters = randomOf(msg.content)
    shape.fills = shapeFills
  }
}

function smartReplace(replaceMap: Array<[Shape["id"], string]>) {
  for (const [id, content] of replaceMap) {
    const shape = penpot.currentPage?.getShapeById(id)
    if (shape?.type !== "text") continue

    // NOTE: Penpot seems to delete fills sometimes
    const shapeFills = shape.fills
    shape.characters = content
    shape.fills = shapeFills
  }
}

function setData({ key, data }: PluginSetDataResponse) {
  penpot.currentFile?.setPluginData(key, JSON.stringify(data))
}

function getData({ key }: PluginGetDataResponse) {
  let data: unknown
  try {
    data = JSON.parse(penpot.currentFile!.getPluginData(key) ?? "undefined")
  } catch (_err) {
    data = undefined
  }
  sendMessage({ type: "get-data", key, data })
}

function sendMessage(message: PluginMessageEvent) {
  penpot.ui.sendMessage(message)
}

function randomOf<T>(array: T[]): T {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}

function resolveShapes(shapes: Shape[]): Array<SelectionShape> {
  return shapes.flatMap((shape) => {
    switch (shape.type) {
      case "group":
      case "board":
        return resolveShapes(shape.children)
      case "text":
        return [
          {
            id: shape.id,
            name: shape.name,
          },
        ]
      default:
        return []
    }
  })
}
