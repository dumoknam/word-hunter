<template>
  <div class="login">
    <header class="login__logo">
      <login-logo></login-logo>
    </header>
    <div class="login__box">
      <login-form></login-form>
    </div>
  </div>
</template>

<script>
import LoginLogo from '../../shared-components/Logo';
import LoginForm from './LoginForm';

export default {
  name: 'Login',
  components: {
    'login-logo': LoginLogo,
    'login-form': LoginForm,
  },
  computed: {
    childCounter() {
      return this.$store.getters.getCounter;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common/base';

.login {
  font-size: 1rem;
  padding: 3%;

  .login__logo {
    font-size: 4em;
    text-align: center;
    margin: 1em 0 0.5em;
  }

  .login__box {
    width: 100%;
    max-width: $formMaxWidth;
    margin: 0 auto;
  }
}
</style>
