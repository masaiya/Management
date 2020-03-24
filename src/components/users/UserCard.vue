<template>
  <div class="card">
    <card>
      <!--搜索与添加区域-->
      <search-add :query-info="queryInfo" @search="search" @addDialog="addDialog"></search-add>
      <!--用户列表区域-->
      <users-table :user-list="userList" @change="search"></users-table>
      <!--分页-->
      <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="queryInfo.pagenum"
              :page-sizes="[1, 2, 5, 10]"
              :page-size="queryInfo.pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="total">
      </el-pagination>
    </card>
  </div>
</template>

<script>
  import Card from "../comment/card/Card";
  import SearchAdd from "./UserCard/SearchAdd";
  import UsersTable from "./UserCard/UsersTable";
  export default {
    name: "UserCard",
    components: {
      Card,
      SearchAdd,
      UsersTable
    },
    props: {
      userList: {
        type: Array,
        default() {
          return []
        }
      },
      queryInfo: {
        type: Object,
        default() {
          return {}
        }
      },
      total: {
        type: Number,
        default: 0
      }
    },
    methods: {
      // 监听 pagesize 改变事件
      handleSizeChange(newSize) {
        this.queryInfo.pagesize = newSize;
        this.$emit('change', 'change');
      },
      // 监听 页码值改变的事件
      handleCurrentChange(newPage) {
        this.queryInfo.pagenum = newPage;
        this.$emit('change', 'change');
      },
      search() {
        this.$emit('change', 'change');
      },
      addDialog() {
        this.$emit('addDialog', 'addDialog');
      }
    }
  }
</script>

<style scoped>

</style>