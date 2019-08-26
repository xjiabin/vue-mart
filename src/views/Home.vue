<template>
  <div class="home" v-if="sliders">
    <k-header title="首页"></k-header>

    <cube-slide :data="sliders">
      <cube-slide-item v-for="slide in sliders" :key="slide.id">
        <router-link :to="slide.img" class="slide-link">
          <img :src="slide.img">
        </router-link>
      </cube-slide-item>
    </cube-slide>

    <cube-button @click="clickHandler">选择分类</cube-button>

    <goods-list :goods="goodsList" class="goods-list" @addCart="addCart"></goods-list>

    <cube-drawer
      ref="drawer"
      title="请选择分类"
      :data="[cateData]"
      @select="selectHandler"
    >
    </cube-drawer>

    <!-- 小球 -->


  </div>
</template>

<script>
import { GetGoods } from '@/api/index'
import GoodsList from '@/components/GoodsList.vue';
import create from '@/services/create';
import Ball from '@/components/Ball.vue';

const cateMap = {
  fe: '前端',
  python: 'python',
  java: 'java',
  bigdata: '大数据',
  ai: 'ai',
}

export default {
  name: 'home',
  data() {
    return {
      sliders: [], // 轮播图
      goods: [], // 所有商品
      keys: [], // 所有的商品分类
      selectedKey: [], // 选择/过滤 的商品分类
    }
  },
  created () {
    this.initData();
  },
  computed: {
    goodsList() { // 过滤商品数据
      let ret = [];
      this.selectedKey.forEach(v => {
        ret = ret.concat(this.goods[v]);
      })

      return ret;
    },
    cateData() {
      return this.keys.map(v => {
        return {
          value: v,
          text: cateMap[v]
        }
      })
    }
  },
  methods: {
    async initData() {
      try {
        const resp = await GetGoods();
        if (resp) {
          const { code, message, data, slider, keys } = resp.data;
          this.sliders = slider;
          this.goods = data;
          this.keys = keys;
          this.selectedKey = [...this.keys]
        }

      } catch (error) {
        this.$toast({txt: error.toString(), type: 'error'});
      }
    },
    clickHandler() {
      this.$refs.drawer.show();

      // 使用 cube-ui 创建全局组件
      // const notice = this.$createNotice()
      // notice.add({
      //   content: 'create api'
      // });

      // 自定义services方法
      this.$notice.info({
        content: '自定义notice',
        duration: 3000
      })
    },
    selectHandler(val) {
      this.selectedKey = [...val]
    },

    addCart(el) {
      // 保存元素
      // this.ball.el = el;
      // this.ball.show = true;

      // let ball = this.$createBall({
      //   el,
      //   onTransitionend() {
      //     console.log('end');
      //     ball.remove();
      //   }
      // });
      // ball.start();

      const anim = create(Ball, { el })
      anim.start();
      anim.$on('transitionend', () => {
        anim.remove();
      })
    },
  },
  components: {
    GoodsList,
  },
}
</script>

<style lang="scss" scoped>
.slide-link {
  img {
    width: 100%;
  }
}
.goods-list {
  padding-top: 30px;
}
.ball-wrap {
  .ball {
    position: fixed;
    left: 50%;
    bottom: 10px;
    z-index: 100000;
    color: red;
    transition: all 0.5s cubic-bezier(0.49, -0.29, 0.75, 0.41);
    .inner {
      width: 16px;
      height: 16px;
      transition: all 0.5s linear;

      .cubeic-add {
        font-size: 22px;
      }
    }
  }
}
</style>


