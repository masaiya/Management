<template>
  <div>
    <Card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <!-- 订单列表数据 -->
      <el-table :data="orderList" border stripe>
        <el-table-column type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
            <el-tag type="danger" v-else>未付款</el-tag>
          </template>                               
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间">
          <template slot-scope="scope">
            {{scope.row.create_time | dateFormat}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="showBox"></el-button>
            <el-button type="success" icon="el-icon-location" size="mini" @click="showProgressBox"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区域 -->
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" 
                     :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15]"
                     :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
      <!-- 修改地址对话框 -->
      <el-dialog title="修改地址" :visible.sync="addressVisible" width="50%" @close="addressDialogClosed">  
        <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="100px">
          <el-form-item label="省市区/县" prop="address1">
            <el-cascader :options="cityData" v-model="addressForm.address1"></el-cascader>
          </el-form-item>
          <el-form-item label="详细地址" prop="address2">
            <el-input v-model="addressForm.address2"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="addressVisible = false">取 消</el-button>
          <el-button type="primary" @click="addressVisible = false">确 定</el-button>
        </span>
      </el-dialog>
      <!-- 展示物流进度的对话框 -->
      <el-dialog title="物流进度" :visible.sync="progressVisible" width="50%">
        <el-timeline>
          <el-timeline-item v-for="(activity, index) in progressInfo" :key="index" :timestamp="activity.time">
            {{activity.context}}
          </el-timeline-item>
        </el-timeline>
      </el-dialog>
    </Card>
  </div>
</template>
<script>
  import Card from "../comment/card/Card.vue"
  import cityData from "./citydata"
  export default{
    name: 'OrderCard',
    components: {
      Card
    },
    data () {
      return {
        queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 10
        },
        // 总数据条数
        total: 0,
        // 订单列表数据
        orderList: [],
        // 控制修改地址对话框的显示与隐藏
        addressVisible: false,
        addressForm: {
          address1: [],
          address2: ''
        },
        addressFormRules: {
          address1: [
            {required: true, message: '请选择省市区县', trigger: 'blur'}
          ],
          address2: [
            {required: true, message: '请填写详细地址', trigger: 'blur'}
          ]
        },
        cityData,
        // 控制物流进展对话框的显示与隐藏
        progressVisible: false,
        progressInfo: []
      }
    },
    created () {
      this.getOrderList();
    },
    methods: {
      // 获取订单列表
      async getOrderList() {
        const {data: res}= await this.$http.get('orders',{
          params: this.queryInfo
        })
        if(res.meta.status !== 200) 
          return this.$message.error('获取订单列表失败');
        this.total = res.data.total;
        this.orderList = res.data.goods;
      },
      // 每页显示数改变
      handleSizeChange(newSize) {
        this.queryInfo.pagesize = newSize;
        this.getOrderList();
      },
      // 页码值发生改变
      handleCurrentChange(newPage) {
        this.queryInfo.pagenum = newPage;
        this.getOrderList();
      },
      // 展示修改地址的对话框
      showBox() {
        this.addressVisible = true;
      },
      // 关闭修改地址对话框时触发
      addressDialogClosed() {
        this.$refs.addressFormRef.resetFields();
      },
      // 展示当前进程的对话框 
      async showProgressBox() {
        const {data: res} = await this.$http.get('/kuaidi/804909574412544580');
        if(res.meta.status !== 200) return this.$message.error('获取物流进度失败');
        this.progressInfo = res.data;
        console.log(this.progressInfo);
        this.progressVisible = true;
      }
    }
  }
</script>
<style scoped> 
  .el-cascader {
    width: 100%;
  }
</style>