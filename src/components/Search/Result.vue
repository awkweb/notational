<template>
  <li class="search__result"
      :id="`result_${note.id}`"
      :class="{ active: isActive }"
      @click="onResultSelect">

    <input v-if="note.id == currentEditingId"
           class="search__result__editor"
           v-model="note.title"
           @blur="onRenameBlur"
           @keyup.esc="onRenameBlur"
           @keyup.enter="onRenameEnter"
           v-focus
           type="text">

    <template v-if="!(note.id == currentEditingId)">
      <span class="search__result__title">
            {{ note.title }}
            <span v-show="note.body.length > 0"
                  class="search__result__description"> 
                  – {{ note.body }}
            </span>
      </span>
      
      <span class="search__result__time">
            {{ note.date_modified | prettyDate }}
      </span>
    </template>
  </li>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

import { prettyDate } from '../../filters'

export default {
  name: 'result',

  props: ['note', 'isActive', 'currentEditingId'],

  methods: {
    ...mapActions(['UPDATE_NOTE']),
    ...mapMutations(['SET_RESULT_INDEX']),

    onResultSelect () {
      this.$emit('onResultSelect', this.note)
    },

    onRenameEnter () {
      this.UPDATE_NOTE()
      this.SET_RESULT_INDEX(0)
      this.$emit('onRenameBlur')
    },

    onRenameBlur () {
      this.$emit('onRenameBlur')
    }
  }

}
</script>
