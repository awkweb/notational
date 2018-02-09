<template>
  <div
    id="nv"
    class="nv"
    :class="theme"
  >
    <div class="container">
      <spinner v-if="loading"/>

      <template v-else>
        <search/>
        <editor/>
        <foot/>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import { localStorageMixin } from '../../mixins';
import Spinner from '../../components/Spinner';
import Search from '../../components/Search/Index';
import Editor from '../../components/Editor/Index';
import Foot from '../../components/Foot/Index';

export default {
  name: 'nv',
  mixins: [localStorageMixin],
  data: () => ({
    loading: true,
  }),
  created() {
    const user = this.ls_pullUser();
    this.SET_USER(user);
    this.FETCH_USER_DATA()
      .then(() => {
        this.loading = false;
      });
  },
  components: {
    Editor,
    Foot,
    Search,
    Spinner,
  },
  computed: {
    ...mapGetters([
      'theme',
    ]),
  },
  methods: {
    ...mapActions([
      'FETCH_USER_DATA',
    ]),
    ...mapMutations([
      'SET_USER',
    ]),
  },
  head: {
    title: {
      inner: 'App',
    },
  },
};
</script>
