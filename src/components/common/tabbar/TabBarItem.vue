<template>
      <div class="tab-bar-item" @click="itemClick">
        <div v-if="!isActive"><slot name="item-icon"></slot></div>
        <div v-else><slot name="item-icon-active"></slot></div>
        <div :style="activeStyle"><slot name="item-text"></slot></div>
      </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  computed: {
    isActive() {
      //通过计算属性来动态决定isActive的返回值,this.$route.path表示当前选择的item的pash,this.pash是app.vue里边传过来的pash,如果两个相等就可以知道当前点击的哪个.
      //indexOf判断如果是false返回-1
      // /home -> item1(/home) =true
      // /home -> item1(/category) =true
      // /home -> item1(/cart) =true
      // /home -> item1(/profile) =true
      return this.$route.path.indexOf(this.path) != -1
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  data() {
    return {
      // isActive: true
    }
  },
  methods: {
    itemClick() {
      this.$router.push(this.path); 
    }
  }
}
</script> 

<style>

  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }

  .tab-bar-item img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }

  .active {
    color: red;
  }
</style>