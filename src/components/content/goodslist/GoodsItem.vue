<template>
  <div class="goods-item" @click="itemClick">
      <img :src="showImage" alt="" @load="imgLoad">
      <div class="goods-info">
        <p>{{goodslistItem.title}}</p>
        <span class="price">{{goodslistItem.price}}</span>
        <span class="collect">{{goodslistItem.cfav}}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: "GoodsItem",
  data() {
    return {
    }
  },
  methods: {
    imgLoad() {
      this.$bus.$emit('itemImgLoad')
    },
    itemClick() {
      this.$router.push('/detail/'+ this.goodslistItem.iid)
    }
  },
  props: {
    goodslistItem: {
      type: Object,
      default() {
        return {
        }
      }
    }
  },
  computed: {
    showImage() {
      return this.goodslistItem.image|| this.goodslistItem.show.img  
    }
  }
}
</script>

<style>
  .goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>