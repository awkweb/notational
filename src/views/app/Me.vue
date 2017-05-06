<template>
  <div id="profile"
       class="profile"
       :class="theme">
    <div class="container">
      <h1>Hello, Profile</h1>

      <button @click="onLogOut"
              class="button">
        Log Out
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { localStorageMixin } from '../../mixins'

export default {
  name: 'profile',

  mixins: [localStorageMixin],

  computed: {
    ...mapGetters([
      'user',
      'theme'
    ])
  },

  methods: {
    ...mapActions([
      'RESET_APP',
      'LOG_OUT_USER'
    ]),
    
    onLogOut () {
      this.RESET_APP()

      this.LOG_OUT_USER().then(() => {
        this.ls_logOut()
        this.$router.push({ name: 'login'})
      })
    }
  }

}
</script>

