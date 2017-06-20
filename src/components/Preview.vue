<template>
  <div id="preview"
       class="preview">
    <div class="container">
      <spinner v-if="loading">
      </spinner>

      <template v-else>
        <search
          :preview="true"
        >
        </search>

        <editor
          :isPreview="true"
        >
        </editor>

        <foot>
        </foot>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

import { localStorageMixin } from '../mixins'
import Spinner from './Spinner.vue'
import Search from './Search/Index.vue'
import Editor from './Editor/Index.vue'
import Foot from './Foot/Index.vue'

export default {
  name: 'preview',

  mixins: [localStorageMixin],

  data: () => ({
    loading: true
  }),

  created () {
    this.FETCH_PREVIEW_DATA()
      .then(() => {
        this.loading = false
      })
  },

  components: {
    Editor,
    Foot,
    Search,
    Spinner
  },

  methods: {
    ...mapActions([
      'FETCH_PREVIEW_DATA'
    ])
  }

}
</script>
