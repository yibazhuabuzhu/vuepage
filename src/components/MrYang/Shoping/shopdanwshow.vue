<template>
  <div>
    <div>
      <table style="marginleft: 1%; margintop: 20%">
        <tr>
          <td>
           <Shopdanwadd></Shopdanwadd>
          </td>
          <td>
            <el-row>
              <el-button style="marginleft: 1%; margintop: 20%"
                >批量操作</el-button
              >
            </el-row>
          </td>
        </tr>
      </table>
      <table style="marginLeft:400px;margintop:%">
        <tr>
          <td>创建时间</td>
          <td>
            <el-date-picker
              v-model="value1"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
          </td>
          <td>
            <el-input
              style="marginleft: 10px"
              placeholder="请输入关键字搜索"
              prefix-icon="el-icon-search"
              v-model="dname"
            >
            </el-input>
          </td>
          <td>
            <el-button style="marginleft: 15px" @click="resetForm('ruleForm')"
              >重置</el-button
            >
          </td>
        </tr>
      </table>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column
        v-if="fales"
        prop="unitId"
        label="单位库编号"
        width="150"
      >
      </el-table-column>
      <el-table-column prop="unitDate" label="创建时间" width="200">
      </el-table-column>
      <el-table-column prop="unitName" label="单位名称" width="180">
      </el-table-column>
      <el-table-column prop="unitDecimals" label="允许小数" width="600">
           <template scope="scope">
                <span v-if="scope.row.unitDecimals==0" >不允许</span>
                <span v-if="scope.row.unitDecimals==1">允许</span>
            </template>
    </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <Shopdanwmodify v-bind:id="scope.row.unitId"></Shopdanwmodify>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import Shopdanwadd from "@/components/MrYang/Shoping/Shopdanwadd";
import Shopdanwmodify from "@/components/MrYang/Shoping/Shopdanwmodify";
// 节流函数
const delay = (function() {
  let timer = 0;
  return function(callback, ms) {
    clearTimeout(timer);
    timer = setTimeout(callback,ms);
  };
})();
export default {
  data() {
    return {
      opn: [],
      isCollapse: true,
      tableData: [],
      value1: "",
      dname:''
    };
  },
  watch:{
     dname(){
      delay(()=>{
        this.fetchData();
      },300);
    },
    value1(){
      delay(()=>{
        this.fetchData();
      },300);
    },
    },
  methods: {
    del(id) {
      this.$confirm("确认删除此数据吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$http.post(this.$api+"/api/LableCDelt?id=" + id);
        aler("删除成功");
        location.reload().catch((res) => {
          console.log("err");
        });
      });
    },
    upt(id) {
      this.$router.push("/zclientmodify?id=" + id);
    },
    fetchData(val) {
        this.axios.get(this.$api+'/api/UnitShow',{
        params: {
        dname:this.dname,
        stratime:this.value1[0],
        endtime:this.value1[1],
      },
      })
        .then(response => {
        this.tableData = response.data
        
      })       
      }
  },
  resetForm(formName) {
    this.$refs[formName].resetFields();
  },
  created() {
    //显示
    this.axios
      .get(this.$api+"/api/UnitShow")
      .then((response) => {
        this.tableData = response.data;
        console.log("ok");
      })
      .catch(function (error) {
        console.log(error);
      });
  },
  components: {
    'Shopdanwadd': Shopdanwadd,
    'Shopdanwmodify':Shopdanwmodify
  },
};
</script>