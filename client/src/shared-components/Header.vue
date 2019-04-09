<template>
  <header class="header">
    <div class="header__logo" @click="goMain">
      <header-logo></header-logo>
    </div>
    <p class="header__logout">
      <button type="button" @click="logout">Logout</button>
    </p>
  </header>
</template>

<script>
import Logo from './Logo';

export default {
  name: 'Header',
  components: {
    'header-logo': Logo,
  },
  methods: {
    goMain() {
      this.$router.push('/main');
    },
    logout() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('isAuth');
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/common/base';

.header {
  font-size: 1.2em;
  padding: 0.3em 1.5em;
  color: $masterContrastColor;
  background-color: $masterColor;
  @include clearfix;

  .header__logo {
    float: left;
    cursor: pointer;
  }

  .header__logout {
    float: right;
    button {
      font-size: 1em;
      padding: 0.5em 0;
      text-decoration: none;
      color: $masterContrastColor;
      background: transparent;
      border: none;
      outline: none;
      cursor: pointer;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
