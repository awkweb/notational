<template>
  <div id="search" class="search">
    <input id="search-input"
           class="search__input"
           type="text"
           v-model.trim="query"
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
    currentEditingId: null,
    typing: false
  }),

  components: {
    Result
  },

  computed: {
    filteredNotes () {
      if (this.query.length == 0) {
        return this.notes
      }

      const query = this.query
      return this.notes.filter(note => { return note.title.score(query) > 0 || note.body.score(query) > 0 })
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
      const activeNote = note ? note : null;
      this.$store.commit('SET_ACTIVE_NOTE', activeNote)
      this.query = activeNote ? activeNote.title : ''
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
      this.query = this.activeNote.title
      this.currentEditingId = null
      this.$emit('onRenameBlur')
    }
  }
}
</script>
