<template>
  <div class="customInput">
    <label v-if="label" class="customInput__label" :for="'customInput' + seq">{{ label }}</label>
    <input :type="type" class="customInput__input" :id="'customInput' + seq" :max="max"
    :placeholder="placeholder" @input="updateValue($event.target.value)">
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
    max: {
      type: String,
      default: '10',
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
  },
  data() {
    return {
    };
  },
  computed: {
    type() {
      return this.isPassword === 'true' ? 'password' : 'text';
    },
  },
  methods: {
    updateValue(value) {
      this.$emit('input', value);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/common/base";

.customInput {
  margin-bottom: 1em;

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
    margin-top: 0.5em;
    outline: none;

    &:focus {
      border: 1px solid #07c;
    }
  }
}
</style>

