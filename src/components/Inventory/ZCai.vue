<template>
<div>
      <div style="float: right">单据编号:{{ datetime }}</div>
    <div>
     
        <el-form :inline="true" :model="ruleForm" :rules="rules"  ref="ruleForm" label-width="100px" class="demo-form-inline">
          <el-form-item label="出货仓库">
                <el-input disabled='disabled' v-model="ruleForm.SsWarehouse"  placeholder="出货仓库" style="width: 140px"></el-input>
          </el-form-item>
          <el-form-item label="客户">
                <el-input v-model="ruleForm.SsClient" disabled='disabled' placeholder="客户名称/编码" style="width: 140px"></el-input>
          </el-form-item>
          <el-form-item label="经手人">
                <el-input v-model="ruleForm.SsHandle" disabled='disabled'  placeholder="姓名/手机号" style="width: 140px"></el-input>
          </el-form-item>
          <el-form-item>
                <div>
                  <el-table :data="tableData"  border style="width: 100%" @cell-click="tabClick" prop="re">
                        <el-table-column fixed prop="cargoId" label="序号" width="150"></el-table-column>
                        <el-table-column prop="cargoCoding" label="商品编号" width="120"></el-table-column>
                        <el-table-column prop="cargoName" label="商品名称" width="120"> </el-table-column>
                        <el-table-column prop="sscNumber" label="数量" width="120"> </el-table-column>
                        <el-table-column prop="unitPice" label="销售单价(元)" width="120"> </el-table-column>
                        <el-table-column prop="sscSubtotal" label="小计(元)" width="120"> 
                           <template slot-scope="scope">
                             <span>
                               {{scope.row.sscNumber*scope.row.unitPice}}
                             </span>
                           </template>
                        </el-table-column>
                        <el-table-column prop="sscRemark" label="备注" width="120"> </el-table-column>
                  </el-table>
                </div>
          </el-form-item>
          <br>
          <el-form-item label="折扣率">
                <el-input v-model="ruleForm.SsDiscount"  placeholder="折扣率" style="width: 140px"></el-input>
          </el-form-item>
          <el-form-item label="折扣金额(元)">
                <el-input v-model="ruleForm.SsZkMoney"  placeholder="折扣金额" style="width: 140px"></el-input>
          </el-form-item>
          <el-form-item label="附加金额(元)">
                <el-input v-model="ruleForm.SsFjMoney"  style="width: 140px" placeholder="附加金额"> </el-input>
          </el-form-item>
          <el-form-item label="结算方式">
                <el-select v-model="ruleForm.SsMode" placeholder="请选择">
                      <el-option label="现金" value="现金"></el-option>
                      <el-option label="支付宝" value="支付宝"></el-option>
                      <el-option label="微信" value="微信"></el-option>
                      <el-option label="建设银行" value="建设银行"></el-option>
                      <el-option label="工商银行" value="工商银行"></el-option>
              </el-select>
          </el-form-item>
          <br>
          <el-form-item label="单据备注">
                <el-input v-model="ruleForm.SsRemark"  placeholder="单据备注"> </el-input>
          </el-form-item>
          <el-form-item label="总计金额(元)">
                <el-input v-model="ruleForm.SsPrice"  style="width: 140px" :disabled="true" placeholder="总计金额"> </el-input>
          </el-form-item>
          <el-form-item label="实收金额(元)">
                <el-input v-model="ruleForm.SsSjMoney"  style="width: 140px" placeholder="实收金额"> </el-input>
          </el-form-item>
          <br>
          <el-form-item >
                <router-link to="/sell"><el-button>返回</el-button></router-link>
                <el-button type="primary" @click="add()">保存审核</el-button>
          </el-form-item>
    </el-form>
    </div>
</div>
</template>

