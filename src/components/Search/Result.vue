<template>
  <li class="search__result"
      :id="`result_${note.id}`"
      :class="{ active: isActive }"
      @click="onResultSelect">

    <input v-if="renaming"
           :id="`search-result-editor-${note.id}`"
           v-model="note.name"
           @blur="onRenameBlur"
           @keyup.esc="onRenameBlur"
           @keyup.enter="onRenameSave"
           v-focus
           class="search__result__editor"
           type="text">

    <template v-if="!(renaming)">
      <span class="search__result__name">
            <span v-html="name"></span>
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
import { mapActions, mapGetters, mapMutations } from 'vuex'

import { prettyDate } from '../../filters'

export default {
  name: 'result',

  props: ['note', 'isActive', 'renaming'],

  computed: {
    ...mapGetters(['query'
    ]),

    name () {
      if (this.query.length > 0) {
        console.log('query exists')
        const regexString = this.query.replace(/\s/g, '|')
        const re = new RegExp(regexString, 'gi')
        console.log('name', this.query)
        return this.note.name
                   .replace(/\n$/g, '\n\n')
                   .replace(re, '<mark>$&</mark>')
      }
      return this.note.name
    }
  },

  methods: {
    ...mapActions(['UPDATE_NOTE'
    ]),
    ...mapMutations(['SET_RESULT_INDEX',
                     'SET_RENAMING_ID'
    ]),

    onResultSelect () {
      this.$emit('onResultSelect', this.note)
    },

    onRenameBlur () {
      this.SET_RESULT_INDEX(0)
      this.SET_RENAMING_ID(null)
      this.$emit('onRenameBlur')
    },

    onRenameSave () {
      this.UPDATE_NOTE()
      this.onRenameBlur()
    }
  }

}
</script>
