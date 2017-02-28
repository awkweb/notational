<template>
  <div id="search" class="search">
    <input id="search-input"
           class="search__input"
           type="text"
           v-model="query"
           v-on:keyup.enter="onSearch"
           v-on:keyup.esc="onEscape"
           v-on:keyup.up="onKeyUp"
           v-on:keyup.down="onKeyDown"
           placeholder="Search or create"
           autofocus>
    
    <ul class="search__results">
      <result v-for="note in notes"
              v-bind:note="note"
              v-bind:activeNote="activeNote"
              v-on:onResultSelect="onSelect">
      </result>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Result from './Result.vue'

export default {
  name: 'search',

  props: ['activeNote', 'notes'],

  data () {
  	return {
      query: null,
      currentResultIndex: -1
  	}
  },

  components: {
    Result
  },

  methods: {
    onSearch () {
      if (this.activeNote) {
        this.$emit('onSearch')
      }
    },

    onEscape () {
      this.currentResultIndex = -1
      this.setActiveNote(null)
    },

    onKeyUp () {
      if (this.currentResultIndex > 0) {
        this.currentResultIndex -= 1
        const note = this.notes[this.currentResultIndex]
        this.setActiveNote(note)
      }
    },

    onKeyDown () {
      if (this.currentResultIndex != this.notes.length - 1) {
        this.currentResultIndex += 1
        const note = this.notes[this.currentResultIndex]
        this.setActiveNote(note)
      }
    },

    onSelect (note) {
      this.currentResultIndex = this.notes.indexOf(note)
      this.setActiveNote(note)
    },

    setActiveNote (note) {
      const activeNote = note ? note : null;
      this.$store.commit('SET_ACTIVE_NOTE', activeNote)
      this.query = activeNote ? activeNote.title : null
    }
  }
}
</script>
