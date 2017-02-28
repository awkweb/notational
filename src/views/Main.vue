<template>
  <div id="main" class="main">
    <search v-bind:activeNote="activeNote"
            v-bind:notes="notes">
    </search>

    <editor v-bind:activeNote="activeNote">
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
  }

}
</script>
