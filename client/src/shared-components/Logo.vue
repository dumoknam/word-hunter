<template>
  <div class="logo">
    <p class="logo__word">Word</p>
    <p class="logo__hunter">Hunter</p>
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
  line-height: 0.7em;
  color: $masterColor;
  width: 3.5em;
  animation-name: up-down;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  font-size: 5rem;

  .logo__word {
    text-align: left;
  }

  .logo__hunter {
    text-align:right;
  }
}
</style>
