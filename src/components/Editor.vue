<template>
  <div class="editor">
    <textarea id="editor-textarea"
              class="editor__textarea" 
              v-if="activeNote"
              v-model="body"
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

  computed: {
    body: function () {
      return this.activeNote && this.activeNote.body ? this.activeNote.body : null
    }
  },

  methods: {
    onEscape () {
      this.$emit('onEscape')
    },
  }

}
</script>
