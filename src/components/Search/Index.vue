<template>
  <div id="search" class="search">
    <input id="search-input"
           class="search__input"
           type="text"
           v-model.trim="query"
           @input="updateSearchQuery"
           @keyup.enter="onSearch"
           @keyup.esc="onEscape"
           @keyup.up="onUp"
           @keyup.down="onDown"
           @keyup.ctrl.shift.82="onRename"
           @keyup.ctrl.shift.68="onDelete"
           placeholder="Search or create"
           v-focus
           autofocus>
    
    <ul class="search__results">
      <result v-for="note in filteredNotes"
              class="list-complete-item"
              :key="note.id"
              :note="note"
              :activeNote="activeNote"
              :currentEditingId="currentEditingId"
              @onResultSelect="onSelect"
              @onRenameBlur="onRenameBlur">
      </result>
    </ul>
  </div>
</template>

<script>
import 'string_score'
import moment from 'moment'
import { mapGetters } from 'vuex'

import Result from './Result.vue'

export default {
  name: 'search',

  props: ['activeNote', 'notes'],

  data: () => ({
    query: '',
    currentResultIndex: -1,
    currentEditingId: null
  }),

  components: {
    Result
  },

  computed: {
    filteredNotes () {
      const query = this.query
      if (query.length == 0) {
        return this.notes
      }

      const notes = this.notes.filter(note => { return note.title.score(query) > 0 || note.body.score(query) > 0 })
      this.currentResultIndex = -1
      notes.length > 0 ? this.setActiveNote(notes[0]) : this.setActiveNote(null)

      return notes
    }
  },

  methods: {
    onSearch () {
      if (this.activeNote) {
        this.$emit('onSearch')
      } else if (this.query.length > 0) {
        const ids = this.notes.map(note => note.id)
        const id = Math.max(...ids) + 1
        const dateModified = moment().format('YYYY-M-D HH:mm')
        
        const note = {
          'id': id,
          'title': this.query,
          'body': '',
          'date_modified': dateModified
        }
        this.setActiveNote(note)

        const vm = this;
        this.$store.dispatch('CREATE_NOTE', note).then(() => {
          vm.$emit('onSearch')
        })
      }
    },

    onEscape () {
      this.query = ''
      this.currentResultIndex = -1
      this.setActiveNote(null)
    },

    onUp () {
      if (this.currentResultIndex > 0) {
        this.currentResultIndex -= 1
        const note = this.filteredNotes[this.currentResultIndex]
        this.setActiveNote(note)

        const elementId = `#result_${note.id}`
        const element = document.querySelector(elementId)
        element.scrollIntoView()
      }
    },

    onDown () {
      if (this.currentResultIndex != this.filteredNotes.length - 1) {
        this.currentResultIndex += 1
        const note = this.filteredNotes[this.currentResultIndex]
        this.setActiveNote(note)

        if (this.currentResultIndex > 3) {
          const elementId = `#result_${note.id}`
          const element = document.querySelector(elementId)
          element.scrollIntoView()
        }
      }
    },

    onSelect (note) {
      this.currentResultIndex = this.filteredNotes.indexOf(note)
      this.setActiveNote(note)
    },

    setActiveNote (note) {
      this.$store.commit('SET_ACTIVE_NOTE', note)
    },

    onRename () {
      if (this.activeNote) {
        this.currentEditingId = this.activeNote.id
      }
    },

    onDelete () {
      const vm = this;
      this.$store.dispatch('DELETE_NOTE', this.activeNote.id).then(() => {
        vm.onEscape()
      })
    },

    onRenameBlur () {
      this.currentEditingId = null
      this.$emit('onRenameBlur')
    },

    updateSearchQuery () {
      this.$emit('updateSearchQuery', this.query)
    }
  }
}
</script>
