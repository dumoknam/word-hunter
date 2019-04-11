<template>
  <div class="customInput">
    <label v-if="label" class="customInput__label" :for="'customInput' + seq">{{ label }}</label>
    <input :type="type" class="customInput__input" :id="'customInput' + seq" :maxlength="maxlength"
    :placeholder="placeholder" @input="updateValue($event.target.value)" ref="input" v-model="inputValue" autocomplete="off">
    <p class="customInput__guide">{{guide}}</p>
  </div>
</template>

<script>
export default {
  name: 'CustomInputText',
  props: {
    seq: {
      type: String,
      default: '0',
    },
    label: {
      type: String,
      default: '',
    },
    maxlength: {
      type: String,
      default: '50',
    },
    placeholder: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    isPassword: {
      type: String,
      default: 'false',
    },
    guide: {
      type: String,
      default: '',
    },
    filtercallback: {
      type: Function,
    },
  },
  data() {
    return {
      inputValue: '',
    };
  },
  computed: {
    type() {
      return this.isPassword === 'true' ? 'password' : 'text';
    },
  },
  watch: {
    value(now) {
      this.inputValue = now;
    },
  },
  methods: {
    updateValue(value) {
      if (this.filtercallback) {
        this.inputValue = this.filtercallback(value);
        this.$emit('input', this.inputValue);
      } else {
        this.$emit('input', value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/common/base";

.customInput {
  margin-bottom: 1em;
  text-align: left;

  .customInput__label {
    font-size: 0.9em;
    font-weight: $fontBold;
  }

  .customInput__input {
    display: inline-block;
    width: 100%;
    border: 1px solid $borderColor;
    border-radius: 5px;
    line-height: 2em;
    box-sizing: border-box;
    padding: 5px;
    font-size: 0.9em;
    margin: 0.5em 0;
    outline: none;

    &:focus {
      border: 1px solid #07c;
    }
  }

  .customInput__guide {
    font-size: 0.7em;
    line-height: 1.2em;
  }
}
</style>

