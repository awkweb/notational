<template>
  <div id="search" class="search">
    <div class="search__container">
      <input
        id="search-input"
        class="search__input"
        type="text"
        ref="input"
        v-model.trim="query"
        @focus="isSearchFocused = true"
        @blur="isSearchFocused = false"
        @input="updateQuery"
        @keyup.enter="onSearch"
        placeholder="Search or create"
        v-focus="true"
        spellcheck="false"
        autofocus
      >

      <search-info
        :resultsCount="filteredNotes.length"
        :queryLength="query.length"
        :selected="activeNote != null"
        :searching="isSearchFocused"
        :renaming="renamingId != null"
        :editing="editingId != null"
      />

      <button
        v-show="!preview"
        @click="onCreate"
        class="search__add"
      >
      </button>
    </div>

    <ul class="search__results">
      <search-result
        v-for="note in filteredNotes"
        class="list-complete-item"
        :key="note.id"
        :note="note"
        :isActive="activeNote && note.id == activeNote.id"
        :renaming="renamingId == note.id"
        @onResultSelect="onSelect"
        @onRenameBlur="onRenameBlur"
      />
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import keyboard from 'keyboardjs';
import { noteMixin, utilsMixin } from '../../mixins';
import SearchInfo from './SearchInfo';
import SearchResult from './SearchResult';

export default {
  name: 'search',
  mixins: [noteMixin, utilsMixin],
  props: {
    preview: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    query: '',
    isSearchFocused: true,
  }),
  created() {
    this.setUpHotKeys();
  },
  beforeDestroy() {
    keyboard.reset();
  },
  components: {
    SearchInfo,
    SearchResult,
  },
  computed: {
    ...mapGetters([
      'activeNote',
      'notes',
      'user',
      'resultIndex',
      'renamingId',
      'editingId',
    ]),
    filteredNotes() {
      let notes;
      if (this.query.length === 0) {
        notes = this.notes;
        return this.sortNotes(notes);
      }
      notes = this.filterNotesForQuery(this.query, this.notes);
      notes = this.sortNotes(notes, true);
      return notes;
    },
  },
  methods: {
    ...mapActions([
      'CREATE_NOTE',
      'RESET_ACTIVE_NOTE',
    ]),
    ...mapMutations([
      'SET_ACTIVE_NOTE',
      'SET_ACTIVE_KEY',
      'SET_QUERY',
      'SET_RESULT_INDEX',
    ]),
    setUpHotKeys() {
      keyboard.bind('ctrl + enter', () => this.onCreate());
      keyboard.bind('esc', () => this.onEscape());
      keyboard.bind('up', (e) => {
        if (!this.editingId && !this.renamingId) {
          e.preventDefault();
          this.onUp();
        }
      });
      keyboard.bind('down', (e) => {
        if (!this.editingId && !this.renamingId) {
          e.preventDefault();
          this.onDown();
        }
      });
    },
    onCreate() {
      const id = this.nextIdForNotes(this.notes);
      const name = this.query.length > 0 ? this.query : 'Untitled Note';
      const note = this.createNote(id, name);
      this.CREATE_NOTE(note);
    },
    onSearch() {
      if (this.activeNote) {
        const id = '#editor-textarea';
        this.focusElement(id);
      }
    },
    onEscape() {
      if (!this.editingId && !this.renamingId) {
        this.query = '';
        this.SET_QUERY('');
        this.RESET_ACTIVE_NOTE();
      }
      this.$refs.input.focus();
    },
    onUp() {
      if (this.resultIndex > 0) {
        const index = this.resultIndex - 1;
        this.SET_RESULT_INDEX(index);
        const note = this.filteredNotes[index];
        this.SET_ACTIVE_NOTE(note);
        const key = this.findKeyForNoteId(note.id, this.notes);
        this.SET_ACTIVE_KEY(key);
        this.scrollToNoteId(note.id, false);
      }
    },
    onDown() {
      if (this.resultIndex !== this.filteredNotes.length - 1) {
        const index = this.resultIndex + 1;
        this.SET_RESULT_INDEX(index);
        const note = this.filteredNotes[index];
        this.SET_ACTIVE_NOTE(note);
        const key = this.findKeyForNoteId(note.id, this.notes);
        this.SET_ACTIVE_KEY(key);
        this.scrollToNoteId(note.id, true);
      }
    },
    scrollToNoteId(noteId, alignToTop) {
      const container = this.selectElement('.search__results');
      const containerViewTop = container.scrollTop;
      const containerViewBottom = containerViewTop + container.offsetHeight;

      const element = this.selectElement(`#result_${noteId}`);
      const elementTop = element.offsetTop - 104;
      const elementBottom = elementTop + element.offsetHeight;

      const isVisible = (elementBottom <= containerViewBottom) && (elementTop >= containerViewTop);
      if (!isVisible) {
        element.scrollIntoView(alignToTop);
      }
    },
    onSelect(note) {
      if (this.resultIndex === -1 || note.id !== this.activeNote.id) {
        const index = this.filteredNotes.indexOf(note);
        this.SET_RESULT_INDEX(index);
        this.SET_ACTIVE_NOTE(note);

        const key = this.findKeyForNoteId(note.id, this.notes);
        this.SET_ACTIVE_KEY(key);
      }
    },
    onRenameBlur() {
      this.$refs.input.focus();
    },
    updateQuery() {
      const hasSearchResults = this.filteredNotes.length > 0;
      const note = hasSearchResults ? this.filteredNotes[0] : null;
      const key = hasSearchResults ? this.findKeyForNoteId(note.id, this.notes) : null;
      const resultIndex = hasSearchResults ? 0 : -1;

      this.SET_ACTIVE_NOTE(note);
      this.SET_ACTIVE_KEY(key);
      this.SET_RESULT_INDEX(resultIndex);
      this.SET_QUERY(this.query);
    },
  },
};
</script>

