<template>
  <div class="editor__ghost">

    <div id="highlights"
         class="highlights"
         v-html="content">
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { utilsMixin } from '../../mixins'

export default {
  name: 'editor-highlight',

  mixins: [utilsMixin],

  props: ['body'],

  updated () {
    const textarea = this.selectElement('#editor-textarea')
    if (textarea)
      textarea.onscroll = this.onScroll
  },

  computed: {
    ...mapGetters(['query'
    ]),

    content () {
      let body = this.body
      if (this.query.length > 0) {
        const regexString = this.query.replace(/\s/g, '|')
        const re = new RegExp(regexString, 'gi')
        body = this.body
                   .replace(/\n$/g, '\n\n')
                   .replace(re, '<mark>$&</mark>')
      }
      return body
    }
  },

  methods: {
    onScroll () {
      const textarea = this.selectElement('#editor-textarea')
      const highlights = this.selectElement('#highlights')
      highlights.scrollTop = textarea.scrollTop
    }
  }

}
</script>
