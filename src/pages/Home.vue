<template>
  <div
    id="home"
    class="home"
    :class="theme"
  >
    <nav class="home__nav">
      <div class="home__container nav">
        <router-link
          :to="{ name: 'home'}"
          class="home__nav__logo">
          N<span>otational</span>
        </router-link>

        <div>
          <a
            href="mailto:yo@notational.co"
            class="home__nav__button">
            Contact
          </a>

          <button
            @click="onLogIn"
            class="home__nav__button">
            Log In
          </button>

          <button
            @click="onSignUp"
            class="home__nav__button primary"
            id="sign-up">
            Sign Up
          </button>
        </div>
      </div>
    </nav>

    <div class="home__container main">

      <div class="home__content left">
        <h1 class="home__headline">
          Notes at the speed of thought.
        </h1>

        <form class="home__form">
          <field
            v-for="field in fields"
            v-model="field.value"
            :key="field.name"
            :name="field.name"
            :type="field.type"
            :placeholder="field.placeholder"
            :autofocus="field.autofocus">
          </field>

          <button
            class="auth__form__button button large primary"
            v-on:click.prevent="onCreateAccount"
            v-on:keyup.enter="onCreateAccount"
          >
            Create an Account
          </button>
        </form>

        <message
          v-if="error"
          :text="error"
          @closeMessage="closeMessage">
        </message>
      </div>

      <div class="home__content right">
        <div
          class="home__browser">
          <div class="home__browser__header">
            <div class="home__browser__button-group">
              <div class="home__browser__button"></div>
              <div class="home__browser__button"></div>
              <div class="home__browser__button"></div>
            </div>
            <span class="home__browser__name">Preview Mode</span>
          </div>
          <div class="home__browser__body">
            <preview></preview>
          </div>
        </div>
      </div>
    </div>

    <p class="home__subline">
      <span>Smart shortcuts</span>,
      <span>magic save</span>, and <span>incremental search</span>
      keep your hands on the keyboard—and your brain happy.
    </p>

    <footer class="home__foot">
      Built by <a href="http://meagher.co/">Tom</a> with <a href="https://vuejs.org/">Vue.js</a>. Inspired by, but not affiliated with <a href="http://notational.net/?ref=notational.co">Notational Velocity</a>.
    </footer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { localStorageMixin } from '../mixins';
import Field from '../components/Field';
import Message from '../components/Message';
import Preview from '../components/Preview';

