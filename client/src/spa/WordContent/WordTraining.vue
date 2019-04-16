<template>
  <div class="wordTraining">
    <div class="wordTraining__bakground"></div>
    <common-header class="wordTraining__header"></common-header>
    <div class="wordTraining__start" v-if="!isStart">
      <button type="button" class="btn wordTraining__startBtn" @click="trainingStart">START</button>
    </div>
    <div class="wordTraining__top" v-if="isStart">
      <p class="wordTraining__timer">{{ time }}</p>
      <p class="wordTraining__question">{{ question.value }}</p>
    </div>
    <div class="wordTraining__bottom" v-if="isStart">
      <div class="wordTraining__exampleBtn" :class="getShowAnswerClass(item.isRight)" v-for="(item, index) in examples" :key="index" @click="chooseAnswer(item.isRight)">
        <p class="wordTraining__exampleText">{{ item.value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Header from '../../shared-components/Header';

export default {
  name: 'WordTraining',
  components: {
    'common-header': Header,
  },
  data() {
    return {
      start: false,
      question: {},
      examples: [],
      counter: null,
      time: 10,
      chooseAnswerTrigger: {
        true(callback) {
          callback();
        },
        false(callback) {
          callback();
        },
      },
      showAnswer: false,
      showAnswerTimeout: null,
    };
  },
  computed: {
    isStart() {
      return this.start;
    },
  },
  methods: {
    ...mapActions([
      'getExamQuestion',
      'increaseWordScore',
    ]),
    trainingStart() {
      this.start = true;
      this.readyQuestion();
    },
    // 트레이닝 문제 준비
    readyQuestion() {
      const type = Math.floor(Math.random() * 2);
      this.showAnswer = false;
      this.getQuestion(type);
    },
    // 트레이닝 문제 조회
    async getQuestion(type) {
      try {
        const q = await this.getExamQuestion(type);
        if (q.success) {
          this.question = q.data.question;
          this.examples = q.data.examples;

          this.countDownStart();
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    // 단어 스코어 증가
    async upScore() {
      try {
        const wordId = this.question.word_id;
        const isSuccess = await this.increaseWordScore(wordId);
        if (isSuccess) {
          this.readyQuestion();
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    getShowAnswerClass(isRight) {
      return isRight && this.showAnswer ? 'wordTraining__exampleBtn--answer' : '';
    },
    showCorrectAnswer() {
      this.showAnswer = true;
      const showAnswerTimeout = setTimeout(() => {
        if (!this.showAnswer) {
          clearTimeout(showAnswerTimeout);
          return;
        }
        this.showAnswer = false;
        this.readyQuestion();
      }, 3000);
    },
    // 카운트 다운 핸들러
    counterHandler() {
      if (this.time < 1) {
        clearInterval(this.counter);
        this.endCounterCallback();
        return;
      }
      this.time -= 1;
    },
    // 카운트 다운 시작
    countDownStart() {
      this.time = 10;
      this.countDownStop();
      this.counter = setInterval(this.counterHandler, 1000);
    },
    // 카운트 다운 정지
    countDownStop() {
      clearInterval(this.counter);
    },
    // 카운트 다운 끝 콜백
    endCounterCallback() {
      this.showCorrectAnswer();
    },
    // 답 선택 이벤트
    chooseAnswer(isRight) {
      this.countDownStop();
      if (this.showAnswer) {
        this.readyQuestion();
        return;
      }
      this.chooseAnswerTrigger[isRight](isRight ? this.upScore : this.showCorrectAnswer);
    },
  },
  beforeDestroy() {
    this.countDownStop();
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common/base';

.wordTraining {
  position: relative;
  height: 100vh;
  display: grid;
  grid-template: 3.6em 40% 1fr / 100%;

  .wordTraining__bakground {
    @include fixedBackground;
  }

  .wordTraining__start {
    position: relative;
    grid-row: 2 / 4;

    .wordTraining__startBtn {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 2.5em;
      padding: 0.5em 1em;
    }
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

      &--answer {
        background-color: #2C8b25;

        &:hover {
          background-color: #50AF49;
        }
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

    .wordTraining__start {
      grid-column: 1 / 3;
    }

    .wordTraining__header {
      grid-column: 1 / 3;
    }
  }
}
</style>
