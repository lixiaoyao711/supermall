<template>
  <div id="home">
    <NavBar id="home-nav">
      <div slot="center">购物街</div>
    </NavBar>
    <TabControl :titles="['精选','新款','流行']" @tabClick="tabClick" v-show="isTop" ref="tabControl2"></TabControl>
    <Scroll class="content" ref="scroll" :probeType="3" :pullUpLoad="true" @scroll="centerClick" @pullingUp="upload">
      <HomeSwiper :banners="banners" @imgLoad='imgLoad'></HomeSwiper>
      <Recommd :recommends="recommends"></Recommd>
      <Feature></Feature>
      <TabControl :titles="['精选','新款','流行']" class="tab-control" @tabClick="tabClick" ref="tabControl1" ></TabControl>
      <GoodsList :goods="showgoods"></GoodsList>
    </Scroll>
    <BackTop @click.native="backClick" class="back-top" v-show="isShow"></BackTop>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goodslist/GoodsList";
import Scroll from "components/common/scroll/Scroll";
//运用mixin混入不需要在单独导入
// import BackTop from "components/content/backTop/BackTop";

import HomeSwiper from "./childComps/HomeSwiper";
import Recommd from "./childComps/Recommd";
import Feature from "./childComps/Feature";
import { debounce } from "common/utils"
import { getHomeMultidata, getHomeGoods } from "network/home";
import { itemListener,backTop } from "common/ximind"

export default {
  name: "Home",
    data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      // isShow: false,
      // isTop: false,
      // offSetTop: 0,
      currentType: "pop",
      SaveY: 0,
    };
  },
  components: {
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    //运用mixin混入不需要在单独注册
    // BackTop,
    HomeSwiper,
    Recommd,
    Feature,
  },
  created() {
    this.getHomeMultidata();

    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mixins:[itemListener,backTop],
  destroyed() {

  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.SaveY)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.SaveY = this.$refs.scroll.getScorllY()
    //取消全局事件的监听
    this.$bus.$off("itemImgLoad",this.imglisern)
  },
  mounted() {

  },
  computed: {
    showgoods() {
      return this.goods[this.currentType].list;
    },
  },
  methods: {
    //事件监听方法
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      this.$refs.tabControl1.cruuerIndex = index
      this.$refs.tabControl2.cruuerIndex = index
      // console.log(index);
    },
    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // },
    imgLoad() {
      this.offSetTop = this.$refs.tabControl1.$el.offsetTop
    },
    centerClick(pos) {
      this.isShow = -pos.y > 1000;
      this.isTop = -pos.y > this.offSetTop
      // console.log(pos);
    },
    //上拉加载更多
    upload() {
      this.getHomeGoods(this.currentType)
    },


    //网络请求方法
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // console.log(res);
        this.banners = res.data.data.banner.list;
        this.recommends = res.data.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        this.goods[type].list.push(...res.data.data.list);
        this.goods[type].page += 1;

        //上拉持续加载更多
        this.$refs.scroll.finishPullUp()
      });
    },
  },
};
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
}

#home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 原生样式吸顶效果,使用了beterscroll后可以不设置 */
  /* position: fixed;
  left: 0px;
  right: 0px;
  top: 0px;
  z-index: 9; */
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0px;
  right: 0px;
}

/* .content {
  height: calc(100% - 93px);
  overflow: hidden;
  margin-top: 44px;
} */

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>