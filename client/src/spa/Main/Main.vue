<template>
  <div class="main">
    <common-header class="main__header"></common-header>
    <main-profile class="main__profile"></main-profile>
    <main-menu class="main__menu"></main-menu>
  </div>
</template>

<script>
import Header from '../../shared-components/Header';
import Profile from '../Profile/Profile';
import Menu from './Menu';

export default {
  name: 'Main',
  components: {
    'common-header': Header,
    'main-profile': Profile,
    'main-menu': Menu,
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common/base';

.main {
  height: 100vh;
  display: grid;
  grid-template: 3.6em 40% 1fr / 100%;

  .main__profile {
    // 학습일수, 외운단어, 외워야할 단어 이력 개발 완료되면 다시 보이게하기
    display: none;
  }
}

@media (min-width: $pcMinWidth) {
  .main {
    // 학습일수, 외운단어, 외워야할 단어 이력 개발 완료되면 다시 보이게하기
    // grid-template: 3.6em 1fr/ 30% 70%;
    grid-template: 3.6em 1fr/ 100%;

    .main__header {
      grid-column: 1 / 3;
    }

    .main__profile {
      grid-area: 2 / 1 / 3 / 2;
    }
  }
}
</style>
