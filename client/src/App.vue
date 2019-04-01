<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex';

export default {
  name: 'App',
  computed: {
    ...mapGetters([
      'getCounter',
    ]),
  },
  methods: {
    ...mapMutations([
      'addCounter',
      'subCounter',
      'setNum',
    ]),
    ...mapActions([
      'upCounter',
    ]),
  },
};
</script>

<style lang="scss">
@import './assets/scss/style';
</style>
