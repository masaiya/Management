<template>
  <div id="card">
    <el-card class="box-card">
      <slot></slot>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "Card"
  }
</script>

<style scoped>
  #card {
    box-shadow: 0 1px 1px rgba(0, 0, 0, 0.15);
  }
</style>