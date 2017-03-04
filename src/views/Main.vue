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
import { mapGetters } from 'vuex'

import Search from '../components/Search/Index.vue'
import Editor from '../components/Editor.vue'
import Foot from '../components/Foot.vue'

export default {
  name: 'main',

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
      'user',
      'query'
    ])
  },

  methods: {
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
