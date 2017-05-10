<template>
  <div
    class="dropdown"
    v-click-outside="hideDropdown">
    <button
      @click="isActive = !isActive"
      class="button-icon user">
    </button>
    
    <ul
      v-show="isActive"
      class="dropdown__menu">
      <li @click="onDownloadNotes">Upgrade to Pro</li>
      <li @click="onLogOut">Log Out</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { localStorageMixin } from '../mixins'

export default {
  name: 'dropdown',

  mixins: [localStorageMixin],

  props: [
    'data'
  ],

  data: () => ({
    isActive: false
  }),

  computed: {
    ...mapGetters([
      'activeNote',
      'theme'
    ])
  },

  methods: {
    ...mapActions([
      'RESET_APP',
      'LOG_OUT_USER',
    ]),

    hideDropdown () {
      this.isActive = false
    },

    onDownloadNotes () {
      this.hideDropdown()
    },

    onLogOut () {
      this.hideDropdown()
      this.RESET_APP()

      this.LOG_OUT_USER().then(() => {
        this.ls_logOut()
        this.$router.push({ name: 'login'})
      })
    }
  }

}
</script>
