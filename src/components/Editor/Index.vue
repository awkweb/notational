<template>
  <div class="editor">
    <template v-if="activeNote">
      <editor-highlight
        :body="activeNote.body"
      />

      <textarea
        id="editor-textarea"
        class="editor__textarea"
        v-model="activeNote.body"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
        placeholder="The quick brown fox..."
        rows="12"
      >
      </textarea>
    </template>

    <div
      class="editor__placeholder"
      v-else
    >
      No Note Selected
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import keyboard from 'keyboardjs';
import { utilsMixin } from '../../mixins';
import EditorHighlight from './EditorHighlight';

export default {
  name: 'editor',
  mixins: [utilsMixin],
  props: ['isPreview'],
  components: {
    EditorHighlight,
  },
  created() {
    if (!this.isPreview) {
      this.setUpHotKeys();
    }
  },
  beforeDestroy() {
    keyboard.reset();
  },
  computed: {
    ...mapGetters([
      'activeNote',
      'query',
      'editingId',
    ]),
  },
  methods: {
    ...mapActions([
      'UPDATE_NOTE',
    ]),
    ...mapMutations([
      'SET_RESULT_INDEX',
      'SET_EDITING_ID',
    ]),
    setUpHotKeys() {
      keyboard.bind('tab', (e) => {
        e.preventDefault();
        if (this.activeNote) {
          this.onEditorFocus();
        }
      });
    },
    onEditorFocus() {
      const id = '#editor-textarea';
      this.focusElement(id);
    },
    onInput() {
      this.UPDATE_NOTE(this.activeNote);
      if (this.activeNote.id !== this.editingId) {
        this.SET_RESULT_INDEX(0);
      }
    },
    onFocus() {
      if (this.activeNote.id !== this.editingId) {
        this.SET_EDITING_ID(this.activeNote.id);
      }
    },
    onBlur() {
      this.SET_EDITING_ID(null);
    },
  },
};
</script>
