<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="bread">
     <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
     <slot></slot>
  </el-breadcrumb>
</template>

<script>
  export default {
    name: "BreadCrumb"
  }
</script>

<style scoped>
  .bread {
    margin-bottom: 15px;
    font-size: 12px;
  }
</style>