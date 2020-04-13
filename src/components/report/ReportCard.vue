<template>
  <div>
    <Card>
      <!-- 2.el-cascader-menu__hover-zone(宽高)的Dom -->
      <div id="main" style="width: 600px; height: 400px"></div>
    </Card>
  </div>
</template>
<script>
  import Card from "../comment/card/Card";
  // 1.导入echarts
  import echarts from "echarts";
  export default {
    name: 'ReportCard',
    components: {
      Card
    },
    // 此时，页面上的元素已经被渲染完毕了
    async mounted () {
      // 3.基于准备好的dom，初始化echarts实例
      var myChart = echarts.init(document.getElementById('main'));
      const {data: res} = await this.$http.get('reports/type/1');
      if(res.meta.status !== 200) 
        return this.$message.error('获取折线图数据失败');
      // 4.准备数据和配置项
      const option = Object.assign(res.data,this.chartOption);
      // 5.展示数据
      myChart.setOption(option); 
    },
    data() {
      return {
        // 需要合并的数据
        chartOption: {
          title: {
            text: '用户来源',
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross',
              label: {
                backgroundColor: '#6a7985'
              }
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
        }
      }
  }
}
</script>
<style scoped> 

</style>