<style lang="scss">
  @import '../../assets/styles/variables';
  @import '../../assets/styles/functions';
  @import '../../assets/styles/mixins';

  .search {
    display: flex;
    flex-direction: column;
    position: relative;

    mark {
      background-color: palette(orange, a-light);
      color: palette(black);
      transition: background-color $transition, color $transition;
    }

    .dark & mark {
      background-color: palette(blue, a-light);
      color: palette(white);
    }

    &__container {
      display: flex;
      flex-direction: column;
      height: 4.5rem;
      margin: {
        bottom: 0;
        left: 0;
        right: 0;
        top: 1rem;
      }

      @media screen and (max-width: $sm) {
        margin: {
          top: .25rem;
        }
      }
    }

    &__input {
      @include border(palette(gray, light));
      @include background(
          transparent,
          "../../assets/light/search.svg",
          25px,
          99%
      );

      color: palette(black);
      box-shadow: $box-shadow;
      flex: 1;
      font: {
        family: $sans-serif;
        size: 1rem;
      }
      max-height: 25px;
      outline: 0;
      padding: {
        bottom: 9px;
        right: 30px;
        left: 10px;
        top: 9px;
      }
      transition: border-color $transition, background $transition, color $transition;

      &:focus {
        border-color: palette(orange);
      }

      &::placeholder {
        color: palette(gray);
        transition: color $transition;
      }
    }

    .dark &__input {
      border-color: palette(dark, light);
      background-image: url("../../assets/dark/search.svg");
      color: palette(white);

      &:focus {
        border-color: palette(blue);
      }

      &::placeholder {
        color: palette(dark, x-light);
      }
    }

    &__info {
      color: palette(gray, dark);
      display: flex;
      font-size: .75rem;
      justify-content: space-between;
      margin: {
        left: .4rem;
        right: .4rem;
        top: .4rem;
      }
      transition: color $transition;

      .command {
        text-transform: uppercase;
        color: palette(black);
        background-color: palette(gray, x-light);
        font-family: $mono;
        padding: {
          bottom: .05rem;
          right: .1rem;
          left: .1rem;
          top: .05rem;
        }
        transition: background-color $transition, color $transition;
      }
    }

    .dark &__info {
      color: palette(dark, x-light);

      .command {
        color: palette(white);
        background-color: palette(dark, d-light);
      }
    }

    &__add {
      background: {
        color: transparent;
        image: url("../../assets/light/add.svg");
        repeat: no-repeat;
        size: cover;
      }
      border: 0;
      cursor: pointer;
      font: {
        size: 2rem;
      }
      height: 35px;
      opacity: .35;
      outline: 0;
      position: absolute;
      right: -2.5rem;
      top: 1.3rem;
      transition: background-image $transition, opacity $transition;
      width: 35px;

      &:hover {
        opacity: 1;
      }

      @media screen and (max-width: 645px) {
        right: 2rem;
      }

      @media screen and (max-width: $sm) {
        height: 33px;
        right: 1.85rem;
        top: .65rem;
        width: 33px;
      }
    }

    .dark &__add {
      background-image: url("../../assets/dark/add.svg");
    }

    &__results {
      height: 8rem;
      list-style-type: none;
      margin: {
        bottom: .5rem;
        top: 0;
      }
      overflow-y: auto;
      padding-left: 0;
    }

    &__result {
      color: palette(black);
      cursor: pointer;
      display: flex;
      align-items: center;
      font: {
        family: $sans-serif;
        size: .95rem;
      }
      justify-content: space-between;
      height: 31px;
      padding: {
        bottom: 0;
        right: .4rem;
        left: .4rem;
        top: 0;
      }
      transition: color $transition;

      span {
        white-space: nowrap;
      }

      &.active {
        background-color: palette(gray, x-light);
        transition: color $transition;
      }

      &__name {
        overflow: hidden;
        text-overflow: ellipsis;
      }

      &__description {
        color: palette(gray, dark);
        transition: color $transition;
      }

      &__time {
        padding-left: .5rem;
      }

      &__delete {
        height: 27px;
        min-width: 27px;
        padding: 0;
        outline: 0;
        background: {
          color: transparent;
          repeat: no-repeat;
          position: center;
          image: url("../../assets/trash.svg");
        }
        border: 0;
        cursor: pointer;
      }

      &__editor {
        background-color: palette(gray, x-light);
        border: 0;
        color: palette(black);
        flex: 1;
        font: {
          family: $sans-serif;
          size: .95rem;
        }
        padding: 0;
        outline: 0;
      }
    }

    .dark &__result {
      color: palette(white);

      &.active {
        background-color: palette(dark, d-light);
      }

      &__description {
        color: palette(dark, x-light);
      }

      &__editor {
        background-color: palette(dark, d-light);
        color: palette(white);
      }
    }
  }
</style>
