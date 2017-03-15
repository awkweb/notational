<template>
  <div class="search__info">
    <span v-if="resultsCount == 1">
      1 note
    </span>
    <span v-else>
      {{ resultsCount }} notes
    </span>

    <span v-if="editing">
      Press esc to focus search
    </span>
    <span v-else-if="queryLength > 0">
      Press ctrl + enter to create
    </span>
    <span v-else-if="renaming">
      Press enter to save
    </span>
    <span v-else>
      Type to search
    </span>
    
  </div>
</template>

<script>
export default {
  name: 'info',

  props: ['resultsCount', 'queryLength', 'renaming', 'editing']
}
</script>
