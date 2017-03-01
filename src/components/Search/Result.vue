<template>
  <li class="search__result"
      v-bind:class="{ active: isActive }"
      v-on:click="onResultSelect">

    <input v-if="note.id == currentEditingId"
           class="search__result__editor"
           v-model="note.title"
           v-on:blur="onRenameBlur"
           v-on:keyup.enter="onRenameBlur"
           v-focus
           type="text">

    <span v-if="!(note.id == currentEditingId)"
          class="search__result__title">
          {{ note.title }}
          <span class="search__result__description"> – {{ note.body }}</span>
    </span>
    
    <span v-if="!(note.id == currentEditingId)"
          class="search__result__time">
          {{ note.date_modified | prettyDate }}
    </span>
  </li>
</template>

<script>
import { prettyDate } from '../../filters'

export default {
  name: 'result',

  props: ['note', 'activeNote', 'currentEditingId'],

  computed: {
    isActive: function () {
      return this.activeNote && this.note.id == this.activeNote.id
    }
  },

  methods: {
    onResultSelect () {
      this.$emit('onResultSelect', this.note)
    },

    onRenameBlur () {
      this.$emit('onRenameBlur')
    }
  }

}
</script>
