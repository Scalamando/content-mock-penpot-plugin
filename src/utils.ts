import { toRaw, isRef, isReactive, isProxy } from "vue"
import type { PluginResponse } from "./model"

/* eslint-disable @typescript-eslint/no-explicit-any */
export function deepToRaw<T extends Record<string, any>>(sourceObj: T): T {
  const objectIterator = (input: any): any => {
    if (Array.isArray(input)) {
      return input.map((item) => objectIterator(item))
    }
    if (isRef(input) || isReactive(input) || isProxy(input)) {
      return objectIterator(toRaw(input))
    }
    if (input && typeof input === "object") {
      return Object.keys(input).reduce((acc, key) => {
        acc[key as keyof typeof acc] = objectIterator(input[key])
        return acc
      }, {} as T)
    }
    return input
  }

  return objectIterator(sourceObj)
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export function sendMessage(msg: PluginResponse) {
  parent.postMessage(deepToRaw(msg), "*")
}

export function randomOf<T>(array: T[]): T {
  const index = Math.floor(Math.random() * array.length)
  return array[index]
}
