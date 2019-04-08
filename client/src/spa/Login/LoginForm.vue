<template>
  <form class="form login__form" @submit.prevent="onSubmit">
    <custom-input-text seq="LoginForm0" label="User name" maxlength="15" v-model="loginData.name"></custom-input-text>
    <custom-input-text seq="LoginForm1" isPassword="true"
    label="Password" v-model="loginData.password" maxlength="20"></custom-input-text>
    <button type="submit" class="btn login__button login__button--signIn">Sign in</button>
    <p class="login__button login__button--signUp">If this is your first time, please
      <router-link to="/signup" class="btn__anchor">sign up</router-link>
    </p>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import customInputText from '../../shared-components/CustomInputText';

export default {
  name: 'LoginForm',
  components: {
    'custom-input-text': customInputText,
  },
  data() {
    return {
      loginData: {
        name: '',
        password: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      apiResponseMessage: 'getApiResponseMessage',
    }),
  },
  methods: {
    ...mapActions(['login']),
    async onSubmit() {
      try {
        const isLoginSuccess = await this.login(this.loginData);
        if (isLoginSuccess) this.goToMain();
        else alert(this.apiResponseMessage);
      } catch (error) {
        throw new Error(error);
      }
    },
    goToMain() {
      this.$router.push('/main');
    },
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
