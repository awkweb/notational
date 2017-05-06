<template>
  <div id="public"
       class="public">

    <spinner v-if="loading">
    </spinner>

    <template v-if="activeNote">
      <header class="public__header">
        <h1>{{ activeNote.name }}</h1>
        <span>Updated {{ activeNote.date_modified | prettyDate }}</span>
      </header>

      <div v-html="body"
           class="public__body">
      </div>

      <footer class="public__footer">
        <router-link to="/">notational.co</router-link>
      </footer>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import router from '../../router'
import Spinner from '../../components/Spinner.vue'

export default {
  name: 'public',

  data: () => ({
    loading: true,
  }),

  created () {
    if (this.$route.params.id) {
      this.getNote()
    }
  },

  components: {
    Spinner
  },
  
  computed: {
    ...mapGetters(['activeNote']),

    body () {
      return this.activeNote.body.replace('\n', '<br/>')
    }
  },

  methods: {
    ...mapActions(['FETCH_PUBLIC_NOTE_FOR_ID'
    ]),

    getNote () {
      this.FETCH_PUBLIC_NOTE_FOR_ID(this.$route.params.id)
          .then(() => this.loading = false)
          .catch(() => router.push({ name: 'home' }))
    }
  },

  watch: {
    '$route': 'getNote'
  }

}
</script>
