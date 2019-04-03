<template>
  <div class="studyHistory" v-show="isShow">
    <dl class="studyHistory__details">
      <dt>Learning days</dt>
      <dd>30</dd>
      <dt>Memorized words</dt>
      <dd>50</dd>
      <dt>Remaining words</dt>
      <dd>80</dd>
    </dl>
    <button type="button" class="btn studyHistory__close" @click="hide">Close</button>
  </div>
</template>

<script>
export default {
  name: 'StudyHistory',
  props: {
    value: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  computed: {
    isShow() {
      return this.value;
    },
  },
  methods: {
    hide() {
      this.$emit('input', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common/base';

.studyHistory {
  $study-history-padding: 2em;

  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: $backgroundColor;
  padding: $study-history-padding;
  text-align: center;

  .studyHistory__details {
    line-height: 1.5em;

    dt {
      float: left;
      text-align: left;
      font-weight: $fontBold;
    }

    dd {
      overflow: hidden;
      text-align: right;
    }
  }

  .studyHistory__close {
      position: absolute;
      bottom: $study-history-padding;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 20px;
  }
}

@media (min-width: $mobileMinWidth) {
  .studyHistory {
    display: block;
    position: relative;
    text-align: center;
    border-top: 3px solid $masterColor;

    .studyHistory__close {
      display: none;
      position: static;
      transform: none;
    }
  }
}
</style>

