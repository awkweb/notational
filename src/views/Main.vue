<template>
  <div id="main"
       class="main">

    <search :activeNote="activeNote"
            :notes="notes"
            @updateSearchQuery="updateSearchQuery"
            @onSearch="onEditorFocus"
            @onRenameBlur="onSearchFocus">
    </search>

    <editor :activeNote="activeNote"
            :searchQuery="searchQuery"
            @onEscape="onSearchFocus">
    </editor>

    <foot :activeNote="activeNote">
    </foot>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import Search from '../components/Search/Index.vue'
import Editor from '../components/Editor.vue'
import Foot from '../components/Foot.vue'

export default {
  name: 'main',

  data: () => ({
    searchQuery: ''
  }),

  created () {
    if (this.user == null)
      this.$router.push({ name: 'login'})
  },

  components: {
    Search,
    Editor,
    Foot
  },

  computed: {
    ...mapGetters([
      'activeNote',
      'notes',
      'user'
    ])
  },

  methods: {
    updateSearchQuery (query) {
      this.searchQuery = query
    },

    onEditorFocus () {
      const id = 'editor-textarea'
      this.focus(id)
    },

    onSearchFocus () {
      const id = 'search-input'
      this.focus(id)
    },

    focus (id) {
      const element = document.querySelector(`#${id}`)
      element.focus()
    }
  }

}
</script>
