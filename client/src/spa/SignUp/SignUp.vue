<template>
  <div class="signUp">
    <header class="signUp__logo">
      <signup-logo></signup-logo>
    </header>
    <div class="signUp__box">
      <signup-form></signup-form>
    </div>
  </div>
</template>

<script>
import SignUpLogo from '../../shared-components/Logo';
import SignUpForm from './SignUpForm';

export default {
  name: 'SignUp',
  components: {
    'signup-logo': SignUpLogo,
    'signup-form': SignUpForm,
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common/base';

.signUp {
  font-size: 1rem;
  padding: 3%;

  .signUp__logo {
    font-size: 4em;
    text-align: center;
    margin: 1em 0 0.5em;
  }

  .signUp__box {
    width: 100%;
    max-width: $formMaxWidth;
    margin: 0 auto;
  }
}
</style>
