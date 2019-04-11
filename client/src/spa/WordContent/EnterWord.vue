<template>
  <div class="enterWord">
    <div class="enterWord__background"></div>
    <common-header class="enterWord__header"></common-header>
    <div class="enterWord__body">
      <form class="enterWord__form" @submit.prevent="onSubmit">
        <custom-input-text label="English word" placeholder="Please enter an English word here" maxlength="50" v-model="word" ref="word" :filtercallback="onlyAlphaHangulNum"></custom-input-text>
        <custom-input-text label="Meaning of word" placeholder="Enter it yourself" maxlength="50" v-model="mean" ref="mean" :filtercallback="onlyAlphaHangulNum"></custom-input-text>
        <div class="wordList">
          <p class="wordList__notFoundMean" v-show="wordMeanNotExist">Not found means of word<p/>
          <div class="wordList__item" v-for="(value, key) in wordMeanList" :key="key">
            <input type="checkbox" class="item__checkbox" :id="key" @click="isChecked" :value="JSON.stringify(value)">
            <label :for="key" class="item__label">{{ value.mean }}</label>
          </div>
        </div>
        <button type="submit" class="btn enterWord__enter">Enter word!</button>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Header from '../../shared-components/Header';
import CustomInputText from '../../shared-components/CustomInputText';

export default {
  name: 'EnterWord',
  components: {
    'common-header': Header,
    'custom-input-text': CustomInputText,
  },
  data() {
    return {
      word: '',
      mean: '',
      // 추후에 api로 단어 검색해서 뜻 여기다 넣어주면됨 아래 양식대로
      wordMeanList: [
        // { mean: 'Alpaca0' },
        // { mean: 'Alpaca1' },
        // { mean: 'Alpaca2' },
        // { mean: 'Alpaca3' },
        // { mean: 'Alpaca0' },
        // { mean: 'Alpaca1' },
        // { mean: 'Alpaca2' },
        // { mean: 'Alpaca3' },
        // { mean: 'Alpaca0' },
        // { mean: 'Alpaca1' },
        // { mean: 'Alpaca2' },
        // { mean: 'Alpaca3' },
        // { mean: 'Alpaca0' },
        // { mean: 'Alpaca1' },
        // { mean: 'Alpaca2' },
        // { mean: 'Alpaca3' },
      ],
      selectedMeanList: [],
    };
  },
  computed: {
    wordMeanNotExist() {
      return this.wordMeanList.length < 1;
    },
  },
  methods: {
    ...mapActions(['enterWord']),
    onlyAlphaHangulNum(value) {
      const reg = /[^0-9ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z!~\s]/g;
      return value.replace(reg, '');
    },
    initProps() {
      this.word = '';
      this.mean = '';
      this.wordMeanList = [];
      this.selectedMeanList = [];
    },
    isChecked(e) {
      const element = e.target;
      const value = JSON.parse(element.value);

      if (element.checked) {
        this.selectedMeanList.push(value);
      } else {
        const props = this.selectedMeanList.map((item) => { return item.mean; });
        this.selectedMeanList.splice(props.indexOf(value.mean), 1);
      }
    },
    async onSubmit() {
      if (!this.word) {
        this.$refs.word.$refs.input.focus();
        return;
      }

      if (this.mean) {
        this.selectedMeanList.push({ mean: this.mean });
      }
      if (this.selectedMeanList.length === 0) {
        this.$refs.mean.$refs.input.focus();
        return;
      }

      const enterWordData = {
        word: this.word,
        means: this.selectedMeanList,
      };

      try {
        const isSuccess = await this.enterWord(enterWordData);
        if (isSuccess) {
          alert('Success!');
          this.initProps();
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common/base';

.enterWord {
  .enterWord__background {
    @include fixedBackground;
  }

  .enterWord__header {
    @include fixedHeader;
  }

  .enterWord__body {
    @include bodyPadding;
    text-align: center;

    .enterWord__form {
      .wordList {
        position: relative;
        margin-bottom: 1em;
        height: 40vh;
        overflow: scroll;

        .wordList__notFoundMean {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: $borderColor;
          font-weight: $fontExtraBold;
          font-size: 1.2em;
          line-height: 1em;
        }

        .wordList__item {
          margin-bottom: 0.3em;

          &:last-child {
            margin-bottom: 0;
          }

          .item__checkbox {
            display: none;

            &:checked + .item__label {
              color: $masterContrastColor;
              background-color: $subColor;
            }
          }

          .item__label {
            display: block;
            padding: 0.4em 0;
            border-radius: 5px;
            border: 1px solid $borderColor;
            cursor: pointer;

            &:hover {
              border-color: $subColor;
            }
          }
        }
      }
      .enterWord__enter {
        width: 70%;
      }
    }
  }
}
</style>
