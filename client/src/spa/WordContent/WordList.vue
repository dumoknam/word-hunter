<template>
  <div class="wordList">
    <div class="wordList__bakground"></div>
    <common-header class="wordlist__header"></common-header>
    <div class="wordList__body">
      <form class="wordList__searchForm" action="#">
        <custom-input-text seq="WordListForm1" label="What words would you like to find?" placeholder="Enter the word"
        maxlength="50" v-model="searchKeyword" :filtercallback="onlyAlphaHangulNum"></custom-input-text>
      </form>
      <div class="wordList__messageWrap" v-show="hasNotWordItem">
        <p class="wordList__notFoundWord">Not found word<p/>
      </div>
      <div class="wordList__list">
        <div class="wordList__item" :class="isActive(index)" v-for="(item, index) in wordList" :key="index">
          <div class="item__summary" @click="setSelectedItem(index)">
            <p class="summary__wordName">{{ item.word_name }}</p>
            <p class="summary__wordMean">{{ meansToString(item.word_mean) }}</p>
          </div>
          <div class="item__detail" v-if="isActive(index)">
            <custom-input-text seq="WordListWord" label="English word" placeholder="Please enter an English word here" maxlength="50"
            v-model="word" :filtercallback="onlyAlphaHangulNum"
            :focusoutcallback="wordFocusOut"></custom-input-text>
            <custom-input-text-for-array label="Meaning of word" :array="item.word_mean" v-model="mean"
            :filtercallback="onlyAlphaHangulNum" :focusincallback="meanFocusIn" :focusoutcallback="meanFocusOut"></custom-input-text-for-array>
            <div class="item_messageWrap" v-show="hasNotWordMeanItem">
              <p class="item_notFoundMean">Not found mean</p>
            </div>
            <button type="button" class="btn item__delete" @click="setDeleteWord(item._id, item.isMemorized)">Delete</button>
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
import CustomInputTextForArray from '../../shared-components/CustomInputTextForArray';

