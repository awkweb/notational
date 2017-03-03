<template>
  <div class="editor">
    
    <template v-if="activeNote">
      <textarea id="editor-textarea"
                class="editor__textarea" 
                v-model="activeNote.body"
                @keyup.esc="onEscape"
                rows="12">
      </textarea>

      <div class="editor__ghost">
        {{ activeNote.body }}
      </div>
    </template>    
    
    <div class="editor__placeholder"
         v-else>
         No Note Selected
    </div>

  </div>
</template>

<script>
import 'mark.js'

import { mapGetters } from 'vuex'

export default {
  name: 'editor',

  props: ['activeNote', 'searchQuery'],

  methods: {
    onEscape () {
      this.$emit('onEscape')
    }
  },

  watch: {
    searchQuery () {
      console.log('updateSearchQuery', searchQuery)
      const options = {
          "element": "mark",
          "className": "",
          "separateWordSearch": true,
          "accuracy": "partially",
          "diacritics": true,
      };

      const element = document.querySelector(".editor__ghost")
      let instance = new Mark(element)
      instance.mark(this.searchQuery, options)
    }
  }

}
</script>
