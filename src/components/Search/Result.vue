<template>
  <li class="search__result"
      :id="`result_${note.id}`"
      :class="{ active: isActive }"
      @click="onResultSelect">

    <input v-if="note.id == currentEditingId"
           class="search__result__editor"
           v-model="note.title"
           @blur="onRenameBlur"
           @keyup.enter="onRenameBlur"
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
import { prettyDate } from '../../filters'

export default {
  name: 'result',

  props: ['note', 'isActive', 'currentEditingId'],

  methods: {
    onResultSelect () {
      this.$emit('onResultSelect', this.note)
    },

    onRenameBlur () {
      this.$emit('onRenameBlur')
    }
  }

}
</script>
