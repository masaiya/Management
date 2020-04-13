<template>
  <div>
    <!-- 面包屑导航区域 -->
    <report-bread></report-bread>
    <!-- 卡片视图区域 -->
    <report-card></report-card>
  </div>
</template>
<script>
  import ReportCard from "./ReportCard";
  import ReportBread from "./ReportBread";
  export default {
    name: 'Report',
    components: {
      ReportCard,
      ReportBread
    }
  }
</script>