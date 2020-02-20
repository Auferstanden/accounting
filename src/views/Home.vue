<template>
  <div id="home">
    <Masthead></Masthead>
    <TableSelector></TableSelector>
    <TableSwitchBar></TableSwitchBar>
  </div>
</template>

<script>
import Masthead from '@/components/Masthead'
import TableSelector from '@/components/TableSelector'
import TableSwitchBar from '@/components/TableSwitchBar'

export default {
  name: 'Home',
  components: {
    Masthead,
    TableSelector,
    TableSwitchBar
  }
}
</script>

<style scoped lang="stylus">
#home {
  width: 880px;
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
