<template>
  <div
    class="Field TextField"
    contenteditable
    @keypress="
      event => {
        if (event.key == 'Enter') {
          if (!event.shiftKey) {
            event.target.blur();
            return false;
          }
        }
      }
    "
    @keydown="
      event => {
        switch (event.key) {
          case 'ArrowUp':
            $emit('_up');
            break;

          case 'ArrowDown':
            $emit('_down');
        }
      }
    "
    @input="value = $event.currentTarget.innerText"
    @blur="emitChange"
  >
    &#8203;{{ defaultValue }}
  </div>
</template>

<script>
export default {
  name: "TextField",
  props: {
    defaultValue: String
  },
  data() {
    return {
      value: this.defaultValue
    };
  },
  methods: {
    emitChange() {
      this.$emit("_change", this.value);
    }
  }
};
</script>
