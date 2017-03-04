<template>
  <div id="search" class="search">
    <input id="search-input"
           class="search__input"
           type="text"
           v-model.trim="query"
           @input="updateQuery"
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
              :isActive="activeNote && note.id == activeNote.id"
              :currentEditingId="currentEditingId"
              @onResultSelect="onSelect"
              @onRenameBlur="onRenameBlur">
      </result>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'

import { noteMixin } from '../../mixins/note-mixin'
import { utilsMixin } from '../../mixins/utils-mixin'
import Result from './Result.vue'

export default {
  name: 'search',

  mixins: [noteMixin, utilsMixin],

  props: ['activeNote', 'notes', 'utilsMixin'],

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
      if (this.query.length == 0) {
        return this.notes
      }

      const notes = this.filterNotesForQuery(this.query, this.notes)
      this.currentResultIndex = -1
      notes.length > 0 ? this.setActiveNote(notes[0]) : this.setActiveNote(null)

      return notes
    }
  },

  methods: {
    ...mapActions(['CREATE_NOTE', 'DELETE_NOTE']),
    ...mapMutations(['SET_ACTIVE_NOTE', 'SET_QUERY']),
    
    onSearch () {
      if (this.activeNote && this.currentResultIndex != -1) {
        this.$emit('onSearch')
      } else if (this.query.length > 0) {
        const ids = this.notes.map(note => note.id)
        const id = this.notes.length > 0 ? Math.max(...ids) + 1 : 1

        const note = this.createNote(id, this.query)
        this.setActiveNote(note)

        this.CREATE_NOTE(note).then(() => {
          this.$emit('onSearch')
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

        const element = this.selectElement(`#result_${note.id}`)
        element.scrollIntoView()
      }
    },

    onDown () {
      if (this.currentResultIndex != this.filteredNotes.length - 1) {
        this.currentResultIndex += 1
        const note = this.filteredNotes[this.currentResultIndex]
        this.setActiveNote(note)

        if (this.currentResultIndex > 3) {
          const element = this.selectElement(`#result_${note.id}`)
          element.scrollIntoView()
        }
      }
    },

    onSelect (note) {
      this.currentResultIndex = this.filteredNotes.indexOf(note)
      this.setActiveNote(note)
    },

    setActiveNote (note) {
      this.SET_ACTIVE_NOTE(note)
    },

    onRename () {
      if (this.activeNote) {
        this.currentEditingId = this.activeNote.id
      }
    },

    onDelete () {
      this.DELETE_NOTE(this.activeNote.id).then(() => {
        this.onEscape()
      })
    },

    onRenameBlur () {
      this.currentEditingId = null
      this.$emit('onRenameBlur')
    },

    updateQuery () {
      this.SET_QUERY(this.query)
    }
  }
}
</script>
