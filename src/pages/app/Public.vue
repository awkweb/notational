<template>
  <div id="public"
    class="public">

    <spinner v-if="loading">
    </spinner>

    <template v-if="activeNote">
      <header class="public__header">
        <h1>{{ activeNote.name }}</h1>
        <span>Updated {{ activeNote.date_modified | prettyDate }}</span>
      </header>

      <div v-html="body"
        class="public__body">
      </div>

      <footer class="public__footer">
        <router-link to="/">notational.co</router-link>
      </footer>
    </template>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'

  import Spinner from '../../components/Spinner.vue'

  export default {
    name: 'public',

    data: () => ({
      loading: true,
    }),

    created () {
      if (this.$route.params.id) {
        this.getNote()
      }
    },

    components: {
      Spinner
    },

    computed: {
      ...mapGetters([
        'activeNote'
      ]),

      body () {
        return this.activeNote.body.replace('\n', '<br/>')
      }
    },

    methods: {
      ...mapActions([
        'FETCH_PUBLIC_NOTE_FOR_ID'
      ]),

      getNote () {
        this.FETCH_PUBLIC_NOTE_FOR_ID(this.$route.params.id)
        .then(() => this.loading = false)
        .catch(() => this.$router.push({ name: 'home' }))
      }
    },

    watch: {
      '$route': 'getNote'
    }

  }
</script>

<style lang="scss">
  @import '../../scss/_variables.scss';
  @import '../../scss/_functions.scss';

  .public {
    &__header, &__body {
      border-bottom: {
        width: 1px;
        style: solid;
        color: palette(gray, light);
      }
    }

    &__header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: {
        bottom: .35rem;
      }

      h1 {
        color: palette(orange);
        margin: 0;
        font: {
          size: 1rem;
        }
      }

      span {
        font: {
          size: .85rem;
        }
      }
    }

    &__body {
      word-wrap: break-word;
      white-space: pre-wrap;
      height: 18rem;
      overflow-y: scroll;
      color: palette(black);
      font: {
        size: .95rem;
        family: $sans-serif;
      }
      padding: {
        top: .75rem;
        bottom: .75rem;
      }
      margin: {
        bottom: .5rem;
      }
    }

    &__footer {
      text-align: center;
      font: {
        weight: 500;
        size: .9rem;
      }

      a {
        color: palette(orange);
        transition: color $transition;
      }
    }
  }
</style>
