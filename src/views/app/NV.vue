<template>
  <div id="nv"
       class="nv"
       :class="theme">
    <div class="container">
      <spinner v-if="loading">
      </spinner>

      <template v-else>
        <search @onSearch="onEditorFocus">
        </search>

        <editor>
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

import { localStorageMixin, noteMixin, utilsMixin } from '../../mixins'
import Spinner from '../../components/Spinner.vue'
import Search from '../../components/Search/Index.vue'
import Editor from '../../components/Editor/Index.vue'
import Foot from '../../components/Foot/Index.vue'

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
        this.setUpHotKeys()
      })
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
    ...mapGetters([
      'activeNote',
      'user', 
      'theme'
    ])
  },

  methods: {
    ...mapActions([
      'FETCH_USER_DATA',
    ]),
    ...mapMutations([
      'SET_USER'
    ]),

    setUpHotKeys () {
      keyboard.bind('tab', (e) => {
        e.preventDefault()
        if (this.activeNote) {
          this.onEditorFocus()
        }
      })
    },

    onEditorFocus () {
      const id = '#editor-textarea'
      this.focusElement(id)
    }
  },

  head: {
    title: {
      inner: 'App'
    }
  }

}
</script>