<script>
      import goods from "@/components/ModelLiu/goods";   //不用再index里面引用/父组件使用子组件
      export default {
        components: {
          goods: goods,
        },
        data() {
          return {
              ruleForm: {
                SsWarehouse: '',   //仓库
                SsClient: '',      //客户
                SsHandle: '',      //经手人
                SsDiscount: '',    //折扣率
                SsZkMoney: '',     //折扣金额
                SsFjMoney: '',     //附加金额
                SsMode: '',        //付款方式
                SsPrice:'',       //总计金额
                SsSjMoney:'',     //实收金额
                SsRemark:'',      //单据备注

              },
                datetime: "",    //销售编号日期

                SsCount:'',
                 CargoId: "",
                  SscNumber: "",
                  SscRemark: "",
                  SscSubtotal: "",
                  UnitPice: "",
              options: [],
              sss: [],
              tableData: [],
              y: [],
          };
        },
        methods: {
             async add() {
                var oo = 0;
                var o = {
                  CargoId: "",
                  SscNumber: "",
                  SscRemark: "",
                  SscSubtotal: "",
                  UnitPice: "",
                };
                this.tableData.forEach((items, index) => {
                  this.SsCount=this.SsCount+=Number(items.sscNumber);   //总数量=数量+数量
                  this.ruleForm.SsPrice=this.ruleForm.SsPrice+=Number(items.sscNumber*items.unitPice) ;  //总价格=数量*单价
                  this.SscSubtotal=items.sscSubtotal ;  //小计
                  this.sss = items;
                  let no = index + 1;
                  o.CargoId = items.cargoId;
                  o.SscNumber=Number(items.sscNumber) ;
                  o.SscRemark=items.sscRemark;
                  o.SscSubtotal=Number(items.sscSubtotal);
                  o.UnitPice=Number(items.unitPice);
                  this.y.push(o);
                   oo = oo + 1;
                });
                console.log(this.y);
              console.log(this.tableData);
              this.axios.post( this.$api+"/api/AddSalesSingles",{
                    //给销售表数据添加
                    SsNumber:this.datetime,   //单据编号
                    SsCount:Number(this.SsCount),     //商品总数量
                    SsPrice:Number(this.ruleForm.SsPrice),   //总价格
                    SsSjMoney:Number(this.ruleForm.SsSjMoney),  //实收金额
                    SsRemark:this.ruleForm.SsRemark,   //总备注
                    SsWarehouse:this.ruleForm.SsWarehouse,   //仓库
                    SsClient:this.ruleForm.SsClient,    //客户
                    SsHandle:this.ruleForm.SsHandle,   //经手人
                    SsDrawer:"李四",    //制单人
                    SsMode:this.ruleForm.SsMode,   //结算方式
                    SsFjMoney:Number(this.ruleForm.SsFjMoney),  //附加金额
                    SsZkMoney:Number(this.ruleForm.SsZkMoney),   //折扣金额
                    SsDiscount:Number(this.ruleForm.SsDiscount),   //折扣率
                    ASWId:Number(1),    //店面外键
                    SsAudit:Number(0),   //审核状态
                    QfjCg:Number(1),     //区分键
                    Tui:Number(1),       //增/退区分键
              }).then((res) => {
                 this.axios({
                  method: "post",
                  url:  this.$api+"/api/AddSalesSingleCargo",
                  data:this.y,
                }).then((res) => {
                  this.y = [];
                  if (res.data > 0) {
                    this.$notify({
                        title:'温馨提示:',
                        message:'添加成功',
                    })
                    this.$router.push('/sell');
                  }else{
                     this.$notify({
                        title:'温馨提示:',
                        message:'添加失败',
                    })
                  }
                });
              });
          },
          tableRowClassName({ row, rowIndex }) {
            // 把每一行的索引放进row
            row.index = rowIndex;
          },

          signStatu(item) {
            this.tableData = item;
            console.log(item);
          },

          GetNowtime() {
            var date = new Date();
            var year = date.getFullYear();
            var month = date.getMonth() + 1;
            var day = date.getDate();
            this.datetime =
              "PO" + year + month + day + Math.floor(Math.random() * 10000);
          },


          //反填方法
          Fan()
          {
            this.axios.get( this.$api+"/api/JXiao?id="+this.$route.query.id)
            .then((res)=>{
              this.ruleForm.SsWarehouse=res.data.cname;
              this.ruleForm.SsClient=res.data.kname;
              this.ruleForm.SsHandle=res.data.jname;
            })
          },
          FanH(){
            this.axios.get( this.$api+"/api/Fxan?id="+this.$route.query.id)
            .then((res)=>{
              this.tableData=res.data;
            })
          }
        },
        mounted() {
          this.Fan();
          this.FanH();
          this.GetNowtime();
          //仓库下拉
          this.axios
            .get( this.$api+"/api/SelectWare")
            .then((response) => {
              this.options = response.data;
              console.log("ok");
            })
            .catch(function (error) {
              console.log(error);
            });
        },
      };
</script>