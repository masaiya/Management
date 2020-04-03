<template>
  <div>
    <BreadCrumb>
      <BreadCrumbItem>商品管理</BreadCrumbItem>
      <BreadCrumbItem>参数列表</BreadCrumbItem>
    </BreadCrumb>
  </div>
</template>
<script>
  import BreadCrumb from "../../comment/breadCrumb/BreadCrumb";
  import BreadCrumbItem from "../../comment/breadCrumb/BreadCrumbItem"
  export default{
    name: 'ParamsBread',
    components: {
      BreadCrumb,
      BreadCrumbItem
    }
  }
</script>
<style>

</style>