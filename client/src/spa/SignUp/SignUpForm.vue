<template>
  <form class="form signUp__form" @submit.prevent="onSubmit">
    <custom-input-text seq="SignUpForm0" label="User name" maxlength="15" v-model="name" :guide="nameGuide" ref="username"></custom-input-text>
    <custom-input-text seq="SignUpForm1" isPassword="true"
    label="Password" maxlength="20" v-model="password" :guide="passwordGuide" ref="password"></custom-input-text>
    <custom-input-text seq="SignUpForm2" label="Nickname" maxlength="10" v-model="nickname" :guide="nicknameGuide" ref="nickname"></custom-input-text>
    <custom-input-text seq="SignUpForm3" label="Email" v-model="email" :guide="emailGuide" ref="email"></custom-input-text>
    <button type="submit" class="btn signUp__button signUp__button--signIn">Sign up</button>
  </form>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import CustomInputText from '../../shared-components/CustomInputText';

export default {
  name: 'SignUpForm',
  components: {
    'custom-input-text': CustomInputText,
  },
  data() {
    return {
      name: '',
      password: '',
      nickname: '',
      email: '',
      nameGuide: '',
      nameOK: false,
      passwordGuide: '',
      passwordOK: false,
      nicknameGuide: 'If you don\'t enter nickname, I\'ll do what I want',
      nicknameOK: true,
      emailGuide: '',
      emailOK: true,
    };
  },
  watch: {
    name(now) {
      const reg = /^[a-zA-Z0-9]{4,15}/;
      if (!reg.test(now)) {
        this.nameGuide = 'Username may only at least 3 and contain alphanumeric characters';
      } else {
        this.isDuplicatedId();
      }
    },
    password(now) {
      const reg = /(?=.*\d)(?=.*[a-zA-Z]).{8,15}/;

      if (!reg.test(now)) {
        this.passwordGuide = 'Make sure it\'s at least 8 charactors and including a alphabet and number';
        this.passwordOK = false;
      } else {
        this.passwordGuide = '';
        this.passwordOK = true;
      }
    },
    nickname(now) {
      // eslint-disable-next-line
      const reg = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;

      if (reg.test(now)) {
        this.nicknameGuide = 'No special characters!';
        this.nicknameOK = false;
      } else {
        if (this.nickname) {
          this.nicknameGuide = '';
        } else {
          this.nicknameGuide = 'If you don\'t enter nickname, I\'ll do what I want';
        }
        this.nicknameOK = true;
      }
    },
    email(now) {
      const reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

      if (now && !reg.test(now)) {
        this.emailGuide = 'Please enter a valid email address';
        this.emailOK = false;
      } else {
        this.emailGuide = '';
        this.emailOK = true;
      }
    },
  },
  computed: {
    ...mapGetters({
      apiResponseMessage: 'getApiResponseMessage',
    }),
  },
  methods: {
    ...mapActions(['signup', 'idcheck']),
    async isDuplicatedId() {
      try {
        const isDuplicated = await this.idcheck(this.name);
        if (isDuplicated) {
          // name 중복 O
          this.nameGuide = 'Duplicated';
          this.nameOK = false;
        } else {
          // name 중복 x
          this.nameGuide = '';
          this.nameOK = true;
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async onSubmit() {
      // 각 폼의 유효성 체크
      if (!this.nameOK) {
        this.$refs.username.$refs.input.focus();
        return;
      } else if (!this.passwordOK) {
        this.$refs.password.$refs.input.focus();
        return;
      } else if (!this.nicknameOK) {
        this.$refs.nickname.$refs.input.focus();
        return;
      } else if (!this.emailOK) {
        this.$refs.email.$refs.input.focus();
        return;
      }

      const signupData = {
        name: this.name,
        password: this.password,
        nickname: this.nickname,
        email: this.email,
      };

      try {
        const isSuccess = await this.signup(signupData);
        alert(this.apiResponseMessage);
        if (isSuccess) {
          // 성공
          this.goToLogin();
        } else {
          // 실패
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    goToLogin() {
      this.$router.push('/');
    },
  },
};
</script>

<style lang="scss" scoped>
.signUp__button {
  width: 100%;
}
</style>

