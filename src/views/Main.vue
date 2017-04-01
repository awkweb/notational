<template>
  <div id="main"
       class="main">

    <spinner v-if="loading">
    </spinner>

    <template v-else>
      <search @onSearch="onEditorFocus"
              @onEscape="onEscape"
              @onRenameBlur="onSearchFocus">
      </search>

      <editor @onEscape="onSearchFocus">
      </editor>

      <foot>
      </foot>
    </template>

  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import keyboard from 'keyboardjs'

import { localStorageMixin, noteMixin, utilsMixin } from '../mixins'
import Editor from '../components/Editor.vue'
import Foot from '../components/Foot.vue'
import Search from '../components/Search/Index.vue'
import Spinner from '../components/Spinner.vue'


export default {
  name: 'main',

  mixins: [localStorageMixin, noteMixin, utilsMixin],

  data: () => ({
    loading: true
  }),

  created () {
    const user = this.ls_pullUser()
    if (this.user || user) {
      this.SET_USER(user)

      this.FETCH_NOTES()
        .then(() => {
          this.loading = false
        })
    } else {
      this.LOG_IN_USER_ANONYMOUSLY()
        .then(() => {
          this.ls_pushUser(this.user)
          this.INIT_NOTES()
            .then(() => {
              this.FETCH_NOTES()
                .then(() => this.loading = false)
                .catch((error) => console.log(error))
            })
            .catch((error) => console.log(error))
        })
    }
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
                   'editingId'
    ])
  },

  methods: {
    ...mapActions(['INIT_NOTES',
                   'LOG_IN_USER_ANONYMOUSLY',
                   'FETCH_NOTES',
                   'CREATE_NOTE',
                   'DELETE_NOTE'
    ]),
    ...mapMutations(['SET_USER',
                     'SET_NOTES',
                     'SET_RENAMING_ID',
                     'SET_RESULT_INDEX',
                     'SET_ACTIVE_NOTE',
                     'SET_ACTIVE_KEY'
    ]),

    setUpHotKeys () {
      keyboard.bind('ctrl + /', () => this.onSearchFocus())
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

    onEscape () {
      this.SET_RESULT_INDEX(-1)
      this.SET_ACTIVE_NOTE(null)
      this.SET_ACTIVE_KEY(null)
    },

    onCreate () {
      const id = this.nextIdForNotes(this.notes)
      const note = this.createNote(id, this.query)
      this.SET_ACTIVE_NOTE(note)

      this.CREATE_NOTE(note).then(() => { this.onEditorFocus() })
    },

    onDelete () {
      this.DELETE_NOTE().then(() => {
        this.onEscape()
        this.onSearchFocus()
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
