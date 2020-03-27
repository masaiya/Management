<template>
  <div>
    <bread-crumb>
      <bread-crumb-item>权限管理</bread-crumb-item>
      <bread-crumb-item>权限列表</bread-crumb-item>
    </bread-crumb>
  </div>
</template>

<script>
  import BreadCrumb from "../comment/breadCrumb/BreadCrumb";
  import BreadCrumbItem from "../comment/breadCrumb/BreadCrumbItem";
  export default {
    name: "PowerBread",
    components: {
      BreadCrumb,
      BreadCrumbItem
    }
  }
</script>

<style scoped>

</style>