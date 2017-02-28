<template>
  <div id="main" class="main">
    <search v-bind:activeNote="activeNote"
            v-bind:notes="notes"
            v-on:onSearch="onEditorFocus">
    </search>

    <editor v-bind:activeNote="activeNote"
            v-on:onEscape="onEditorEscape">
    </editor>

    <foot v-bind:activeNote="activeNote">
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
      'user'
    ])
  },

  methods: {
    onEditorFocus () {
      const id = '#editor-textarea'
      document.querySelector(id).focus()
    },

    onEditorEscape () {
      console.log('onEditorEscape')
      const id = '#search-input'
      document.querySelector(id).focus()
    }
  }

}
</script>
