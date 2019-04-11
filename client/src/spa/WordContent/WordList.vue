<template>
  <div class="wordList">
    <div class="wordList__bakground"></div>
    <common-header class="wordlist__header"></common-header>
    <div class="wordList__body">
      <form class="wordList__searchForm" action="#">
        <custom-input-text label="What words would you like to find?" placeholder="Enter the word or mean" maxlength="50" v-model="searchKeyword"></custom-input-text>
      </form>
      <p class="wordList__notFoundWord" v-show="wordNotExist">Not found word<p/>
      <div class="wordList__list">
        <div class="wordList__item" v-for="(value, key) in wordList" :key="key">
          <div class="item__summary">
            <p class="summary__wordName">{{ value.word_name }}</p>
            <p class="summary__wordMean">{{ meansToString(value.word_mean) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import Header from '../../shared-components/Header';
import CustomInputText from '../../shared-components/CustomInputText';

export default {
  name: 'WordList',
  components: {
    'common-header': Header,
    'custom-input-text': CustomInputText,
  },
  data() {
    return {
      searchKeyword: '',
      wordList: [
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
        {
          word_name: 'democracy',
          word_mean: [
            { mean: '민주주의' },
            { mean: '민주주의' },
            { mean: '민주주의' },
          ],
        },
      ],
    };
  },
  computed: {
    wordNotExist() {
      return this.wordList.length < 1;
    },
  },
  methods: {
    ...mapActions(['getWordList']),
    async getFullWordList() {
      try {
        this.wordList = await this.getWordList();
        console.log(this.wordList);
      } catch (error) {
        throw new Error(error);
      }
    },
    meansToString(meansArray) {
      return meansArray.reduce((onlyMeans, current) => {
        onlyMeans.push(current.mean);
        return onlyMeans;
      }, []).join(', ');
    },
  },
  created() {
    // this.getFullWordList();
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common/base';

.wordList {
  .wordList__bakground {
    @include fixedBackground;
  }

  .wordlist__header {
    @include fixedHeader;
  }

  .wordList__body {
    @include bodyPadding;

    .wordList__notFoundWord {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: $borderColor;
      font-weight: $fontExtraBold;
      font-size: 1.2em;
      line-height: 1em;
    }

    .wordList__list {
      margin-bottom: 1.5em;

      .wordList__item {
        margin-bottom: 0.5em;

        &:last-child {
          margin-bottom: 0;
        }

        .item__summary {
          padding: 0 0.4em;
          border: 3px solid $borderColor;
          border-radius: 5px;
          width: 100%;
          display: flex;
          line-height: 3em;
          padding: 0 0.4em;

          &:hover {
            border-color: $subColor;
            cursor: pointer;
          }

          .summary__wordName {
            width: 50%;
            text-align: left;
            font-size: 1.2em;
            font-weight: $fontBold;
          }

          .summary__wordMean {
            width: 50%;
            text-align: right;
            font-size: 0.9em;
            padding-top: 0.1em;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}

@media (min-width: $pcMinWidth) {
  .wordList__list {
    display: grid;
    grid-template-columns: 50% 50%;
  }

  .wordList__item {
    margin-right: 0.5em;

    &:nth-child(2n) {
      margin-right: 0;
    }
  }
}

@media (min-width: $pcMidiumWidth) {
  .wordList__list {
    display: grid;
    grid-template-columns: 33.3% 33.3% 33.3%;
  }

  .wordList__item {
    margin-right: 0.5em;

    &:nth-child(n) {
      margin-right: 0.5em;
    }
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
}
</style>
