<template>
  <div>
    <bread-crumb>
      <bread-crumb-item>权限管理</bread-crumb-item>
      <bread-crumb-item>角色列表</bread-crumb-item>
    </bread-crumb>
  </div>
</template>

<script>
  import BreadCrumb from "../../comment/breadCrumb/BreadCrumb";
  import BreadCrumbItem from "../../comment/breadCrumb/BreadCrumbItem";
  export default {
    name: "RolesBread",
    components: {
      BreadCrumb,
      BreadCrumbItem
    }
  }
</script>

<style scoped>

</style>