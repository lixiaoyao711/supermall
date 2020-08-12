<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BSroll from "better-scroll"
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default() {
        return 0
      }
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      scroll: null
    }
  },
  methods: {
    scrollTo(x, y, time=300) {
      this.scroll.scrollTo(x, y, time)
    },
    scrollOn() {
      this.scroll.on('scroll',(pos) => {
        console.log(pos);
      })
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    getScorllY() {
      return this.scroll ? this.scroll.y :0
    }
  },
  mounted() {
    this.scroll = new BSroll ((this.$refs.wrapper), {
      click:true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad
    })
    //监听滚动事件
    if (this.probeType == 2 || this.probeType == 3) {
      this.scroll.on('scroll',(pos) => {
      this.$emit('scroll',pos)
    })     
    }

    //监听上拉事件
    if(this.pullUpLoad)
    {
      this.scroll.on('pullingUp',() => {
      this.$emit('pullingUp')
    })
    }
  }
}
</script>

<style>

</style>