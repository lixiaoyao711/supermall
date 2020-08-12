<template>
  <NavBar>
    <div slot="left" class="detailImg" @click="imgClick">
      <img src="~assets/img/common/back.svg" alt="">
    </div>
    <div class="detail" slot="center">
      <div
        class="detail-item"
        :class="{active:currdIndex === index}"
        @click="itemClick(index)"
        v-for="(item,index) in detailItem"
        :key="index">
        {{item}}
      </div>
    </div>
  </NavBar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNav",
  methods: {
    itemClick(index) {
      this.currdIndex = index;
      this.$emit("taitleClick",index)
    },
    imgClick() {
      this.$router.back()
    }
  },
  components: {
    NavBar,
  },
  data() {
    return {
      detailItem: ["商品", "参数", "评论", "推荐"],
      currdIndex: 0
    };
  },
};
</script>

<style>
.detail {
  display: flex;
  font-size: 13px;
}

.detail-item {
  flex: 1;
}

.active {
  color:  var(--color-high-text);
}

.detailImg {
  margin-top: 7px;
}
</style>