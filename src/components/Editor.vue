<template>
  <textarea
    class="body"
    v-model="body"
    rows="12">
  </textarea>
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
  }

}
</script>
