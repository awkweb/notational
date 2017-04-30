<template>
  <div class="editor">
    
    <template v-if="activeNote">
      <editor-highlight :body="activeNote.body">
      </editor-highlight>

      <textarea id="editor-textarea"
                class="editor__textarea" 
                v-model="activeNote.body"
                @input="onInput"
                @blur="onBlur"
                @focus="onFocus"
                @keyup.esc="onEscape"
                v-focus
                placeholder="The quick brown fox..." 
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

import EditorHighlight from './EditorHighlight.vue'

export default {
  name: 'editor',
  
  components: {
    EditorHighlight
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
    },

    onFocus () {
      if (this.activeNote.id != this.editingId)
        this.SET_EDITING_ID(this.activeNote.id)
    },

    onBlur () {
      this.SET_EDITING_ID(null)
    }
  }

}
</script>
