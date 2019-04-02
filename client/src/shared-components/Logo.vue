<template>
  <div class="logo">
    <p class="logo__icon">
      <img src="../assets/images/Alpaca.svg" alt="">
    </p>
    <div class="logo__title">
      <p class="logo__word">Word</p>
      <p class="logo__hunter">Hunter</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Logo',
};
</script>

<style lang="scss" scoped>
@import '../assets/scss/common/base';

@keyframes up-down {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(0.1em);
  }
  100% {
    transform: translateY(0);
  }
}

.logo {
  display: inline-block;
  line-height: 0.8em;
  animation-name: up-down;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  font-size: 1em;
  @include clearfix;

  .logo__icon {
    float: left;
    vertical-align: top;

    img {
      width: 2em;
    }
  }

  .logo__title {
    float: right;
    padding: 0.33em 0;
    width: 3.5em;

    .logo__word {
      text-align: left;
    }

    .logo__hunter {
      text-align:right;
    }
  }
}
</style>
