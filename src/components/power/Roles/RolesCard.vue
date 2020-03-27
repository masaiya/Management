<template>
  <div>
    <card>
      <!--添加角色按钮区域-->
      <el-row>
        <el-col>
          <el-button type="primary">添加角色</el-button>
        </el-col>
      </el-row>
      <!--角色列表区域-->
      <el-table :data="rolelist" border stripe>
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row v-for="(item1, i1) in scope.row.children" :key="item1.id"
                    :class="['display','bdbottom', i1 === 0? 'bdtop': '']">
              <el-col :span="5">
                <el-tag>{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row v-for="(item2, i2) in item1.children" :key="item2.id"
                        :class="['display',i2 === 0|item2.length? '': 'bdtop']">
                  <el-col :span="6">
                    <el-tag type="success" closable @close="removeRightById(scope.row, item2.id)">{{item2.authName}}</el-tag>
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag v-for="(item3, i3) in item2.children" :key="item3.id" type="warning"
                            closable @close="removeRightById(scope.row, item3.id)">
                      {{item3.authName}}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
            <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </card>
    <!--分配权限的对话框-->
    <el-dialog title="分配权限" :visible.sync="setRightDialogVisible" width="50%" @close="setRightDialogClosed">
      <el-tree :data="rightsList" :props="treeProps" show-checkbox node-key="id"
               default-expand-all :default-checked-keys="defKeys" ref="treeRef"></el-tree>
      <span slot="footer" class="dialog-footer">
    <el-button @click="setRightDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="allotRights">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
  import Card from "../../comment/card/Card";
  export default {
    name: "RolesCard",
    components: {
      Card
    },
    data() {
      return {
        // 所有角色列表数据
        rolelist: [],
        // 控制分配权限对话框的显示与隐藏
        setRightDialogVisible: false,
        // 所有权限的数据
        rightsList: [],
        // 树形空间的属性绑定对象
        treeProps: {
          label: 'authName',
          children: 'children'
        },
        // 默认选中的结点id值数组
        defKeys: [],
        // 当前即将分配权限的角色id
        roleId: ''
      }
    },
    created() {
      this.getRolesList();
    },
    methods: {
      // 获取所有角色的列表
      async getRolesList() {
        const {data: res} = await this.$http.get('roles');
        if (res.meta.status !== 200) {
          return this.$message.error('获取角色列表失败');
        }
        this.rolelist = res.data;
      },
      // 根据Id删除对应的权限
      async removeRightById(role, right) {
        // 弹框提示用户是否删除
        const confirmResult = await this.$confirm('此操作将永久删除该权限，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err);
        if(confirmResult !== 'confirm')
          return this.$message.info('取消了删除');
        const {data: res} = await this.$http.delete(`roles/${role.id}/rights/${right}`);
        if (res.meta.statue !== 200) {
          return this.$message.error('删除权限失败');
        }
        role = res.data;
      },
      // 展示分配权限的对话框
      async showSetRightDialog(right) {
        this.roleId = right.id;
        // 获取所有权限的数据
        const {data: res} = await this.$http.get('rights/tree');
        if (res.meta.status !== 200) {
          return this.$message.error('获取权限数据失败');
        }
        // 获取到的权限数据保存到data中
        this.rightsList = res.data;
        // 递归获取三级节点的id
        this.getLeafKeys(right, this.defKeys);
        this.setRightDialogVisible = true;
      },
      // 通过递归的形式获取角色下所有三级权限的id，并保存到数组中
      getLeafKeys(node, arr) {
        // 如果当前node节点不包含children属性，则是三级节点
        if (!node.children) {
          return arr.push(node.id);
        }
        node.children.forEach(item => {
          this.getLeafKeys(item, arr);
        })
      },
      // 监听分配权限对话框的关闭事件
      setRightDialogClosed() {
        this.defKeys = [];
      },
      // 点击为角色分配权限
      async allotRights() {
        const keys = [
          ...this.$refs.treeRef.getCheckedKeys(),
          ...this.$refs.treeRef.getHalfCheckedKeys()
        ];
        const idStr = keys.join(',');
        const {data: res} = await this.$http.post(`roles/${this.roleId}/rights`, { rids: idStr});
        if(res.meta.status !== 200) {
          return this.$message.error('分配权限失败');
        }
        this.$message.success('分配权限成功');
        this.getRolesList();
        this.setRightDialogVisible = false;
      }
    }
  }
</script>

<style scoped>
  .el-tag {
    margin: 7px;
  }
  .bdtop {
    border-top: 1px solid #eee;
  }
  .bdbottom {
    border-bottom: 1px solid #eee;
  }
  .display {
    display: flex;
    align-items: center;
  }
</style>