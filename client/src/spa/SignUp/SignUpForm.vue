<template>
  <form class="form signUp__form" action="#">
    <custom-input-text seq="SignUpForm0" label="User name" v-model="uid"></custom-input-text>
    <custom-input-text seq="SignUpForm1" isPassword="true"
    label="Password" v-model="password"></custom-input-text>
    <custom-input-text seq="SignUpForm2" label="Nickname" v-model="nickname"></custom-input-text>
    <custom-input-text seq="SignUpForm3" label="Email" v-model="email"></custom-input-text>
    <button type="submit" class="btn signUp__button signUp__button--signIn">Sign up</button>
  </form>
</template>

<script>
import customInputText from '../../shared-components/CustomInputText';

export default {
  name: 'SignUpForm',
  components: {
    'custom-input-text': customInputText,
  },
  data() {
    return {
      uid: '',
      password: '',
      nickname: '',
      email: '',
    };
  },
};
</script>

<style lang="scss" scoped>
.signUp__button {
  width: 100%;
}
</style>

