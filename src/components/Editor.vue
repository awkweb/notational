<template>
  <div class="editor">
    
    <template v-if="activeNote">
      <highlight :body="activeNote.body"
                 :query="query">
      </highlight>

      <textarea id="editor-textarea"
                class="editor__textarea" 
                v-model="activeNote.body"
                @input="onInput"
                @keyup.esc="onEscape"
                rows="12">
      </textarea>
    </template>    
    
    <div class="editor__placeholder"
         v-else>
         No Note Selected
    </div>

  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

import Highlight from '../components/Highlight.vue'

export default {
  name: 'editor',

  props: ['activeNote', 'query'],

  components: {
    Highlight
  },

  methods: {
    ...mapActions(['UPDATE_NOTE']),
    ...mapMutations(['SET_RESULT_INDEX']),
    
    onInput () {
      this.UPDATE_NOTE(this.activeNote)
      this.SET_RESULT_INDEX(0)
    },

    onEscape () {
      this.$emit('onEscape')
    }
  }

}
</script>
