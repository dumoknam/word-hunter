<template>
  <div class="wordTraining">
    <div class="wordTraining__bakground"></div>
    <common-header class="wordTraining__header"></common-header>
    <div class="wordTraining__top">
      <p class="wordTraining__timer">10</p>
      <p class="wordTraining__question">{{ question }}</p>
    </div>
    <div class="wordTraining__bottom">
      <div class="wordTraining__exampleBtn" v-for="(item, index) in examples" :key="index">
        <p class="wordTraining__exampleText">{{ item.example }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../../shared-components/Header';

export default {
  name: 'WordTraining',
  components: {
    'common-header': Header,
  },
  data() {
    return {
      question: 'be able to be able tobe able to be able to be able to',
      examples: [
        {
          example: '~을 하다',
          isRight: true,
        },
        {
          example: '~을 할 수 있다 ~을 할 수 있다 ~을 할 수 있다',
          isRight: false,
        },
        {
          example: '~에 눕다',
          isRight: false,
        },
        {
          example: '~의 위에 있다',
          isRight: false,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common/base';

.wordTraining {
  height: 100vh;
  display: grid;
  grid-template: 3.6em 40% 1fr / 100%;

  .wordTraining__bakground {
    @include fixedBackground;
  }

  $lineHeight: 1.3em;

  .wordTraining__top {
    position: relative;

    .wordTraining__timer {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      padding: 0.4em;
      font-size: 1.3em;
      font-weight: $fontExtraBold;
      font-style: italic;
    }

    .wordTraining__question {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      transform: translateY(-50%);
      padding: 0 0.3em;
      text-align: center;
      font-size: 2em;
      font-weight: $fontSemiBold;
      line-height: $lineHeight;
    }
  }

  .wordTraining__bottom {
    display: grid;
    grid-template: 50% 50% / 50% 50%;

    .wordTraining__exampleBtn {
      position: relative;
      background-color: $masterColor;
      color: $masterContrastColor;
      border: 2px solid $masterContrastColor;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background-color: $subColor;
      }

      .wordTraining__exampleText {
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        transform: translateY(-50%);
        padding: 0 0.3em;
        font-size: 1.2em;
        font-weight: $fontSemiBold;
        line-height: $lineHeight;
        text-align: center;
      }
    }
  }
}

@media (min-width: $pcMinWidth) {
  .wordTraining {
    grid-template: 3.6em 1fr / 45% 55%;

    .wordTraining__header {
      grid-column: 1 / 3;
    }
  }
}
</style>
