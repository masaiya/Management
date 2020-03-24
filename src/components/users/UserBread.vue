<template>
  <div id="bread">
    <bread-crumb>
      <bread-crumb-item>用户管理</bread-crumb-item>
      <bread-crumb-item>用户列表</bread-crumb-item>
    </bread-crumb>
  </div>
</template>

<script>
  import BreadCrumb from "../comment/breadCrumb/BreadCrumb";
  import BreadCrumbItem from "../comment/breadCrumb/BreadCrumbItem";

  export default {
    name: "UserBread",
    components: {
      BreadCrumb,
      BreadCrumbItem
    }
  }
</script>

<style scoped>
  #bread {
    margin-bottom: 15px;
    font-size: 12px;
  }
</style>