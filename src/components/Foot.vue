<template>
  <footer class="foot">
    
    <span v-if="activeNote">
      {{ activeNote.body | wordCount }} words,
      {{ activeNote.body | charCount }} characters
    </span>
    
    <span v-else>
      {{ nextMessage() }}
    </span>

    <div class="foot__right">
        <button @click="onLogOut"
                class="button">
                Log Out
        </button>
    </div>

  </footer>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import _ from 'lodash'

import { localStorageMixin } from '../mixins'
import { wordCount } from '../filters'

export default {
  name: 'foot',

  mixins: [localStorageMixin],
 
  computed: {
    ...mapGetters(['activeNote',
                   'user'
    ])
  },

  data: () => ({
    messages: [
      'Praise specifically, criticize generally.',
      'Good artists borrow, great artists steal.',
      'Simplicity is the ultimate sophistication.',
      'This is your moment of glory.',
      'Stay present.',
      'Even elephants do slip.',
      'True will is wishing backed by power.',
      'I never learned anything while I was talking.',
      'Do things that have never been done.'
    ]
  }),

  methods: {
    ...mapActions(['LOG_OUT_USER']),
    ...mapMutations(['SET_QUERY',
                     'SET_RESULT_INDEX',
                     'SET_NOTES',
                     'SET_ACTIVE_NOTE',
                     'SET_ACTIVE_KEY'
    ]),
    
    onLogOut () {
      this.SET_QUERY('')
      this.SET_RESULT_INDEX(-1)
      this.SET_NOTES([])
      this.SET_ACTIVE_NOTE(null)
      this.SET_ACTIVE_KEY(null)

      this.LOG_OUT_USER().then(() => {
        this.ls_logOut()
        this.$router.push({ name: 'login'})
      })
    },

    nextMessage () {
      const index = _.random(0, this.messages.length - 1);
      return this.messages[index]
    }
  }

}
</script>
