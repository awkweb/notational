<template>
  <div id="main"
       class="main">

    <search :activeNote="activeNote"
            :notes="notes"
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
import { mapGetters, mapMutations } from 'vuex'

import { utilsMixin } from '../mixins/utils-mixin'
import { localStorageMixin } from '../mixins/local-storage-mixin'
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

    const notes = this.ls_pullNotes()
    if (notes)
      this.SET_NOTES(notes)

    if (this.user == null)
      this.$router.push({ name: 'login'})
  },

  components: {
    Search,
    Editor,
    Foot
  },

  computed: {
    ...mapGetters(['activeNote', 'notes', 'user', 'query'])
  },

  methods: {
    ...mapMutations(['SET_USER', 'SET_NOTES']),

    onEditorFocus () {
      const id = 'editor-textarea'
      this.focus(id)
    },

    onSearchFocus () {
      const id = 'search-input'
      this.focus(id)
    },

    focus (id) {
      const element = this.selectElement(`#${id}`)
      element.focus()
    }
  }

}
</script>
