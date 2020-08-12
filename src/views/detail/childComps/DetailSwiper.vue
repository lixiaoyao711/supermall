<template>
  <Swiper class="topimg-swaiper">
    <SwiperItem class="swaiper-item"
    v-for="(item,index) in TopImages" :key="index">
      <img :src="item" alt="" @load="imgLoad">
    </SwiperItem>
  </Swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper/index";

export default {
  name: "DetailSwiper",
  methods: {
    imgLoad() {
      this.$emit('imgLoad')
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  props: {
    TopImages: {
      type:Array,
      default() {
        return []
      }
    }
  }
}
</script>

<style>
  .topimg-swaiper {
   height: 300px;
   overflow: hidden;
 }
</style>