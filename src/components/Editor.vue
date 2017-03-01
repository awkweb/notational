<template>
  <div class="editor">             
    <textarea v-if="activeNote"
              id="editor-textarea"
              class="editor__textarea" 
              v-model="activeNote.body"
              v-on:keyup.esc="onEscape"
              rows="12">
    </textarea>
    <div class="editor__placeholder"
         v-else>No Note Selected</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'editor',

  props: ['activeNote'],

  methods: {
    onEscape () {
      this.$emit('onEscape')
    },
  }

}
</script>
