<template>
  <form class="login__form" action="#">
    <custom-input-text seq="LoginForm0" label="User name" max="9" v-model="uid"></custom-input-text>
    <custom-input-text seq="LoginForm1" isPassword="true"
    label="User password" v-model="password"></custom-input-text>
    <button type="submit" class="login__button login__button--signIn">Sign in</button>
    <button type="button" class="login__button login__button--signUp">Sign up</button>
  </form>
</template>

<script>
import customInputText from '../../shared-components/CustomInputText';

export default {
  name: 'LoginForm',
  components: {
    'custom-input-text': customInputText,
  },
  data() {
    return {
      uid: '',
      password: '',
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common/base';

.login__button {
  display: block;
  width: 100%;
  font-size: 1em;
  padding: 0.5em 0;
  border: 1px solid $borderColor;
  border-radius: 5px;
  margin-bottom: 0.3em;
  color: $color1;
  font-weight: $fontSemiBold;

  &:last-child {
    margin-bottom: 0;
  }

  &.login__button--signIn {
    background-color: $masterColor;
  }

  &.login__button--signUp {
    background-color: $color3;
  }
}
</style>
