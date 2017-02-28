<template>
  <li class="search__result"
      v-bind:class="{ active: isActive }">
      <span class="search__result__title">{{ note.title }}<span class="search__result__description"> – {{ note.body }}</span></span>
      <span class="search__result__time">{{ note.date_modified | prettyDate }}</span>
  </li>
</template>

<script>
import { prettyDate } from '../../filters'

export default {
  name: 'result',

  props: ['note', 'activeNote'],

  computed: {
    isActive: function () {
      return this.activeNote && this.note.id == this.activeNote.id
    }
  }

}
</script>
