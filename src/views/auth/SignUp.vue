<template>
  <div id="signup" class="auth">
    <h1 class="auth__title text-center">Sign Up</h1>

    <message v-if="error"
             :text="error"
             @closeMessage="closeMessage">
    </message>
    
    <form class="auth__form">
      <field
        v-for="field in fields"
        v-model="field.value"
        :name="field.name"
        :type="field.type"
        :placeholder="field.placeholder"
        :autofocus="field.autofocus">
      </field>
      
      <button class="auth__form__button"
              v-on:click.prevent="onSignUp"
              v-on:keyup.enter="onSignUp">
              Sign Up
      </button>
    </form>

    <router-link
      :to="{ name: 'login', query: { email: this.fields.email.value }}">
      Have an account? Log in
    </router-link>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

import { localStorageMixin } from '../../mixins'
import Field from '../../components/Field.vue'
import Message from '../../components/Message.vue'

export default {
  name: 'signup',

  mixins: [localStorageMixin],

  components: {
    Field,
    Message
  },

  data: () => ({
    fields: {
      email: {
        name: 'Email Address',
        value: '',
        type: 'text',
        placeholder: 'gavin@hooli.xyz',
        autofocus: true
      },
      password: {
        name: 'Password',
        value: '',
        type: 'password',
        placeholder: 'Super, secret',
        autofocus: false
      },
      confirm: {
        name: 'Confirm Password',
        value: '',
        type: 'password',
        placeholder: 'You know the drill',
        autofocus: false
      },
    },
    error: null
  }),

  created () {
    if (this.$route.query.email) {
      this.fields.email.value = this.$route.query.email
    }
  },

  computed: {
    ...mapGetters(['user'])
  },

  methods: {
    ...mapActions(['SIGN_UP_USER',
                   'INIT_NOTES'
    ]),

    onSignUp () {
      if (this.fields.password.value != this.fields.confirm.value) {
        this.error = 'The passwords did not match.'
        return
      }

      if (this.fields.email.value === null & this.fields.password.value === null) {
        this.error = 'Please enter an email address.'
        return
      }

      const data = {
        email: this.fields.email,
        password: this.fields.password
      }

      this.SIGN_UP_USER(data)
        .then(() => {
          this.ls_pushUser(this.user)
          this.INIT_NOTES()
            .then(() => this.$router.push({ name: 'app'}))
            .catch((error) => this.error = error.message)
        })
        .catch((error) => {
          this.error = error.message
        })
    },

    closeMessage () {
      this.error = null
    }
  },

  head: {
    title: {
      inner: 'Sign Up'
    }
  }

}
</script>

