<template>
  <div class="main">
    <main-header class="main__header"></main-header>
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
    'main-header': Header,
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
}

@media (min-width: $pcMinWidth) {
  .main {
    grid-template: 3.6em 1fr/ 30% 70%;

    .main__header {
      grid-column: 1 / 3;
    }

    .main__profile {
      grid-area: 2 / 1 / 3 / 2;
    }
  }
}
</style>
