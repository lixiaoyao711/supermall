<template>
  <div class="recommd">
    <div v-for="(item,index) in recommends" :key="index" class="recommdItem">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommd",
  props: {
    recommends :{
      type: Array,
      default() {
        return []
      }
    } 
  }
}
</script>

<style>
  .recommd  {
    display: flex;
    text-align: center;
    font-size: 12px;
    padding: 10px 0 20px;
    border-bottom:10px solid #eee;
  }

  .recommdItem {
    flex: 1;
  }

  .recommdItem img {
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
  }
</style>