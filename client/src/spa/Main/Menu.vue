<template>
  <div class="menu">
    <div class="menu__item menu__item--training" @click="wordTraining">
        <i class="fas fa-running"></i>
    </div>
    <div class="menu__item menu__item--wordlist" @click="wordList">
      <i class="fas fa-list"></i>
    </div>
    <div class="menu__item menu__item--enterWord" @click="enterWord">
      <i class="fas fa-edit"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  methods: {
    wordTraining() {
      this.$router.push('/wordtraining');
    },
    enterWord() {
      this.$router.push('/enterword');
    },
    wordList() {
      this.$router.push('/wordlist');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common/variables';

.menu {
  display: grid;
  grid-template: repeat(2, 50%) / repeat(2, 50%);

  .menu__item {
    position: relative;
    padding: 4em 0;
    text-align: center;
    background-color: $masterColor;
    color: $masterContrastColor;
    border: 2px solid $backgroundColor;
    border-radius: 5px;
    cursor: pointer;

    &--training {
      grid-column: 1 / 3;
    }

    i {
      display: inline-block;
      font-size: 3em;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: all ease 1s;
    }

    &:hover {
      background-color: $subColor;

      i {
        transform: scale(1.5) translate(-25%, -25%);
      }
    }
  }
}
</style>
