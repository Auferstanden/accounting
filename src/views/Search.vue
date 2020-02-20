<template>
  <div class="Search">
    <Masthead></Masthead>

    <div class="content">
      <h2>金銭出納表を探す</h2>
      <TableSelector></TableSelector>
    </div>
  </div>
</template>

<script>
import Masthead from '@/components/Masthead'
import TableSelector from '@/components/TableSelector'

export default {
  name: 'search',
  components: {
    Masthead,
    TableSelector
  }
}
</script>

<style scoped lang="stylus">
h2 {
  font-size: 24px;
  padding: 18px 0;
}

.content {
  padding: 12px;
  width: 960px;
  max-width: 100%;
  box-sizing: border-box;
  margin: 0 auto;
}
</style>
