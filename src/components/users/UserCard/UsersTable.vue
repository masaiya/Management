<template>
  <div id="users-table">
    <el-table :data="userList" border stripe>
      <el-table-column type="index" label="#"></el-table-column>
      <el-table-column prop="username" label="姓名"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="role_name" label="角色"></el-table-column>
      <el-table-column prop="mg_state" label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.mg_state" @change="userStateChange(scope.row)"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="" label="操作" width="180">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
          <el-tooltip effect="dark" content="分配角色" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
          </el-tooltip></template>

       </el-table-column>
    </el-table>
    <!--修改用户的对话框-->
    <el-dialog title="修改用户" :visible.sync="editDialogVisible" width="50%">
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="80px">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "UsersTable",
    props: {
      userList: {
        type: Array,
        default() {
          return []
        }
      },
    },
    data() {
      // 自定义邮箱验证规则
      var checkEmail = (rule, value, callback) => {
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
        if (regEmail.test(value)) {
          return callback();
        }
        callback(new Error('请输入合法的邮箱'))
      };
      var checkMobile = (rule, value, callback) => {
        const regMobile = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (regMobile.test(value)) {
          return callback();
        }
        callback(new Error('请输入合法的手机号码'));
      };
      return {
        // 控制修改用户对话框的显示与隐藏
        editDialogVisible: false,
        // 查询到的用户信息对象
        editForm: {},
        // 修改表单的验证规则对象
        editFormRules: {
          email: [
            { required: true, message: '请输入用户邮箱', trigger: 'blur'},
            { validator: checkEmail, trigger: 'blur'}
          ],
          mobile: [
            { required: true, message: '请输入用户手机号码', trigger: 'blur'},
            { validator: checkMobile, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      // 监听switch开关状态的改变
      async userStateChange(userInfo) {
        console.log(userInfo);
        const {data: res} = await this.$http.put(`users/${userInfo.id}/state/${userInfo.mg_state}`);
        if (res.meta.status !== 200) {
          userInfo.mg_state = !userInfo.mg_state;
          return this.$message.error('更新用户状态失败!');
        this.$message.success('更新用户状态成功!');
      }
      },
      // 展示编辑用户的对话框
      async showEditDialog(id) {
        const {data: res} = await this.$http.get('users/'+id);
        if (res.meta.status !== 200) {
          return this.$message.error('查询用户信息失败');
        }
        this.editForm = res.data;
        this.editDialogVisible = true;
      },
      // 修改用户信息并提交
      editUserInfo() {
        this.$refs.editFormRef.validate(async validate => {
          if (!validate) return;
          // 发起修改用户信息的数据请求
          const {data: res} = await this.$http.put('users/'+ this.editForm.id, {
            email: this.editForm.email,
            mobile: this.editForm.mobile});
          if (res.meta.status !== 200) {
            return this.$message.error('更新用户信息失败');
          }
          // 关闭对话框
          this.editDialogVisible = false;
          // 刷新数据列表
          this.$emit('change', 'change');
          // 提示修改成功
          return this.$message.success('更新用户信息成功');
        })
      },
      // 根据ID删除对应的用户信息
      async removeUserById(id) {
        // 弹询问用户是否删除数据
        const confirmResult = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err);
        // 如果用户确认删除，则返回值为字符串，confirm；如果用户取消了删除，则返回值为字符串cancel
        if (confirmResult !== 'confirm') return this.$message.error('已取消删除');
        const {data: res} = await this.$http.delete('users/' + id);
        if (res.meta.status !== 200)
          return this.$message.error('删除用户失败');
        this.$message.success('删除用户成功')
        // 刷新数据列表
        this.$emit('change', 'change');
      }
    }
  }
</script>

<style scoped>

</style>