<template>
  <div class="search__info">
    <span v-if="resultsCount == 1">
      1 note
    </span>
    <span v-else>
      {{ resultsCount }} notes
    </span>

    <span v-if="editing">
      Press <span class="command">esc</span> to focus search
    </span>
    <span v-else-if="!searching">
      Press <span class="command">ctrl</span> + <span class="command">/</span> to focus search
    </span>
    <span v-else-if="queryLength > 0">
      Press <span class="command">ctrl</span> + <span class="command">enter</span> to create
    </span>
    <span v-else-if="renaming">
      Press <span class="command">enter</span> to save
    </span>
    <span v-else-if="selected">
      Press <span class="command">enter</span> to edit note
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
          'editing']
}
</script>
