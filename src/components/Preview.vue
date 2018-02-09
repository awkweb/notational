<template>
  <div id="preview"
       class="preview">
    <div class="container">
      <spinner v-if="loading"/>

      <template v-else>
        <search
          :preview="true"
        />
        <editor
          :isPreview="true"
        />
        <foot/>
      </template>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { localStorageMixin } from '../mixins';
import Spinner from './Spinner';
import Search from './Search/Index';
import Editor from './Editor/Index';
import Foot from './Foot/Index';

export default {
  name: 'preview',
  mixins: [localStorageMixin],
  data: () => ({
    loading: true,
  }),
  created() {
    this.FETCH_PREVIEW_DATA()
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
  methods: {
    ...mapActions([
      'FETCH_PREVIEW_DATA',
    ]),
  },
};
</script>
