<template>
  <div>
    <!-- 面包屑导航区域 -->
    <list-bread></list-bread>
    <!-- 卡片视图区域 -->
    <list-card></list-card>
  </div>
</template>
<script>
  import ListBread from "./ListBread";
  import ListCard from "./ListCard"
  export default {
    name: 'List',
    data() {
      return {
      }
    },
    components: {
      ListBread,
      ListCard
    }
  }
</script>
<style scoped>

</style>