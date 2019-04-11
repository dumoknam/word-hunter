<template>
  <div class="wordList">
    <common-header class="wordlist__header"></common-header>
    <div class="form wordList__body">
      <form class="wordList__searchForm" action="#">
        <custom-input-text label="What words would you like to find?" placeholder="Enter the word or mean" maxlength="50" v-model="searchKeyword"></custom-input-text>
      </form>
      <div class="wordList__list">
        <div v-for="(value, key) in wordList" :key="key">{{ value.word_name }}</div>
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
      wordList: [],
    };
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
  },
  created() {
    this.getFullWordList();
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common/base';

.wordList {
  .wordList__body {
    .wordList__searchForm {
    }
  }
}
</style>
