<template>
  <div>
    <!-- 面包屑导航区域 -->
    <order-bread></order-bread>
    <!-- 卡片视图区域 -->
    <order-card></order-card>
  </div>
</template>
<script>
  import OrderBread from "./OrderBread";
  import OrderCard from "./OrderCard";
  export default{
    name: 'Order',
    components: {
      OrderBread,
      OrderCard
    }
  }
</script>
<style scoped>

</style>