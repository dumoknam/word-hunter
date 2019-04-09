<template>
  <div class="profile">
    <div class="profile__main">
      <p class="profile__picture"></p>
      <button type="button" class="btn profile__openStudyHistory"
      @click="openStudyHistory" v-show="isMobile">Study history</button>
    </div>
    <study-history class="profile__studyHistory" v-model="showStudyHistory"></study-history>
  </div>
</template>

<script>
import StudyHistory from './StudyHistory';

export default {
  name: 'Profile',
  components: {
    'study-history': StudyHistory,
  },
  data() {
    return {
      showStudyHistory: false,
      isMobile: true,
    };
  },
  methods: {
    openStudyHistory() {
      this.showStudyHistory = true;
    },
    closeStudyHistory() {
      this.showStudyHistory = false;
    },
    handleResize() {
      if (window.innerWidth > 767) {
        if (this.isMobile) {
          this.openStudyHistory();
        }
        this.isMobile = false;
      } else {
        if (!this.isMobile) {
          this.closeStudyHistory();
        }
        this.isMobile = true;
      }
    },
  },
  created() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/common/base';

.profile {
  position: relative;

  .profile__main {
    position: relative;
    text-align: center;
    height: 100%;
    margin: 20px 0 0;

    .profile__picture {
      background: url("../../assets/images/Alpaca.svg") no-repeat bottom;
      background-color: $subColor;
      width: 45vw;
      max-width: 160px;
      height: 45vw;
      max-height: 160px;
      margin: 0 auto;
      margin-bottom: 20px;
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
        border-color: $backgroundColor;
      }
    }

    .profile__openStudyHistory {
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
}

@media (min-width: $pcMinWidth) {
  .profile {
    .profile__main {
      height:inherit;
    }
  }
}
</style>

