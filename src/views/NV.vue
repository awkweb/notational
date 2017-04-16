<template>
  <div id="nv"
       class="nv"
       :class="theme">
    <div class="container">
      <spinner v-if="loading">
      </spinner>

      <template v-else>
        <search @onSearch="onEditorFocus"
                @onRenameBlur="onSearchFocus">
        </search>

        <editor @onEscape="onSearchFocus">
        </editor>

        <foot>
        </foot>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import keyboard from 'keyboardjs'

import { localStorageMixin, noteMixin, utilsMixin } from '../mixins'
import Spinner from '../components/Spinner.vue'
import Search from '../components/Search/Index.vue'
import Editor from '../components/Editor/Index.vue'
import Foot from '../components/Foot/Index.vue'

export default {
  name: 'nv',

  mixins: [localStorageMixin, noteMixin, utilsMixin],

  data: () => ({
    loading: true
  }),

  created () {
    const user = this.ls_pullUser()
    this.SET_USER(user)
    this.FETCH_USER_DATA()
      .then(() => {
        this.loading = false
      })
    this.setUpHotKeys()
  },

  beforeDestroy () {
    keyboard.reset()
  },

  components: {
    Editor,
    Foot,
    Search,
    Spinner
  },

  computed: {
    ...mapGetters(['activeNote',
                   'notes',
                   'user', 
                   'query',
                   'renamingId',
                   'editingId',
                   'theme'
    ])
  },

  methods: {
    ...mapActions(['FETCH_USER_DATA',
                   'CREATE_NOTE',
                   'DELETE_NOTE',
                   'RESET_ACTIVE_NOTE'
    ]),
    ...mapMutations(['SET_USER',
                     'SET_RENAMING_ID',
                     'SET_ACTIVE_NOTE'
    ]),

    setUpHotKeys () {
      keyboard.bind('ctrl + /', () => { this.onSearchFocus() })
      keyboard.bind('ctrl + enter', () => { if (this.query.length > 0) this.onCreate() })
      keyboard.bind('ctrl + .', () => { if (this.activeNote) this.onEditorFocus() })
      keyboard.bind('alt + ctrl + r', () => { if (this.activeNote) this.onRenameFocus() })
      keyboard.bind('alt + ctrl + d', () => { if (this.activeNote) this.onDelete() })
    },

    onEditorFocus () {
      const id = '#editor-textarea'
      this.focusElement(id)
    },

    onSearchFocus () {
      const id = '#search-input'
      this.focusElement(id)
    },

    onRenameFocus () {
      this.SET_RENAMING_ID(this.activeNote.id)
      this.$nextTick(() => {
        const id = `#search-result-editor-${this.activeNote.id}`
        this.focusElement(id)
      })
    },

    onCreate () {
      const id = this.nextIdForNotes(this.notes)
      const note = this.createNote(id, this.query)
      this.SET_ACTIVE_NOTE(note)

      this.CREATE_NOTE(note).then(() => { this.onEditorFocus() })
    },

    onDelete () {
      this.DELETE_NOTE().then(() => {
        this.RESET_ACTIVE_NOTE().then(() => this.onSearchFocus())
      })
    },
  },

  head: {
    title: {
      inner: 'App'
    }
  }

}
</script>
