import { debounce } from "./utils"
export const itemListener = {
  data() {
    return {
      imglisern: null
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh,200)
    this.imglisern = () => {
      refresh()
    }
    //监听全局事件
    this.$bus.$on("itemImgLoad", this.imglisern);
    // console.log('aaas');
  }
}


import BackTop from "components/content/backTop/BackTop";
export const backTop = {
  
  data() {
    return {
      isShow: false,
      isTop: false,
      offSetTop: 0,
    }
  },
  components: {
    BackTop,
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    // centerClick(pos) {
    //   this.isShow = -pos.y > 1000;
    //   this.isTop = -pos.y > this.offSetTop
    //   // console.log(pos);
    // }
  }
}