<template>
  <div class="tab-control">
    <div
      v-for="(item,index) in titles" :key="index"
      class="control-item"
      :class="{active:index === cruuerIndex}" @click="itemClick(index)">
      <span class="item-span">{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabControl",
  props: {
    titles: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      cruuerIndex: 0,
    }
  },
  methods: {
    itemClick(index) {
      this.cruuerIndex = index;
      this.$emit("tabClick",index);
    }
  }
};
</script>

<style>
.tab-control {
  display: flex;
  font-size: 14px;
  text-align: center;
  background-color: #ffffff;
  height: 40px;
  line-height: 40px;
}

.control-item {
  flex: 1;
}

.control-item span {
  padding: 5px;
}

.active {
  color: var(--color-high-text);

 }

 .active span {
  border-bottom:3px var(--color-tint) solid 
 }
</style>