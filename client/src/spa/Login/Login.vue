<template>
  <div class="login">
    <header class="login__logo">
      <login-logo></login-logo>
    </header>
    <login-form class="login__box"></login-form>
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
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common/base';

.login {
  font-size: 1rem;
  padding: 3%;

  .login__logo {
    font-size: 340%;
    text-align: center;
    margin: 0.5em 0 0.3em;
  }

  .login__box {
    width: 100%;
    max-width: $formMaxWidth;
    margin: 0 auto;
    box-shadow: 1px 1px 4px 1px #5D5D5D;
  }
}
</style>
