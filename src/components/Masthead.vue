<template>
  <div>
    <div class="Masthead">
      <router-link to="/">Accounting</router-link>
    </div>
    <div class="pad"></div>
  </div>
</template>

<script>
export default {
  name: 'Masthead'
}
</script>

<style scoped lang="stylus">
.Masthead {
  z-index: 1;
  font-size: 18px;
  padding: 18px calc(2% + 10px);
  line-height: 1;
  background: #fff;
  box-shadow: 0 4px 4px -2px rgba(0, 0, 0, 0.2);
  position: fixed;
  left: 0;
  top: 0;
  right: 0;

  & a {
    text-decoration: none;
    color: inherit;
  }
}

.pad {
  height: 54px;
}
</style>
