<template>
  <div id="main"
       class="main">

    <search :activeNote="activeNote"
            :notes="notes"
            :user="user"
            :resultIndex="resultIndex"
            @onSearch="onEditorFocus"
            @onRenameBlur="onSearchFocus">
    </search>

    <editor :activeNote="activeNote"
            :query="query"
            @onEscape="onSearchFocus">
    </editor>

    <foot :activeNote="activeNote">
    </foot>

  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import hotkeys from 'hotkeys-js'

import { localStorageMixin, utilsMixin } from '../mixins'
import Search from '../components/Search/Index.vue'
import Editor from '../components/Editor.vue'
import Foot from '../components/Foot.vue'

export default {
  name: 'main',

  mixins: [utilsMixin, localStorageMixin],

  created () {
    const user = this.ls_pullUser()
    if (user)
      this.SET_USER(user)
    else
      this.$router.push({ name: 'login'})

    this.FETCH_NOTES()
    this.setUpHotKeys()
  },

  beforeDestroy () {
    // hotkeys.unbind()
  },

  components: {
    Search,
    Editor,
    Foot
  },

  computed: {
    ...mapGetters(['activeNote', 'notes', 'user', 'query', 'resultIndex'])
  },

  methods: {
    ...mapActions(['FETCH_NOTES']),
    ...mapMutations(['SET_USER', 'SET_NOTES']),

    setUpHotKeys () {
      hotkeys('ctrl+/', () => this.onSearchFocus())
      hotkeys('ctrl+.', () => {if (this.activeNote) this.onEditorFocus()})
    },

    onEditorFocus () {
      const id = '#editor-textarea'
      this.focusElement(id)
    },

    onSearchFocus () {
      const id = '#search-input'
      this.focusElement(id)
    }
  },

  head: {
    title: {
      inner: 'Home'
    }
  }

}
</script>
