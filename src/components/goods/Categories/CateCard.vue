<template>
  <div>
    <card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="showAddCateDialog">添加分类</el-button>
        </el-col>
      </el-row>
      <!--表格区域-->
      <tree-table class="form" :data="cateList" :columns="columns" :selection-type="false" :expand-type="false"
                  show-index index-text="#" border >
        <template slot="isOk" slot-scope="scope">
          <i class="el-icon-success" v-if="scope.row.cat_deleted === false" style="color: lightgreen"></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>
        <template slot="order" slot-scope=scope>
          <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" size="mini" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="warning" size="mini" v-else-if="scope.row.cat_lavel === 2">三级</el-tag>
        </template>
        <template slot="option" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="editCate(scope.row.cat_id)">编辑</el-button>
          <el-button icon="el-icon-delete" type="danger" size="mini" @click="removeCate(scope.row.cat_id)">删除</el-button>
        </template>
      </tree-table>
      <!--分页区域-->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" 
                     :page-sizes="[3, 5, 10, 15]" :page-size="queryInfo.pagesuze" layout="total, sizes, prev, pager, next, jumper" 
                     :total="total">
    </el-pagination>
    </card>
    <!-- 添加分类的对话框 -->
    <el-dialog title="添加分类" :visible.sync="addCateDialogVisible" width="50%" 
               @close="addCateDialogClosed">
      <el-form :model="addCateForm" :rules="addCateFormRules" ref="addCateFormRef" label-width="100px">
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类：">
          <el-cascader v-model="selectedKeys" expandTrigger="hover" :options="parentCateList" 
                       :props="cascanderProps" @change="parentCateChange" clearable change-on-select></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑分类的对话框 -->
    <el-dialog title="修改分类" :visible.sync="editCateDialogVisile" width="50%" @close="editCateDialogClosed">
      <el-form :model="editCateForm" :rules="editCateFormRules" ref="editCateFormRef" label-width="100px">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editCateForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editCateDialogVisile = false">取 消</el-button>
        <el-button type="primary" @click="editCateDialog()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import Card from "../../comment/card/Card";
  export default {
    name: "CateCard",
    data() {
      return {
        // 商品分类的数据列表，默认为空
        cateList: [],
        // 查询条件
        queryInfo: {
          type: 3,
          pagenum: 1,
          pagesize: 5
        },
        // 总数据条数
        total: 0,
        // 为table指定列的定义
        columns: [
          {label: '分类名称', prop: 'cat_name'},
          {label: '是否有效', type: 'template', template: 'isOk'},
          {label: '排序', type: 'template', template: 'order'},
          {label: '操作', type: 'template', template: 'option'}
        ],
        // 控制添加分类对话框的显示与隐藏
        addCateDialogVisible: false,
        // 添加分类的表单数据对象
        addCateForm: {
          cat_name: '',
          cat_level: 0,
          cat_pid: 0
        },
        // 添加分类表单的验证规则对象
        addCateFormRules: {
          cat_name: [
            {required: true, message: '请输入分类名称', trigger: 'blur'}
          ]
        },
        // 父级分类数据
        parentCateList: [],
        // 指定级联选择器的配置对象
        cascanderProps: {
          value: 'cat_id',
          label: 'cat_name',
          children: 'children'
        },
        // 选中的父级分类的Id数组
        selectedKeys: [],
        // 控制编辑分类对话框的显示与隐藏
        editCateDialogVisile: false,
        // 编辑分类的表单数据
        editCateForm: {
          cat_name: ''
        },
        // 编辑分类表单的验证规则对象
        editCateFormRules: {
          cat_name: [
            {required: true, message: '请输入分类名称', trigger: 'blur'}
          ]
        },
        // 当前的id值
        editId: 0
      }
    },
    components: {
      Card
    },
    created() {
      this.getCateList();
    },
    methods: {
      // 获取商品分类数据
      async getCateList() {
        const {data: res} = await this.$http.get('categories', {params: this.queryInfo});
        if (res.meta.status !== 200) {
          return this.$message('获取商品分类失败');
        }
        // 把数据列表赋值给cateList
        this.cateList = res.data.result;
        // 为总数据条数赋值
        this.total = res.data.total;
        console.log(res.data);
      },
      // 监听pagesize改变
      handleSizeChange(newSize) {
        this.queryInfo.pagesize = newSize;
        this.getCateList();
      },
      // 监听pagenum改变
      handleCurrentChange(newPage) {
        this.queryInfo.pagenum = newPage;
        this.getCateList();
      },
      // 点击按钮展示添加分类的对话框
      showAddCateDialog() {
        // 先获取父级分类的数据列表
        this.getParentCateList();
        this.addCateDialogVisible = true;
      },
      // 获取父级分类的数据列表
      async getParentCateList() {
        const {data: res} = await this.$http.get('categories', {
          params: { type: 2}
        })
        if (res.meta.status != 200) {
          return this.$message.error('获取父级分类数据失败');
        }
        this.parentCateList = res.data;
      },
      // 选择项发生变化触发
      parentCateChange() {
        // 如果selectedKeys数组中的length大于0，证明选中了父级分类
        if (this.selectedKeys.length > 0) {
          this.addCateForm.cat_pid = this.selectedKeys[this.selectedKeys.length - 1];
          this.addCateForm.cat_level = this.selectedKeys.length;
          return ;
        }else {
          this.addCateForm.cat_pid = 0;
          this.addCateForm.cat_level = 0;
        }
      },
      // 点击按钮添加新的分类
      addCate() {
        this.$refs.addCateFormRef.validate(async valid => {
          if(!valid) return;
          const {data: res} = await this.$http.post('categories', this.addCateForm);
          if(res.meta.status !== 201)
            return this.$message.error('添加分类失败');
          this.$message.success('添加分类成功'); 
          this.getCateList();
          this.addCateDialogVisible = false; 
        })
      },
      // 监听对话框的关闭事件，重置表单数据 
      addCateDialogClosed() {
        this.$refs.addCateFormRef.resetFields();
        this.selectedKeys = [];
        this.addCateForm.cat_level = 0;
        this.addCateForm.cat_pid = 0;
      },
      // 点击删除的操作
      async removeCate(id) {
        const {data: res} = await this.$http.delete('categories/' + id);
        if(res.meta.status !== 200) 
          return this.$message.error('删除商品分类失败');
        this.getCateList();
        this.$message.success('删除商品分类成功');  
      },
      // 点击编辑的操作
      editCate(id) {
        this.editCateDialogVisile = true;
        this.editId = id;
      },
      // 编辑操作点击确定
      editCateDialog() {
        this.$refs.editCateFormRef.validate(async valid => {
          if (!valid) return;
          console.log(this.editCateForm.cat_name);
          const {data: res} = await this.$http.put('categories/' + this.editId, {cat_name: this.editCateForm.cat_name});
          console.log(res);
          if (res.meta.status !== 200) {
            return this.$message.error('编辑分类名称失败');
          }
          this.$message.success('编辑分类名称成功');
          this.getCateList();
          this.editCateDialogVisile = false;
        })
      },
      // 关闭编辑对话框后清空数据
      editCateDialogClosed() {
        this.editCateForm.cat_name = '';
        this.editId = 0;
      }
    }
  }
</script>

<style scoped>
  .form {
    margin-top: 15px;
  }
  .el-cascader {
    width: 100%;
  }
</style>