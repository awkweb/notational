<template>
  <div class="share-note">
    <div class="share-note__container">
      <div class="share-note__copy">
        <input
          v-model="noteUrl"
          @focus="selectUrl"
          id="share-note-url"
          class="share-note__url"
          readonly="true"
        >
        <button
          @click="onCopyLink"
          :data-clipboard-text="noteUrl"
          id="clipboardjs"
          class="share-note__button"
        >
          {{ copyButtonText }}
        </button>
      </div>

      <div class="share-note__permission">
        <button
          @click="onTogglePermission"
          :class="activeNote.is_public ? 'on' : 'off'"
          class="share-note__checkbox"
        >
          {{ activeNote.is_public ? "On" : "Off" }}
        </button>

        <span class="share-note__info">Anyone with the link can view</span>
      </div>
    </div>

    <button
      @click="onDone"
      class="button"
    >
      Done
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Clipboard from 'clipboard';
import { utilsMixin } from '../../mixins';

export default {
  name: 'foot-share-note',
  data: () => ({
    copyButtonText: 'Copy',
  }),
  mounted() {
    const id = '#clipboardjs';
    const button = this.selectElement(id);
    const clipboard = new Clipboard(button);
    clipboard
      .on('success', () => { this.copyButtonText = 'Copied!'; })
      .on('error', () => { this.copyButtonText = 'Error'; });
  },
  mixins: [utilsMixin],
  computed: {
    ...mapGetters([
      'activeKey',
      'activeNote',
    ]),
    noteUrl() {
      return `https://notational.co/n/${this.activeKey}`;
    },
  },
  methods: {
    ...mapActions([
      'TOGGLE_IS_PUBLIC',
    ]),
    selectUrl() {
      const id = '#share-note-url';
      const input = this.selectElement(id);
      input.select();
    },
    onCopyLink() {
      setTimeout(() => { this.copyButtonText = 'Copy'; }, 800);
    },
    onTogglePermission() {
      this.TOGGLE_IS_PUBLIC(this.activeNote);
    },
    onDone() {
      this.$emit('onDone');
    },
  },
};
</script>
