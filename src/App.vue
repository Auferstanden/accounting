<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus">
* {
  margin: 0;
  border: 0;
  padding: 0;
  outline: 0;
  line-height: inherit;
  font-size: inherit;
  font-family: inherit;
  font-weight: inherit;
  background: transparent;
  list-style: none;
  color: inherit;
  min-width: 0;
  word-wrap: break-word;
}

button::-moz-focus-inner, input::-moz-focus-inner {
  border: 0;
  padding: 0;
}

b {
  font-weight: bold;
}

html {
  font-family: arial, sans-serif;
  line-height: 1.5;
  font-size: 14px;
  color: #444;
  background: #f5f5f5;
  overflow-y: scroll;
}

table {
  border-collapse: collapse;
  table-layout: fixed;
  width: 100%;
}

button[disabled] {
  cursor: not-allowed;
}

button:not([disabled]) {
  cursor: pointer;
}
</style>
