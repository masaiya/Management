<template>
  <div>
    <!--面包屑导航区域-->
    <roles-bread></roles-bread>
    <!--卡片视图区域-->
    <roles-card></roles-card>
  </div>
</template>

<script>
  import RolesBread from "./RolesBread";
  import RolesCard from "./RolesCard";
  export default {
    name: "Roles",
    components: {
      RolesBread,
      RolesCard
    }
  }
</script>

<style scoped>

</style>