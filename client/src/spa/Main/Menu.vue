<template>
  <div class="menu">
    <div class="menu__item menu__item--training">
        <i class="fas fa-running"></i>
    </div>
    <div class="menu__item menu__item--wholeWord">
      <i class="fas fa-list"></i>
    </div>
    <div class="menu__item menu__item--enterWord">
      <i class="fas fa-edit"></i>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../../assets/scss/common/variables';

.menu {
  display: grid;
  grid-template: repeat(2, 50%) / repeat(2, 50%);

  .menu__item {
    position: relative;
    padding: 4em 0;
    text-align: center;
    background-color: $masterColor;
    color: $masterContrastColor;
    border: 2px solid $masterContrastColor;
    cursor: pointer;

    &--training {
      grid-column: 1 / 3;
    }

    i {
      display: inline-block;
      font-size: 3em;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover {
      background-color: $subColor;
    }
  }
}
</style>
