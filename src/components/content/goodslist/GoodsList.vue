<template>
  <div class="goods">
    <GoodsItem v-for="(item,index) in goods" :key="index" :goodslistItem="item"></GoodsItem>
  </div>
</template>

<script>
import GoodsItem from "./GoodsItem"

export default {
  name: "GoodsList",
  components: {
    GoodsItem
  },
  props :{ 
    goods: {
      type: Array,
      deafault() {
        return []
    }
  }
}
}
</script>

<style>
 .goods{
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   padding: 2px;
 }
</style>