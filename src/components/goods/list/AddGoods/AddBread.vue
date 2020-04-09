<template>
  <div>
    <bread-crumb>
      <bread-crumb-item>商品管理</bread-crumb-item>
      <bread-crumb-item>添加商品</bread-crumb-item>
    </bread-crumb>
  </div>
</template>
<script>
  import BreadCrumb from "../../../comment/breadCrumb/BreadCrumb"
  import BreadCrumbItem from "../../../comment/breadCrumb/BreadCrumbItem"
  export default{
    name: 'AddBread',
    components: {
      BreadCrumb,
      BreadCrumbItem
    }
  }
</script>
<style scoped>

</style>