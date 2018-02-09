<template>
  <footer class="foot">
    <foot-share-note
      v-if="showShareNote && activeNote"
      @onDone="onShareNote"
    />

    <foot-actions
      v-else
      @onShareNote="onShareNote"
    />
  </footer>
</template>

<script>
import { mapGetters } from 'vuex';
import FootActions from './FootActions';
import FootShareNote from './FootShareNote';

export default {
  name: 'foot',
  data: () => ({
    showShareNote: false,
  }),
  computed: {
    ...mapGetters([
      'activeNote',
    ]),
  },
  components: {
    FootActions,
    FootShareNote,
  },
  watch: {
    activeNote() {
      this.showShareNote = false;
    },
  },
  methods: {
    onShareNote() {
      this.showShareNote = !this.showShareNote;
    },
  },
};
</script>
