<template>
  <div id="detaile">
    <DetailNav class="detail-nav" @taitleClick="taitleClick" ref="detailnav"></DetailNav>
    <BScroll class="center" ref="scroll" :probeType="3" @scroll="centerClick">
      <DetailSwiper :TopImages="TopImages" @imgLoad="imgLoad"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <!-- <DetailGoodsInfo :detailInfo="detailInfo" @imageLoad="imageLoad"></DetailGoodsInfo> -->
      <DetailParamInfo :paramInfo="paramInfo" ref="param"></DetailParamInfo>
      <DetailCommentsInfo :commentsInfo="commentsInfo" ref="comment"></DetailCommentsInfo>
      <GoodsList :goods="reconmmend" ref="reconmm"></GoodsList>
    </BScroll>
    <DetailButtomNav></DetailButtomNav>
    <BackTop @click.native="backClick" class="back-top" v-show="isShow"></BackTop>
  </div>
</template>

<script>
import DetailNav from "./childComps/DetailNav";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentsInfo from "./childComps/DetailCommentsInfo";
import GoodsList from "components/content/goodslist/GoodsList";
import DetailButtomNav from "./childComps/DetailButtomNav";

//运用mixin混入不需要在单独导入
// import BackTop from "components/content/backTop/BackTop";

import BScroll from "components/common/scroll/Scroll";

import {
  GetDetail,
  Goods,
  Shop,
  GoodsParam,
  GetRconmmend,
} from "network/detail";
import { itemListener, backTop } from "common/ximind";
import { debounce } from "common/utils";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      TopImages: [],
      goods: {},
      shop: {},
      //运用mixin混入不需要在单独注册
      // BackTop,
      detailInfo: {},
      paramInfo: {},
      commentsInfo: {},
      reconmmend: [],
      backTops: [],
      debounceFunc: null,
      currdIndex: 0,
      // indexHight: 0,
      // isShow: false,
      // isTop: false,
      // offSetTop: 0,
    };
  },
  mixins: [itemListener, backTop],
  components: {
    DetailNav,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentsInfo,
    GoodsList,
    DetailButtomNav,

    BScroll,
  },
  created() {
    this.iid = this.$route.params.iid;

    GetDetail(this.iid).then((res) => {
      const data = res.data.result;
      this.TopImages = data.itemInfo.topImages;
      // console.log(res);
      // console.log(res);
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //获取店铺信息
      this.shop = new Shop(data.shopInfo);
      //保存商品图片的详情数据
      this.detailInfo = data.detailInfo;
      // console.log(this.detailInfo);
      //获取参数详情数据
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论详情数据
      if (data.rate.cRate !== 0) this.commentsInfo = data.rate.list[0];
      //获取推荐商品数据
    });

    GetRconmmend().then((res) => {
      this.reconmmend = res.data.data.list;
      // console.log(res.data.data.list);
    });

    // this.$nextTick(() => {

    // //根据最新的数据对应的doom已经被渲染出来
    // //但是图片依然没有加载完（获取到的offsettop不包括其中图片的高度）

    // // 每次换一个商品就需要重新计算高度
    // this.backTops = []
    // //获取每个参数，评论.....的高度
    // this.backTops.push(0)
    // this.backTops.push(this.$refs.comment.$el.offsetTop)
    // this.backTops.push(this.$refs.param.$el.offsetTop)
    // this.backTops.push(this.$refs.reconmm.$el.offsetTop)
    // console.log(this.backTops);
    // })

    //第一次取值不对：this.$refs.comment.$el.offsetTop没渲染
    //点击参数，评论.....跳转到相应数据显示地方
    this.debounceFunc = debounce(() => {
      // 每次换一个商品就需要重新计算高度
      this.backTops = [];
      //获取每个参数，评论.....的高度
      this.backTops.push(0);
      //+44是detailnar的高度，不减去会有有点误差
      this.backTops.push(this.$refs.param.$el.offsetTop - 44);
      this.backTops.push(this.$refs.comment.$el.offsetTop - 44);
      this.backTops.push(this.$refs.reconmm.$el.offsetTop - 44);
      this.backTops.push(Number.MAX_VALUE);
      // console.log(this.backTops);
    }, 100);
  },
  destroyed() {
    this.$bus.$off("itemImgLoad", this.imglisern);
  },
  updated() {
    // this.backTops = []
    // //获取每个参数，评论.....的高度
    // this.backTops.push(0)
    // this.backTops.push(this.$refs.param.$el.offsetTop)
    // this.backTops.push(this.$refs.comment.$el.offsetTop)
    // this.backTops.push(this.$refs.reconmm.$el.offsetTop)
    // console.log(this.backTops);
  },
  methods: {
    imageLoad() {
      // console.log('+++');
      this.$refs.scroll.refresh();
    },
    imgLoad() {
      this.debounceFunc();
    },
    taitleClick(index) {
      // switch (index) {
      //   case 0: this.indexHight = 0
      //   break
      //   case 1: this.indexHight = -753
      //   break
      //   case 2: this.indexHight = -2029
      //   break
      //   case 3: this.indexHight = -2236
      //   break
      // }
      this.$refs.scroll.scrollTo(0, -this.backTops[index], 500);
      // console.log(index);
    },

    // backClick() {
    //   this.$refs.scroll.scrollTo(0, 0, 500);
    // },
    centerClick(pos) {
      this.isShow = -pos.y > 1000;
      this.isTop = -pos.y > this.offSetTop;
      // console.log(pos);

      //滑动到内容,nav颜色跟着变化
      const posy = -pos.y;
      let length = this.backTops.length;

      //普通方法
      // for(let i = 0; i < length; i++) {
      //   if( this.currdIndex !== i && ((i < length-1 && posy >= this.backTops[i] && posy <= this.backTops[i+1]) ||
      //   (i === length-1 && posy >= this.backTops[i]))) {
      //     this.currdIndex = i
      //     // console.log(this.currdIndex);
      //     this.$refs.detailnav.currdIndex = this.currdIndex
      //   }
      // }

      //简介方法
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currdIndex !== i &&
          i < length - 1 &&
          posy >= this.backTops[i] &&
          posy <= this.backTops[i + 1]
        ) {
          this.currdIndex = i;
          this.$refs.detailnav.currdIndex = this.currdIndex;
        }
      }
    },
  },
  mounted() {
    // this.backTops = []
    // //获取每个参数，评论.....的高度
    // this.backTops.push(0)
    // this.backTops.push(this.$refs.comment.$el.offsetTop)
    // this.backTops.push(this.$refs.param.$el.offsetTop)
    // this.backTops.push(this.$refs.reconmm.$el.offsetTop)
    // console.log(this.backTops);
  },
};
</script>
<style>
#detaile {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}

.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}

.center {
  height: calc(100% - 93px);
}
</style>