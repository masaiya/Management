<template>
  <div>
    <bread-crumb>
      <bread-crumb-item>数据统计</bread-crumb-item>
      <bread-crumb-item>数据报表</bread-crumb-item>
    </bread-crumb>
  </div>
</template>
<script>
  import BreadCrumb from "../comment/breadCrumb/BreadCrumb";
  import BreadCrumbItem from "../comment/breadCrumb/BreadCrumbItem"
  export default {
    name: 'ReportBread',
    components: {
      BreadCrumb,
      BreadCrumbItem
    }
  }
</script>