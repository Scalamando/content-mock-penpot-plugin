<script setup lang="ts">
import CollectionForm from "@/components/CollectionForm.vue"
import type { ContentCollection } from "@/model"
import { usePenpotStore } from "@/stores/penpot"
import { useRouter } from "vue-router"

const props = defineProps<{
  id: string
}>()

const router = useRouter()

const penpot = usePenpotStore()

function update(col: ContentCollection) {
  penpot.updateCollection(props.id, {
    title: col.title,
    icon: col.icon,
    content: col.content,
  })
  router.push("/")
}
</script>

<template>
  <CollectionForm class="view-margin" form-title="Edit Collection" :id="props.id" @submit="update" />
</template>