export default {
  name: 'home',
  mixins: [localStorageMixin],
  components: {
    Field,
    Message,
    Preview,
  },
  data: () => ({
    fields: {
      email: {
        name: 'Email Address',
        value: '',
        type: 'text',
        placeholder: 'monica@raviga.com',
        autofocus: false,
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
  computed: {
    ...mapGetters([
      'user',
      'theme',
    ]),
  },
  methods: {
    ...mapActions([
      'SIGN_UP_USER',
      'INIT_NOTES',
    ]),
    onCreateAccount() {
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
        .SIGN_UP_USER(data)
        .then(() => {
          this.ls_pushUser(this.user);
          this
            .INIT_NOTES()
            .then(() => this.$router.push({ name: 'app' }))
            .catch((error) => { this.error = error.message; });
        })
        .catch((error) => { this.error = error.message; });
    },
    onSignUp() {
      this.$router.push({
        name: 'signup',
        query: { email: this.fields.email.value },
      });
    },
    onLogIn() {
      this.$router.push({ name: 'login' });
    },
    closeMessage() {
      this.error = null;
    },
  },
  head: {
    title: {
      inner: 'Notes at the speed of thought.',
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/variables';
  @import '../assets/styles/functions';
  @import '../assets/styles/mixins';

  .home {
    color: palette(gray, dark);

    &__container, &__subline, &__foot {
      margin: {
        right: auto;
        left: auto;
      }
      padding: {
        right: 1rem;
        left: 1rem;
      }
    }

    &__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 62rem;

      &.nav {
        width: 62rem;
        padding: {
          top: .5rem;
          bottom: .5rem;
        }
      }

      &.main {
        margin-bottom: 1rem;

        @media screen and (max-width: $md) {
          flex-direction: column;
        }
      }
    }

    &__nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
      padding: {
        top: .5rem;
        bottom: 0rem;
      }
      border-bottom: {
        style: solid;
        width: 1px;
        color: palette(gray, light);
      }
      transition: border-color $transition;

      &__logo {
        color: palette(orange);
        text-decoration: none;
        font: {
          family: $sans-serif;
          size: 1.5rem;
          weight: 700;
        }
        transition: color $transition;
        outline: 0;

        @media screen and (max-width: $sm) {
          font-weight: 900;
          span {
            display: none;
          }
        }
      }

      &__button {
        color: palette(gray, dark);
        cursor: pointer;
        border: 0;
        background-color: transparent;
        font: {
          family: $sans-serif;
          size: 1rem;
          weight: 700;
        }
        padding: {
          bottom: 6px;
          right: 10px;
          left: 10px;
          top: 6px;
        }
        margin-left: 5px;
        outline: 0;
        text-decoration: none;
        transition: color $transition;

        &.primary {
          margin-left: 15px;
          box-shadow: $box-shadow;
          color: palette(white);
          border: {
            style: solid;
            width: 1px;
            color: palette(orange, dark);
            radius: $border-radius;
          }
          background-color: palette(orange);
          transition: background-color $transition, border-color $transition;

          &:hover {
            border-color: palette(orange, x-dark);
          }
        }
      }
    }

    &__content {
      flex: 1;

      &.left {
        max-width: 25rem;
        padding-right: 1rem;

        @media screen and (max-width: $md) {
          min-width: 100%;
          padding-right: 0;
          margin-bottom: 1rem;
        }
      }

      &.right {
        max-width: 30rem;
        min-width: 30rem;
        @media screen and (max-width: $md) {
          max-width: 100%;
          min-width: 100%;
        }
      }
    }

    .message {
      margin-bottom: 0;
    }

    &__headline {
      color: palette(black);
      margin: {
        top: 0;
        bottom: 2rem;
      }
      font-weight: 900;
      transition: color $transition;
    }

    &__browser {
      box-shadow: $box-shadow-2;

      margin: {
        top: 1rem;
        bottom: 2rem;
      }

      border: {
        style: solid;
        width: 1px;
        color: palette(orange);
        radius: $border-radius;
      }
      transition: border-color $transition;

      &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 2rem;
        border-bottom: {
          style: solid;
          width: 1px;
          color: palette(orange);
        }
        transition: border-color $transition;
      }

      &__button-group {
        padding: {
          left: 10px;
        }
      }

      &__button {
        display: inline-block;
        width: .5rem;
        height: .5rem;
        border: {
          style: solid;
          width: 1px;
          color: palette(orange);
          radius: 50%;
        }
        transition: border-color $transition;
      }

      &__name {
        color: palette(orange);
        padding-right: 10px;
        font: {
          family: $mono;
          size: .9rem;
        }
        transition: color $transition;
      }

      &__body {
        img {
          top: 0;
          left: 0;
          width: 100%;
          max-width: 100%;
          height: auto;
          border: 0;
        }
      }
    }

    &__subline {
      max-width: 45rem;
      line-height: 1.5;
      text-align: center;
      color: palette(black);
      font: {
        family: $sans-serif;
        size: 1.7rem;
      }
      margin-bottom: 2rem;
      transition: color $transition;

      span {
        white-space: nowrap;
        background-color: palette(orange, light);
        font-weight: 700;
        transition: background-color $transition;
      }

      @media screen and (max-width: $sm) {
        font-size: 1.5rem;
      }
    }

    &__foot {
      padding: {
        top: 1rem;
        bottom: 1rem;
      }
      text-align: center;
      color: palette(gray, light);
      font: {
        family: $sans-serif;
        size: .85rem;
      }
      transition: color $transition;

      &:hover {
        color: palette(gray);
        a {
          color: palette(gray);
        }
      }

      a {
        color: palette(gray, light);
        transition: color $transition;

        &:hover {
          color: palette(orange);
        }
      }
    }
  }

  .dark .home {
    &__nav {
      border-bottom-color: palette(dark, light);

      &__logo {
        color: palette(blue);
      }

      &__button {
        color: palette(white);

        &.primary {
          background-color: palette(blue);
          border-color: palette(blue, dark);

          &:hover {
            border-color: palette(blue, x-dark);
          }
        }
      }
    }

    &__headline {
      color: palette(white);
    }

    &__browser {
      border-color: palette(blue);

      &__header {
        border-color: palette(blue);
      }

      &__button {
        border-color: palette(blue);
        color: palette(blue, dark);
      }

      &__name {
        color: palette(blue);
      }
    }

    &__subline {
      color: palette(white);

      span {
        background-color: palette(blue, a-light);
      }
    }

    &__foot {
      color: palette(dark, light);

      a {
        color: palette(dark, light);

        &:hover {
          color: palette(blue);
        }
      }
    }
  }
</style>
