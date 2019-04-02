<template>
  <form class="form login__form" action="#">
    <custom-input-text seq="LoginForm0" label="User name" max="9" v-model="uid"></custom-input-text>
    <custom-input-text seq="LoginForm1" isPassword="true"
    label="Password" v-model="password"></custom-input-text>
    <button type="submit" class="btn login__button login__button--signIn">Sign in</button>
    <p class="login__button login__button--signUp">If this is your first time, please
      <router-link to="/signup" class="btn__anchor">sign up</router-link>
    </p>
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
.login__button {
  width: 100%;
  margin-bottom: 1.6em;

  &:last-child {
    margin-bottom: 0;
  }

  &.login__button--signUp {
    text-align: center;
    font-size: 0.8em;
  }
}
</style>
