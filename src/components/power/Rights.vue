<template>
  <div>
    <!--面包屑导航区域-->
    <power-bread></power-bread>
    <!--卡片视图-->
    <power-card></power-card>
  </div>
</template>

<script>
  import PowerBread from "./PowerBread";
  import PowerCard from "./PowerCard";
  export default {
    name: "Rights",
    components: {
      PowerBread,
      PowerCard
    }
  }
</script>

<style lang="less" scoped>

</style>