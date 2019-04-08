<template>
  <div class="signUp">
    <header class="signUp__logo">
      <signup-logo></signup-logo>
    </header>
    <signup-form class="signUp__box"></signup-form>
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
    font-size: 340%;
    text-align: center;
    margin: 0.5em 0 0.3em;
  }

  .signUp__box {
    width: 100%;
    max-width: $formMaxWidth;
    margin: 0 auto;
    box-shadow: 1px 1px 4px 1px #5D5D5D;
  }
}
</style>
