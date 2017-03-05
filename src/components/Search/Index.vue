<template>
  <div id="search" class="search">
    <input id="search-input"
           class="search__input"
           type="text"
           v-model.trim="query"
           @input="updateQuery"
           @keyup.enter="onSearch"
           @keyup.ctrl.enter="onCreate"
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

import { localStorageMixin, noteMixin, utilsMixin } from '../../mixins'
import Result from './Result.vue'

export default {
  name: 'search',

  mixins: [noteMixin, utilsMixin, localStorageMixin],

  props: ['activeNote', 'notes', 'user', 'resultIndex'],

  data: () => ({
    query: '',
    currentEditingId: null
  }),

  components: {
    Result
  },

  computed: {
    filteredNotes () {
      let notes;
      if (this.query.length == 0) {
        notes = this.notes
      } else {
        notes = this.filterNotesForQuery(this.query, this.notes)
      }

      notes = this.sortNotes(notes)

      return notes
    }
  },

  methods: {
    ...mapActions(['CREATE_NOTE', 'DELETE_NOTE']),
    ...mapMutations(['SET_ACTIVE_NOTE', 'SET_ACTIVE_KEY', 'SET_QUERY', 'SET_RESULT_INDEX']),
    
    onSearch () {
      if (this.activeNote) {
        this.$emit('onSearch')
      }
    },

    onCreate () {
      const id = this.nextIdForNotes(this.notes)
      const note = this.createNote(id, this.query)
      this.SET_ACTIVE_NOTE(note)

      const key = this.findKeyForNoteId(id, this.notes)
      this.SET_ACTIVE_KEY(key)

      this.CREATE_NOTE(note).then(() => {
        this.$emit('onSearch')
      })
    },

    onEscape () {
      this.query = ''
      this.SET_RESULT_INDEX(-1)
      this.SET_ACTIVE_NOTE(null)
      this.SET_ACTIVE_KEY(null)
    },

    onUp () {
      if (this.resultIndex > 0) {
        const index = this.resultIndex - 1
        this.SET_RESULT_INDEX(index)

        const note = this.filteredNotes[index]
        this.SET_ACTIVE_NOTE(note)

        const key = this.findKeyForNoteId(note.id, this.notes)
        this.SET_ACTIVE_KEY(key)

        const element = this.selectElement(`#result_${note.id}`)
        element.scrollIntoView()
      }
    },

    onDown () {
      if (this.resultIndex != this.filteredNotes.length - 1) {
        const index = this.resultIndex + 1
        this.SET_RESULT_INDEX(index)
        
        const note = this.filteredNotes[index]
        this.SET_ACTIVE_NOTE(note)

        const key = this.findKeyForNoteId(note.id, this.notes)
        this.SET_ACTIVE_KEY(key)
        
        if (index > 3) {
          const element = this.selectElement(`#result_${note.id}`)
          element.scrollIntoView()
        }
      }
    },

    onSelect (note) {
      const index = this.filteredNotes.indexOf(note)
      this.SET_RESULT_INDEX(index)
      this.SET_ACTIVE_NOTE(note)

      const key = this.findKeyForNoteId(note.id, this.notes)
      this.SET_ACTIVE_KEY(key)
    },

    onRename () {
      if (this.activeNote) {
        this.currentEditingId = this.activeNote.id
      }
    },

    onDelete () {
      const noteId = this.activeNote.id
      this.DELETE_NOTE(noteId).then(() => {
        this.onEscape()
      })
    },

    onRenameBlur () {
      this.currentEditingId = null
      this.$emit('onRenameBlur')
    },

    updateQuery () {
      const note = this.filteredNotes.length > 0 ? this.filteredNotes[0] : null
      const key = this.filteredNotes.length > 0 ? this.findKeyForNoteId(note.id, this.notes) : null;

      this.SET_ACTIVE_NOTE(note)
      this.SET_ACTIVE_KEY(key)
      
      this.SET_RESULT_INDEX(0)
      this.SET_QUERY(this.query)
    }
  }
}
</script>
