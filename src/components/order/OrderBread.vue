<template>
  <div>
    <bread-crumb>
      <bread-crumb-item>订单管理</bread-crumb-item>
      <bread-crumb-item>订单列表</bread-crumb-item>
    </bread-crumb>
  </div>
</template>
<script>
  import BreadCrumb from "../comment/breadCrumb/BreadCrumb";
  import BreadCrumbItem from "../comment/breadCrumb/BreadCrumbItem";
  export default{
    name: 'OrderBread',
    components: {
      BreadCrumb,
      BreadCrumbItem
    }
  }
</script>
<style scoped>

</style>