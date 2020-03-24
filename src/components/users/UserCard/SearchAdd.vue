<template>
 <div id="search-add">
   <el-row :gutter="20">
     <el-col :span="8">
       <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="btnClick">
         <el-button slot="append" icon="el-icon-search" @click="btnClick"></el-button>
       </el-input>
     </el-col>
     <el-col :span="4">
       <el-button type="primary" @click="addDialog">添加用户</el-button>
     </el-col>
   </el-row>
 </div>
</template>

<script>
  export default {
    name: "SearchAdd",
    props: {
      queryInfo: {
        type: Object,
        default() {
          return []
        }
      }
    },
    methods: {
      btnClick() {
        this.$emit('search', 'search');
      },
      addDialog() {
        this.$emit('addDialog', 'addDialog');
      }
    }
  }
</script>

<style scoped>

</style>