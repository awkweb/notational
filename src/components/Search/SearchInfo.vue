<template>
  <div class="search__info">
    <span v-if="resultsCount == 1">
      1 note
    </span>
    <span v-else>
      {{ resultsCount }} notes
    </span>

    <span v-if="editing">
      <span class="command">esc</span> to focus search
    </span>
    <span v-else-if="renaming">
      <span class="command">enter</span> to save title
    </span>
    <span v-else-if="!searching">
      <span class="command">ctrl</span> + <span class="command">/</span> to focus search
    </span>
    <span v-else-if="queryLength > 0">
      <span class="command">ctrl</span> + <span class="command">enter</span> to create note
    </span>
    <span v-else-if="selected">
      <span class="command">enter</span> to edit note
    </span>
    <span v-else>
      Type to search
    </span>
    
  </div>
</template>

<script>
export default {
  name: 'search-info',

  props: ['resultsCount',
          'queryLength',
          'selected',
          'searching',
          'renaming',
          'editing'
  ]
}
</script>
