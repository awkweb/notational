<template>
  <div class="editor">
    
    <template v-if="activeNote">
      <highlight :body="activeNote.body">
      </highlight>

      <textarea id="editor-textarea"
                class="editor__textarea" 
                v-model="activeNote.body"
                @input="onInput"
                @blur="onBlur"
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
import { mapActions, mapGetters, mapMutations } from 'vuex'

import Highlight from '../components/Highlight.vue'

export default {
  name: 'editor',

  components: {
    Highlight
  },

  computed: {
    ...mapGetters(['activeNote',
                   'query',
                   'editingId'
     ])
  },

  methods: {
    ...mapActions(['UPDATE_NOTE'
    ]),
    ...mapMutations(['SET_RESULT_INDEX',
                     'SET_EDITING_ID'
    ]),
    
    onInput () {
      this.UPDATE_NOTE(this.activeNote)

      if (this.activeNote.id != this.editingId)
        this.SET_RESULT_INDEX(0)
        this.SET_EDITING_ID(this.activeNote.id)
    },

    onBlur () {
      this.SET_EDITING_ID(null)
    },

    onEscape () {
      this.$emit('onEscape')
    }
  }

}
</script>
