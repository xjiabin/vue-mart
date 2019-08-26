<template>
  <div id="app">

    <transition :name="transitionName">
      <!-- <keep-alive> -->
        <router-view class="view-warpper" />
      <!-- </keep-alive> -->
    </transition>

    <cube-tab-bar
      v-model="selectedLabel"
      :data="tabs"
      @change="changHandler"
      v-show="isNav"
    >
      <cube-tab v-for="(item, index) in tabs" :key="index" :icon="item.icon" :label="item.label">
        <div>{{ item.label }}</div>
        <span class="badge" v-if="showBadge(item)">{{ cartTotal }}</span>
      </cube-tab>
    </cube-tab-bar>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { Logout } from '@/api/index'

export default {
  data() {
    return {
      selectedLabel: 'home',
      isNav: false,
      tabs: [
        { label: 'home', icon: 'cubeic-home', value: '/' },
        { label: 'cart', icon: 'cubeic-mall', value: '/cart' },
        { label: 'person', icon: 'cubeic-person', value: '/person' }
      ],
      transitionName: 'route-forward',
    }
  },
  created () {
    this.selectedLabel = this.$route.name;
    this.isNav = this.$route.meta.isNav
  },
  methods: {
    ...mapMutations(['setToken']),
    changHandler(val) {
      this.$router.push({ name: val })
    },
    async logout() {
      try {
        await Logout();
      } catch (error) {
        this.$toast({txt: error.toString(), type: 'error'});
      }
    },
    showBadge(item) {
      return item.label === 'cart' && this.cartTotal > 0;
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'cartTotal'])
  },
  watch: {
    $route(route) {
      this.selectedLabel = route.name;
      this.isNav = this.$route.meta.isNav || false;

      this.transitionName = this.$router.transitionName;
    }
  },
}
</script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.cube-tab-bar {
  background-color: #edf0f4;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  .cube-tab {
    position: relative;
  }
}
.view-warpper {
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  padding-bottom: 47px;
}
.route-forward-enter {
  transform: translate3d(-100%, 0, 0);
}
.route-back-enter {
  transform: translate3d(100%, 0, 0);
}
.route-forward-leave-to {
  transform: translate3d(100%, 0, 0);
}
.route-back-leave-to {
  transform: translate3d(-100%, 0, 0);
}
.route-forward-enter-active,
.route-forward-leave-active,
.route-back-enter-active,
.route-back-leave-active {
  transition: transform .3s;
}

.badge {
  display: -webkit-box;
  display: -webkit-flex;
  display: flex;

  -webkit-box-align: center;
  -webkit-align-items: center;
  align-items: center;

  -webkit-box-pack: center;
  -webkit-justify-content: center;
  justify-content: center;

  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #f00;
  color: #fff;
  font-size: 10px;
  position: absolute;
  top: 5px;
  right: 28%;
}
</style>
