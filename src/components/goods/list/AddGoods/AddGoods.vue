<template>
  <div>
    <add-bread></add-bread>
    <add-card></add-card>
  </div>
</template>
<script>
  import AddBread from "./AddBread"
  import AddCard from "./AddCard"
  export default{
    name: 'AddGoods',
    components: {
      AddBread,
      AddCard
    }
  }
</script>
<style scoped>

</style>