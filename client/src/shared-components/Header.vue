<template>
  <header class="header__logo">
    <header-logo></header-logo>
  </header>
</template>

<script>
import Logo from './Logo';

export default {
  name: 'Header',
  components: {
    'header-logo': Logo,
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/common/base';

.header__logo {
  font-size: 1.2em;
  padding: 0.3em 1.5em;
  color: $masterContrastColor;
  background-color: $masterColor;
}
</style>
