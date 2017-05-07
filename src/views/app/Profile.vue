<template>
  <div id="profile"
       class="profile"
       :class="theme">
    <div class="container">
      <spinner v-if="loading">
      </spinner>
      
      <template v-else>
        <header class="profile__header">
          <h1>Profile</h1>

          <div>
            <span
              @click="onBack"
              class="">
              Back to Notes
            </span>

            <span
              @click="onLogOut"
              class="">
              Log Out
            </span>
          </div>
        </header>

        <div class="profile__upgrade">
          <div class="profile__upgrade__headline">
            <span class="number">{{ Object.keys(notes).length }} of 200</span> free notes used.
          </div>

          <div>
            Upgrade for <span class="feature">unlimited notes</span>, <span class="feature">tagging</span>, and <span class="feature">support future development</span>.
          </div>
        </div>

        <form class="profile__form">
          <div class="profile__form__container">
            <div
              class="profile__form__group"
              :class="{ active: activeInput === 'name' }">
              <label class="profile__form__group__label">Full Name</label>
              <input
                class="profile__form__group__input" 
                v-model="user.displayName"
                @focus="activeInput = 'name'"
                @blur="activeInput = null"
                type="text"
                placeholder="Erlich Bachman"
                spellcheck="false">
            </div>

            <div
              class="profile__form__group"
              :class="{ active: activeInput === 'email' }">
              <label class="profile__form__group__label">Email Address</label>
              <input
                class="profile__form__group__input" 
                v-model="user.email"
                @focus="activeInput = 'email'"
                @blur="activeInput = null"
                type="text"
                placeholder="erlich@aviato.com"
                spellcheck="false">
            </div>
          </div>

          <div class="profile__form__container">
            <div
              class="profile__form__group"
              :class="{ active: activeInput === 'password' }">
              <label class="profile__form__group__label">Password</label>
              <input
                class="profile__form__group__input" 
                v-model="password"
                @focus="activeInput = 'password'"
                @blur="activeInput = null"
                type="password"
                placeholder="Super, secret"
                spellcheck="false">
            </div>

            <div
              class="profile__form__group"
              :class="{ active: activeInput === 'confirm' }">
              <label class="profile__form__group__label">Confirm Password</label>
              <input
                class="profile__form__group__input" 
                v-model="confirm"
                @focus="activeInput = 'confirm'"
                @blur="activeInput = null"
                type="password"
                placeholder="You know the drill"
                spellcheck="false">
            </div>
          </div>
          
          <button class="profile__form__button"
                  v-on:click.prevent="onUpdate"
                  v-on:keyup.enter="onUpdate">
            Update
          </button>
        </form>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from 'vuex'

import router from '../../router'
import { localStorageMixin } from '../../mixins'
import Spinner from '../../components/Spinner.vue'

export default {
  name: 'profile',

  mixins: [localStorageMixin],

  data: () => ({
    loading: true,
    password: null,
    confirm: null,
    activeInput: null
  }),

  computed: {
    ...mapGetters([
      'user',
      'theme',
      'notes'
    ])
  },

  components: {
    Spinner
  },

  created () {
    const user = this.ls_pullUser()
    this.SET_USER(user)
    this.FETCH_USER_DATA()
      .then(() => {
        this.loading = false
      })
  },

  methods: {
    ...mapActions([
      'FETCH_USER_DATA',
      'RESET_APP',
      'LOG_OUT_USER',
      'UPDATE_USER_INFO'
    ]),
    ...mapMutations([
      'SET_USER'
    ]),

    onBack () {
      router.push({ path: 'app' })
    },
    
    onLogOut () {
      this.RESET_APP()

      this.LOG_OUT_USER().then(() => {
        this.ls_logOut()
        this.$router.push({ name: 'login'})
      })
    },

    onUpdate () {
      if (this.password !== this.confirm) {
        return
      }

      let data = {
        displayName: this.user.displayName,
        email: this.user.email
      }

      if (this.password != null) {
        data[password] = this.password
      }

      this.UPDATE_USER_INFO(data)
        .then(res => console.log(res))
        .catch(error => console.log(error))
    }
  },

  head: {
    title: {
      inner: 'Profile'
    }
  }

}
</script>

