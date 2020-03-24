<template>
  <div>
    <!--面包屑导航区-->
    <user-bread></user-bread>
    <!--卡片视图区域-->
    <user-card :user-list="userList" :query-info="queryInfo" :total="total" @change="change" @addDialog="addDialog"></user-card>
    <!--文字提示框-->
    <div id="dialog">
      <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="30%" @close="addDialogClosed">
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="addForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机" prop="mobile">
            <el-input v-model="addForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addDialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import UserCard from "./UserCard"
  import UserBread from "./UserBread";

  export default {
    name: "Users",
    components: {
      UserBread,
      UserCard
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
        // 获取用户列表的参数对象
        queryInfo : {
          query: '',
          pagenum: 1,
          pagesize: 2
        },
        // 所有管理者
        userList: [],
        total: 0,
        addDialogVisible: false,
        // 添加用户的表单数据
        addForm: {
          username: '',
          password: '',
          email: '',
          mobile: ''
        },
        // 添加表单的验证规则对象
        addFormRules: {
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur'},
            { min: 3, max: 10, message: '用户名的长度在3~10个字符之间', trigger: 'blur'}
          ],
          password: [
            { required: true, message: '请输入密码', trigger: true},
            { min: 6, max: 15, message: '密码的长度在6~15个字符之间', trigger: 'blur'}
          ],
          email: [
            { required: true, message: '请输入邮箱', trigger: 'blur'},
            { validator: checkEmail, trigger: 'blur'}
          ],
          mobile: [
            { required: true, message: '请输入手机号', trigger: 'blur'},
            { validator: checkMobile, trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this.getUserList();
    },
    methods: {
      async getUserList() {
        const {data: res} = await this.$http.get('users', { params: this.queryInfo});
        if (res.meta.status != 200) return this.$message.error('获取用户列表失败');
        this.userList = res.data.users;
        this.total = res.data.total;
      },
      change() {
        this.getUserList();
      },
      addDialog() {
        this.addDialogVisible = true;
      },
      // 监听添加用户对话框的关闭事件
      addDialogClosed() {
        this.$refs.addFormRef.resetFields();
      },
      // 点击按钮添加新用户
      addUser() {
        this.$refs.addFormRef.validate(async valid => {
          if (!valid) return;
          // 可以发起添加用户的网络请求
          const {data: res} = await this.$http.post('users', this.addForm);
          if (res.meta.status !== 201) {
            this.$message.error('添加用户失败');
          }
          this.$message.success('添加用户成功');
          // 隐藏添加用户的对话框
          this.addDialogVisible = false;
          // 重新获取用户列表
          this.getUserList();
        })
      }
    }
  }
</script>

<style lang="less" scoped>

</style>