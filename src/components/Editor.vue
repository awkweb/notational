<template>
  <div class="editor">
    
    <template v-if="activeNote">
      <highlight :body="activeNote.body"
                 :query="query">
      </highlight>

      <textarea id="editor-textarea"
                class="editor__textarea" 
                v-model="activeNote.body"
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
import Highlight from '../components/Highlight.vue'

export default {
  name: 'editor',

  props: ['activeNote', 'query'],

  components: {
    Highlight
  },

  methods: {
    onEscape () {
      this.$emit('onEscape')
    }
  }

}
</script>
