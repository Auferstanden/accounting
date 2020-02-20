<template>
  <input
    class="Field DigitField"
    type="text"
    v-model="indicatedValue"
    @focus="$event.target.select()"
    @blur="commit"
    @keydown="
      event => {
        $emit('keydown', event);
        switch (event.key) {
          case 'Enter':
            event.target.blur();
            break;

          case 'ArrowUp':
            if (event.altKey) {
              value++;
            } else {
              $emit('_up');
            }
            break;

          case 'ArrowDown':
            if (event.altKey) {
              value--;
            } else {
              $emit('_down');
            }
        }
      }
    "
    @keypress="$emit('keypress', $event)"
    @keyup="$emit('keyup', $event)"
  />
</template>

<script>
export default {
  name: 'DigitField',
  props: {
    defaultValue: Number,
    minValue: Number,
    maxValue: Number,
    doEmitBeforeCommitting: Boolean
  },
  data () {
    return {
      key: null,
      emittedValue: Number(this.defaultValue),
      value: Number(this.defaultValue)
    }
  },
  watch: {
    value (value, before) {
      if (value !== null) {
        if (value > this.maxValue) {
          this.value = this.maxValue
        }

        if (value < this.minValue) {
          this.value = this.minValue
        }
      }

      if (this.doEmitBeforeCommitting) {
        this.emitChange()
      }
    }
  },
  computed: {
    indicatedValue: {
      get () {
        if (this.value !== null) {
          return this.value.toLocaleString()
        } else {
          return ''
        }
      },
      set (input) {
        if (input.length === 0) {
          this.value = null
          return
        }

        let value = input

        value = value.replace(',', '')
        value = value.replace('ー', '-')
        value = value.replace('＋', '+')
        value = value.replace(/[０-９]/g, s => {
          return String.fromCharCode(s.charCodeAt(0) - 65248)
        })

        const num = Number(value)

        /*
        if (this.key === "Backspace") {
          if (!Number.isNaN(num)) {
            this.value = num;
          } else {
            this.value = 0;
          }
        } else {
          if (!Number.isNaN(num)) {
            this.value = num;
          }
        } */

        if (!Number.isNaN(num)) {
          this.value = num
        }
      }
    }
  },
  methods: {
    commit () {
      if (this.value === null) {
        this.value = this.minValue
      }
      this.$forceUpdate()
      this.emitChange()
    },
    emitChange () {
      let value = this.value
      if (value === null) {
        value = this.minValue
      }
      if (this.emittedValue !== value) {
        this.$emit('_change', value)
        this.emittedValue = value
      }
    }
  }
}
</script>