export default {
  name: 'WordList',
  components: {
    'common-header': Header,
    'custom-input-text': CustomInputText,
    'custom-input-text-for-array': CustomInputTextForArray,
  },
  data() {
    return {
      searchKeyword: '',
      selectedWordIndex: '',
      wordList: [],
      word: '',
      mean: '',
      focusedMeanIndex: '',
      focusedMeanId: '',
      originalMean: '',
    };
  },
  watch: {
    searchKeyword(now) {
      if (now !== '') {
        this.searchWord(now);
      } else {
        this.getFullWordList();
      }
    },
  },
  computed: {
    hasNotWordItem() {
      return this.wordList.length < 1;
    },
    hasNotWordMeanItem() {
      return this.wordList[this.selectedWordIndex].word_mean.length < 1;
    },
  },
  methods: {
    ...mapActions([
      'readWordList',
      'readWord',
      'updateWord',
      'deleteWord',
      'updateWordMean',
      'deleteWordMean',
    ]),
    onlyAlphaHangulNum(value) {
      const reg = /[^0-9ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z!~,\s]/g;
      return value.replace(reg, '');
    },
    setWordList(wordList, memorizedList) {
      this.wordList = [];
      const words = wordList;
      const memorized = memorizedList;

      this.initSelectedItem();

      // which words not memorized
      for (let i = 0; i < words.length; i += 1) {
        words[i].isMemorized = false;
        this.wordList.push(words[i]);
      }
      // which words memorized
      for (let i = 0; i < memorized.length; i += 1) {
        memorized[i].isMemorized = true;
        this.wordList.push(memorized[i]);
      }

      // 정렬(대소문자 상관 없이)
      this.wordList.sort((a, b) => {
        if (a.word_name.toLowerCase() < b.word_name.toLowerCase()) return -1;
        if (b.word_name.toLowerCase() < a.word_name.toLowerCase()) return 1;
        return 0;
      });
    },
    // 단어 전체 조회
    async getFullWordList() {
      try {
        const data = await this.readWordList();
        this.setWordList(data.wordList, data.memorizedList);
      } catch (error) {
        throw new Error(error);
      }
    },
    // 키워드(단어명)을 통한 조회
    async searchWord(keyword) {
      try {
        const data = await this.readWord(keyword);
        this.setWordList(data.wordList, data.memorizedList);
      } catch (error) {
        throw new Error(error);
      }
    },
    // 단어명 수정
    async setUpdateWord(wordId, word) {
      const updateWordData = { wordId, word };
      try {
        const isSuccess = await this.updateWord(updateWordData);
        if (isSuccess) {
          this.wordList[this.selectedWordIndex].word_name = this.word;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    // 단어 삭제
    async setDeleteWord(wordId, isMemorized) {
      try {
        // 후에 단어 트레이닝시 암기된 단어와 그렇지 않은 단어를 구분지어
        // 컨텐츠를 제공하기 위해서 isMemorized를 추가하였다
        const deleteData = { wordId, isMemorized };
        const isSuccess = await this.deleteWord(deleteData);
        if (isSuccess) {
          this.wordList.splice(this.selectedWordIndex, 1);
          this.initSelectedItem();
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    // 단어 뜻 수정
    async setUpdateWordMean(meanId, mean) {
      const updateWordMeanData = { meanId, mean };
      try {
        const isSuccess = await this.updateWordMean(updateWordMeanData);
        if (isSuccess) {
          this.wordList[this.selectedWordIndex].word_mean[this.focusedMeanIndex].mean = this.mean;
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    // 단어 뜻 삭제
    async setDeleteWordMean(meanId) {
      try {
        const isSuccess = await this.deleteWordMean(meanId);
        if (isSuccess) {
          this.wordList[this.selectedWordIndex].word_mean.splice(this.focusedMeanIndex, 1);
        }
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
    initSelectedItem() {
      this.selectedWordIndex = '';
      this.word = '';
      this.mean = '';
    },
    setSelectedItem(index) {
      if (this.selectedWordIndex === index) {
        this.initSelectedItem();
        return;
      }
      this.selectedWordIndex = index;
      this.word = this.wordList[index].word_name;
    },
    isActive(index) {
      return this.selectedWordIndex === index ? 'wordList__item--active' : '';
    },
    wordFocusOut() {
      // Word name input 박스가 빈 값이면 기존 값으로 초기화
      if (this.word === '') {
        this.word = this.wordList[this.selectedWordIndex].word_name;
        return;
      }

      // Word name input 박스에서 focus out시 값이 변경되었다면 update
      if (this.wordList[this.selectedWordIndex].word_name !== this.word) {
        const wordId = this.wordList[this.selectedWordIndex]._id;
        this.setUpdateWord(wordId, this.word);
      }
    },
    meanFocusIn(index) {
      // original 단어 뜻저장, 가이드 수정중으로 변경
      this.focusedMeanIndex = index;
      this.focusedMeanId = this.wordList[this.selectedWordIndex].word_mean[index]._id;
      this.originalMean = this.wordList[this.selectedWordIndex].word_mean[index].mean;
    },
    meanFocusOut() {
      // Word mean input 박스 값이 빈 값이면 delete
      if (this.mean === '') {
        this.setDeleteWordMean(this.focusedMeanId);
      }

      // Word mean input 박스에서 focus out시 값이 변경되었다면 update
      if (this.originalMean !== this.mean) {
        this.setUpdateWordMean(this.focusedMeanId, this.mean);
      }
    },
    // 단어뜻 추가 버튼 개발 '+'로 추가하게끔
    // '+' 누르면 this.wordList에 word_mean 배열에 항목이 추가됨.
    // CustomInputTextForArray에서는 array를 deep:true로 watch해서 추가된 항목을
    // inputValueArray에 push해줌. (_id값은 공란으로 둠)
    // focusout될때 _id값이 공란인것은 insert시킴
  },
  created() {
    this.getFullWordList();
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common/base';

$item-margin: 0.4em;

.wordList__bakground {
  @include fixedBackground;
}

.wordlist__header {
  @include fixedHeader;
}

.wordList__body {
  @include bodyPadding;

  .wordList__messageWrap {
    position: relative;
    width: 100%;
    height: 50vh;

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
  }

  .wordList__list {
    display: grid;
    grid-template-columns: 100%;
    grid-row-gap: $item-margin;
    margin-bottom: 1.5em;

    .wordList__item {
      border: 3px solid $borderColor;
      border-radius: 5px;
      padding: 0.5em;
      height: 3.7em;

      &--active {
        border-color: $subColor;
        height: 100%;
        color: $masterContrastColor;
        background-color: $subColor;
      }

      &:hover {
        border-color: $subColor;
      }

      .item__summary {
        width: 100%;
        display: flex;
        line-height: 2.5em;
        cursor: pointer;

        .summary__wordName {
          width: 50%;
          text-align: left;
          font-size: 1.2em;
          font-weight: $fontBold;
        }

        .summary__wordMean {
          width: 50%;
          text-align: right;
          font-size: 1em;
          padding-top: 0.1em;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          font-weight: $fontBold;
        }
      }

      .item__detail {
        border-top: 2px solid $masterContrastColor;
        padding-top: 1em;

        .item_messageWrap {
          position: relative;
          width: 100%;
          height: 6em;
          margin-bottom: 1em;

          .item_notFoundMean {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            color: $borderColor;
            font-weight: $fontExtraBold;
            font-size: 1.2em;
            line-height: 1em;
          }
        }

        .item__delete {
          width: 100%;
        }
      }
    }
  }
}

@media (min-width: $pcMinWidth) {
  .wordList__body {
    .wordList__list {
      display: grid;
      grid-template-columns: 50% 50%;

      .wordList__item {
        margin-right: $item-margin;

        &:nth-child(2n) {
          margin-right: 0;
        }
      }
    }
  }
}

@media (min-width: $pcMidiumWidth) {
  .wordList__body {
    .wordList__list {
      display: grid;
      grid-template-columns: 33.3% 33.3% 33.3%;

      .wordList__item {
        margin-right: $item-margin;

        &:nth-child(n) {
          margin-right: $item-margin;
        }
        &:nth-child(3n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
