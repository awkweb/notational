<template>
  <li class="search__result"
      :id="`result_${note.id}`"
      :class="{ active: isActive }"
      @click="onResultSelect">

    <input v-if="note.id == editingId"
           :id="`search-result-editor-${note.id}`"
           v-model="note.title"
           @blur="onRenameBlur"
           @keyup.enter="onRenameBlur"
           v-focus
           class="search__result__editor"
           type="text">

    <template v-if="!(note.id == editingId)">
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

  props: ['note', 'isActive', 'editingId'],

  methods: {
    ...mapActions(['UPDATE_NOTE']),
    ...mapMutations(['SET_RESULT_INDEX', 'SET_EDITING_ID']),

    onResultSelect () {
      this.$emit('onResultSelect', this.note)
    },

    onRenameBlur () {
      this.UPDATE_NOTE()
      this.SET_RESULT_INDEX(0)
      this.SET_EDITING_ID(null)
      this.$emit('onRenameBlur')
    }
  }

}
</script>
