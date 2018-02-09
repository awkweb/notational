<template>
  <div id="login" class="auth">
    <h1 class="auth__title text-center">Welcome Back</h1>

    <message
      v-if="error"
      :text="error"
      @closeMessage="closeMessage"
    >
    </message>

    <form class="auth__form">
      <field
        v-for="field in fields"
        v-model="field.value"
        :key="field.name"
        :name="field.name"
        :type="field.type"
        :placeholder="field.placeholder"
        :autofocus="field.autofocus"
      />

      <button
        class="auth__form__button"
        @click.prevent="onLogIn"
        @keyup.enter="onLogIn">
        Log In
      </button>
    </form>

    <router-link
      :to="{ name: 'signup', query: { email: this.fields.email.value }}"
    >
      New here? Sign up
    </router-link>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { localStorageMixin } from '../../mixins';
import Field from '../../components/Field';
import Message from '../../components/Message';

export default {
  name: 'login',
  mixins: [localStorageMixin],
  components: {
    Field,
    Message,
  },
  data: () => ({
    fields: {
      email: {
        name: 'Email Address',
        value: '',
        type: 'text',
        placeholder: 'erlich@aviato.com',
        autofocus: true,
      },
      password: {
        name: 'Password',
        value: '',
        type: 'password',
        placeholder: 'Super, secret',
        autofocus: false,
      },
    },
    error: null,
  }),
  created() {
    if (this.$route.query.email) {
      this.fields.email.value = this.$route.query.email;
    }
  },
  computed: {
    ...mapGetters([
      'user',
    ]),
  },
  methods: {
    ...mapActions([
      'LOG_IN_USER',
    ]),
    onLogIn() {
      if (this.fields.email.value.length === 0) {
        this.error = 'Please enter an email address.';
        return;
      }
      if (this.fields.password.value.length === 0) {
        this.error = 'Please enter a password.';
        return;
      }
      const data = {
        email: this.fields.email.value,
        password: this.fields.password.value,
      };
      this
        .LOG_IN_USER(data)
        .then(() => {
          this.ls_pushUser(this.user);
          this.$router.push({ name: 'app' });
        })
        .catch((error) => { this.error = error.message; });
    },
    closeMessage() {
      this.error = null;
    },
  },
  head: {
    title: {
      inner: 'Log In',
    },
  },
};
</script>
