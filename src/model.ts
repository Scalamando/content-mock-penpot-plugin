import type { Shape, Theme } from "@penpot/plugin-types"

export type SelectionShape = {
  id: string
  name: string
}

export type ContentCollection = {
  builtin: boolean
  id: string
  icon: string
  title: string
  content: string[]
}

export type PluginMessageEvent =
  | {
      type: "select"
      selection?: SelectionShape[]
    }
  | {
      type: "theme"
      theme: Theme
    }
  | {
      type: "load-collections"
      collections: ContentCollection[]
    }
  | {
      type: "load-onboarded"
      onboarded: boolean
    }
  | PluginGetDataMessage

export type PluginGetDataMessage<T = unknown> = {
  type: "get-data"
  key: string
  data: T
}

export type PluginResponse =
  | PluginLoadResponse
  | PluginCreateResponse
  | PluginReplaceResponse
  | PluginSmartReplaceResponse
  | PluginGetDataResponse
  | PluginSetDataResponse

export type PluginLoadResponse = {
  type: "load"
}

export type PluginCreateResponse = {
  type: "create"
  content: string[]
}

export type PluginReplaceResponse = {
  type: "replace"
  shapeIds: string[]
  content: string[]
}

export type PluginSmartReplaceResponse = {
  type: "smart-replace"
  replaceMap: Array<[Shape["id"], string]>
}

export type PluginGetDataResponse = {
  type: "get-data"
  key: string
}

export type PluginSetDataResponse<T = unknown> = {
  type: "set-data"
  key: string
  data: T
}
