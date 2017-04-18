<template>
  <div id="search" class="search">
    <div class="search__container">
      <input id="search-input"
             class="search__input"
             type="text"
             v-model.trim="query"
             @focus="isSearchFocused = true"
             @blur="isSearchFocused = false"
             @input="updateQuery"
             @keyup.enter="onSearch"
             @keyup.esc="onEscape"
             placeholder="Search or create"
             v-focus
             spellcheck="false"
             autofocus>

      <search-info :resultsCount="filteredNotes.length"
                   :queryLength="query.length"
                   :selected="activeNote != null"
                   :searching="isSearchFocused"
                   :renaming="renamingId != null"
                   :editing="editingId != null">
      </search-info>
    </div>
    
    <ul class="search__results">
      <search-result v-for="note in filteredNotes"
                     class="list-complete-item"
                     :key="note.id"
                     :note="note"
                     :isActive="activeNote && note.id == activeNote.id"
                     :renaming="renamingId == note.id"
                     @onResultSelect="onSelect"
                     @onRenameBlur="onRenameBlur">
      </search-result>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import keyboard from 'keyboardjs'

import { noteMixin, utilsMixin } from '../../mixins'
import SearchInfo from './SearchInfo.vue'
import SearchResult from './SearchResult.vue'

export default {
  name: 'search',

  mixins: [noteMixin, utilsMixin],

  data: () => ({
    query: '',
    isSearchFocused: true
  }),

  created () {
    this.setUpHotKeys()
  },

  beforeDestroy () {
    keyboard.reset()
  },

  components: {
    SearchInfo,
    SearchResult
  },

  computed: {
    ...mapGetters(['activeNote',
                   'notes',
                   'user', 
                   'resultIndex',
                   'renamingId',
                   'editingId'
    ]),

    filteredNotes () {
      let notes;
      if (this.query.length == 0) {
        notes = this.notes
        return this.sortNotes(notes)
      }

      notes = this.filterNotesForQuery(this.query, this.notes)
      notes = this.sortNotes(notes, true)

      return notes
    }
  },

  methods: {
    ...mapActions(['RESET_ACTIVE_NOTE'
    ]),
    ...mapMutations(['SET_ACTIVE_NOTE',
                     'SET_ACTIVE_KEY',
                     'SET_QUERY',
                     'SET_RESULT_INDEX'
    ]),

    setUpHotKeys () {
      keyboard.bind('up', (e) => {
        if (!this.editingId && !this.renamingId) {
          e.preventDefault()
          this.onUp()
        }
      })
      keyboard.bind('down', (e) => {
        if (!this.editingId && !this.renamingId) {
          e.preventDefault()
          this.onDown()
        }
      })
    },
    
    onSearch () {
      if (this.activeNote) {
        this.$emit('onSearch')
      }
    },

    onEscape () {
      this.query = ''
      this.SET_QUERY('')
      this.RESET_ACTIVE_NOTE()
    },

    onUp () {
      if (this.resultIndex > 0) {
        const index = this.resultIndex - 1
        this.SET_RESULT_INDEX(index)

        const note = this.filteredNotes[index]
        this.SET_ACTIVE_NOTE(note)

        const key = this.findKeyForNoteId(note.id, this.notes)
        this.SET_ACTIVE_KEY(key)

        this.scrollToNoteId(note.id, false)
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
        
        this.scrollToNoteId(note.id, true)
      }
    },

    scrollToNoteId (noteId, alignToTop) {
      const container = this.selectElement('.search__results')
      const containerViewTop = container.scrollTop
      const containerViewBottom = containerViewTop + container.offsetHeight

      const element = this.selectElement(`#result_${noteId}`)
      const elementTop = element.offsetTop - 104
      const elementBottom = elementTop + element.offsetHeight

      const isVisible = (elementBottom <= containerViewBottom) && (elementTop >= containerViewTop)
      if (!isVisible) {
        element.scrollIntoView(alignToTop)
      }
    },

    onSelect (note) {
      const index = this.filteredNotes.indexOf(note)
      this.SET_RESULT_INDEX(index)
      this.SET_ACTIVE_NOTE(note)

      const key = this.findKeyForNoteId(note.id, this.notes)
      this.SET_ACTIVE_KEY(key)
    },

    onRenameBlur () {
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
