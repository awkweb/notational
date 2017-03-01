<template>
  <div id="search" class="search">
    <input id="search-input"
           class="search__input"
           type="text"
           v-model="query"
           v-on:keyup.enter="onSearch"
           v-on:keyup.esc="onEscape"
           v-on:keyup.up="onUp"
           v-on:keyup.down="onDown"
           v-on:keyup.ctrl.shift.82="onRename"
           placeholder="Search or create"
           v-focus
           autofocus>
    
    <ul class="search__results">
      <result v-for="note in notes"
              v-bind:note="note"
              v-bind:activeNote="activeNote"
              v-bind:currentEditingId="currentEditingId"
              v-on:dblclick="onDoubleClick"
              v-on:onResultSelect="onSelect"
              v-on:onRenameBlur="onRenameBlur">
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
      currentResultIndex: -1,
      currentEditingId: null
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

    onUp () {
      if (this.currentResultIndex > 0) {
        this.currentResultIndex -= 1
        const note = this.notes[this.currentResultIndex]
        this.setActiveNote(note)
      }
    },

    onDown () {
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
    },

    onDoubleClick () {
      alert('onDoubleClick')
    },

    onRename () {
      if (this.activeNote) {
        this.currentEditingId = this.activeNote.id
      }
    },

    onRenameBlur () {
      this.query = this.activeNote.title
      this.currentEditingId = null
      this.$emit('onRenameBlur')
    }
  }
}
</script>
