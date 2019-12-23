<template>
  <button v-if="canGetFocus" :disabled="disabled">{{ labelValue }}</button>
  <button v-else @mousedown.prevent :disabled="disabled">
    {{ labelValue }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    labelValue: String,
    canGetFocus: Boolean,
    disabled: Boolean
  }
};
</script>

<style scoped lang="stylus">
button {
  background: #555;
  color: #eee;
  font-size: 13px;
  padding: 6px 12px;
  border-radius: 3px;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.4);

  &:not([disabled]) {
    &:hover {
      background: #111;
    }
  }

  &[disabled] {
    background: #999;
  }
}
</style>
