<template>
  <div>
    <card>
      <el-table :data="rightsList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="权限名称" prop="authName"></el-table-column>
        <el-table-column label="路径" prop="path"></el-table-column>
        <el-table-column label="权限等级" prop="level">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">一级</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'">二级</el-tag>
            <el-tag type="warning" v-else-if="scope.row.level === '2'">三级</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </card>
  </div>
</template>

<script>
  import Card from "../comment/card/Card";
  export default {
    name: "PowerCard",
    components: {
      Card
    },
    data() {
      return {
        // 权限列表
        rightsList: []
      }
    },
    created() {
      // 获取所有的权限参数
      this.getRightsList();
    },
    methods: {
      // 获取所有的权限列表
      async getRightsList() {
        const {data: res} = await this.$http.get('/rights/list');
        if (res.meta.status !== 200)
          return this.$message.error('获取权限列表失败');
        this.rightsList = res.data;
        console.log(this.rightsList);
      }
    }
  }
</script>

<style scoped>
</style>