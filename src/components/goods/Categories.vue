<template>
  <div>
    <!--面包屑导航区域-->
    <cate-bread></cate-bread>
    <!--卡片视图区域-->
    <cate-card></cate-card>
  </div>
</template>
<script>
  import CateBread from "./Categories/CateBread";
  import CateCard from "./Categories/CateCard";
  export default {
    name: "Categories",
    components: {
      CateBread,
      CateCard
    }
  }
</script>

<style scoped>

</style>