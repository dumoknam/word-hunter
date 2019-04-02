<template>
  <div class="profile">
    <div class="profile__main">
      <p class="profile__picture"></p>
      <button type="button" class="btn">Study history</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common/_base.scss';

.profile {
  background-color: $masterContrastColor;
  padding: 40px 0 20px;

  .profile__main {
    text-align: center;

    .profile__picture {
      background: url("../../assets/images/Alpaca.svg") no-repeat bottom;
      background-color: $subColor;
      width: 160px;
      height: 160px;
      margin: 0 auto 25px;
      padding: 0.7em;
      border: {
        width: 2px;
        color: $masterColor;
        style: solid;
        radius: 50%;
      }
      overflow: hidden;
      transition: all ease 1s;
      cursor: pointer;

      &:hover {
        transform: scale(1.1, 1.1);
        border-color: $masterContrastColor;
      }
    }
  }
}
</style>

