<script setup lang="ts">
import { Icon } from "@iconify/vue"
</script>

<template>
  <RouterLink to="/" class="back-link body-s view-margin">&longleftarrow; Go back</RouterLink>

  <section class="section">
    <h2 class="headline headline-s">Insert & Replace Content</h2>
    <details class="item">
      <summary class="title body-l">How do I insert content?</summary>
      <div class="body body-m">
        Select a collection by clicking on it and use the "Insert &lt;collection name&gt;" button at
        the top.
      </div>
    </details>
    <details class="item">
      <summary class="title body-l">How do I replace my selection with content?</summary>
      <div class="body body-m">
        Select a collection by clicking on it and use the "Replace &lt;x&gt; instaces" button at the
        top.
      </div>
    </details>
    <details class="item">
      <summary class="title body-l">How do I replace multiple texts at once?</summary>
      <div class="body body-m">
        Select multiple layers of a layer containing multiple texts (e.g. a board). The replace
        button will tell you the number of instaces to be replaced with your chosen collection.
        <strong>Alternatively,</strong> use SmartReplace to deal with multiple types of contents at
        once.
      </div>
    </details>
    <details class="item">
      <summary class="title body-l">How do I insert/replace images?</summary>
      <div class="body body-m">ContentMock currently does <strong>not</strong> support images.</div>
    </details>
  </section>
  <section class="section">
    <h2 class="headline headline-s">Smart Replace</h2>
    <details class="item">
      <summary class="title body-l">How do I use SmartReplace?</summary>
      <div class="body body-m">
        SmartReplace tries to intelligently replace your contents by matching the names of your
        layers to a collection. Name your layers according to a collection and add them your
        selection. If a match is found the SmartReplace button (<Icon icon="feather:zap" />) and
        relevant collections will light up to inform you that a SmartReplace is possible.
      </div>
    </details>
    <details class="item">
      <summary class="title body-l">How does SmartReplace work?</summary>
      <div class="body body-m">
        SmartReplace looks for layers in your selection whose name matches that of a collection and
        replaces them with that collection. For example, a layer in your selection named "user phone
        number" would be replaced with content from the built-in "Phone Number" collection.
      </div>
    </details>
  </section>
  <section class="section">
    <h2 class="headline headline-s">Collections</h2>
    <details class="item">
      <summary class="title body-l">What are collections?</summary>
      <div class="body body-m">
        Collections group related content like a bunch of phone numbers, usernames of anything else
        you can think of. You can use them to insert or replace content of a certain type.
        SmartReplace additionally allows you to replace texts by their content type.
      </div>
    </details>
    <details class="item">
      <summary class="title body-l">How do I create my own collection?</summary>
      <div class="body body-m">
        Click on the "New <Icon icon="feather:plus-square" />" button under the "Your Collections"
        section.
      </div>
    </details>
    <details class="item">
      <summary class="title body-l">How do I edit a collection?</summary>
      <div class="body body-m">
        Right click the collection you want to edit and select "<Icon icon="feather:edit" /> Edit"
        in the context menu.
      </div>
    </details>
    <details class="item">
      <summary class="title body-l">How do I remove a collection?</summary>
      <div class="body body-m">
        Right click the collection you want to remove and select "<Icon icon="feather:trash" />
        Remove" in the context menu. WARNING: This action is final and cannot be reversed.
      </div>
    </details>
  </section>
</template>

<style scoped>
.section {
  margin-top: 1.5rem;

  .item {
    margin-top: 1rem;

    background: var(--background-tertiary);
    border-radius: 0.5rem;
    overflow: hidden;

    .title {
      padding: 0.5rem;
    }

    .body {
      background: var(--background-quaternary);
      padding: 0.75rem;
    }
  }
}
</style>
