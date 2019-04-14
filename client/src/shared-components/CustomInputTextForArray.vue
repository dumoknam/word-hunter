<template>
  <div class="customInputArray">
    <label v-if="label" class="customInputArray__label" :for="'customInputArray' + seq">{{ label }}</label>
    <input type="text" class="customInputArray__input" :id="'customInputArray' + seq" v-for="(item, index) in inputValueArray" :maxlength="maxlength" :placeholder="placeholder"
    @input="updateValue(item.mean)" v-model="item.mean" ref="input" autocomplete="off" :key="index" @focus="focusIn(item, index)" @blur="focusOut()">
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
    array: {
      type: Array,
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
    },
    filtercallback: {
      type: Function,
    },
    focusincallback: {
      type: Function,
    },
    focusoutcallback: {
      type: Function,
    },
  },
  data() {
    return {
      focusedItem: '',
      inputValueArray: [],
    };
  },
  methods: {
    focusIn(item, index) {
      this.focusedItem = item;
      this.$emit('input', item.mean);
      if (this.focusincallback) {
        // const originalMean = this.array[index].mean;
        this.focusincallback(index);
      }
    },
    focusOut() {
      if (this.focusoutcallback) {
        this.focusoutcallback(this.focusedItem);
      }
    },
    updateValue(mean) {
      if (this.filtercallback) {
        this.focusedItem.mean = this.filtercallback(mean);
        this.$emit('input', this.focusedItem.mean);
      } else {
        this.$emit('input', mean);
      }
    },
    createArrayClone(array) {
      this.inputValueArray = [];
      for (let i = 0; i < array.length; i += 1) {
        this.inputValueArray.push({
          id: array[i]._id,
          mean: array[i].mean,
        });
      }
    },
  },
  created() {
    this.$watch('array', (now) => {
      this.createArrayClone(now);
    });
    this.createArrayClone(this.array);
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/common/base";

.customInputArray {
  margin-bottom: 1em;
  text-align: left;

  .customInputArray__label {
    font-size: 0.9em;
    font-weight: $fontBold;
  }

  .customInputArray__input {
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
}
</style>
