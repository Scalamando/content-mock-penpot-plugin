<script setup lang="ts">
import CollectionForm from "@/components/CollectionForm.vue"
import type { ContentCollection } from "@/model"
import { usePenpotStore } from "@/stores/penpot"
import { useRouter } from "vue-router"

const router = useRouter()
const penpot = usePenpotStore()

function create(col: ContentCollection) {
  penpot.createCollection(col)
  router.push(`/?id=${col.id}`) // Select new collection after creation
}
</script>

<template>
  <CollectionForm class="view-margin" form-title="New Collection" @submit="create" />
</template>
