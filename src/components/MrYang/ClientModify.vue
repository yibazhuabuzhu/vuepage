<template>
    <div>
      <span style="marginLeft:3%;margintop:20%">基础数据</span>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <table>
        <tr>
          <td>
            <el-form-item label="客户代码">
            <el-input v-model="ruleForm.clientSnumber"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="客户名称" prop="name">
            <el-input v-model="ruleForm.clientSname"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="默认仓库">
            <el-cascader
              :v-model="ruleForm.aswid"
              :options="options"
              :props="{ expandTrigger: 'hover' }"
              @change="handleChange"></el-cascader>
             </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="客户级别">
            <el-select v-model="ruleForm.cgradeId" placeholder="请选择">
            <el-option
              v-for="item in opn"
              :key="item.value"
              :label="item.cgradeName"
              :value="item.cgradeId">
            </el-option>
             </el-select>
             </el-form-item>
          </td>
          <td>
            <el-form-item label="客户标签">
            <el-select v-model="ruleForm.lclientId" placeholder="请选择">
            <el-option
              v-for="item in optio"
              :key="item.value"
              :label="item.lclientName"
              :value="item.lclientId">
            </el-option>
             </el-select>
             </el-form-item>
          </td>
          <td>
            <el-form-item label="客户分类">
            <el-select v-model="ruleForm.ccsid" placeholder="请选择">
            <el-option
              v-for="item in opti"
              :key="item.value"
              :label="item.ccsname"
              :value="item.ccsid">
            </el-option>
             </el-select>
             </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
              <el-form-item  class="por" label="详细地址">
            <el-input style="width:395%" v-model="ruleForm.clientSaddress"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="邮编">
            <el-input v-model="ruleForm.postcode"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="备注信息">
            <el-input style="width:250%" v-model="ruleForm.clientSremark"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <el-form-item label="客户状态">
          <el-tooltip :content="'Switch value: ' + value" placement="top">
  <el-switch
    v-model="ruleForm.clientSstate"
    active-color="#13ce66"
    active-value="1"
    inactive-color="#ff4949"
    inactive-value="0">
  </el-switch>
</el-tooltip>
          </el-form-item>
        </tr>
      </table>
      <span style="marginLeft:3%;marginTop:20%">联系人信息</span>
      <table>
        <tr>
          <td>
            <el-form-item label="姓名">
            <el-input v-model="ruleForm.clientSlinkman"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="手机号">
            <el-input v-model="ruleForm.clientSphone"></el-input>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item label="职位">
            <el-input v-model="ruleForm.clientSpost"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="E-mail">
            <el-input v-model="ruleForm.clientSemail"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>
       <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即添加</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
      </el-form>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        options:[],
        optio:[],
        opti:[],
        opn:[],
        ruleForm: {
         clientSnumber:'',
          clientSname:'',
          aswid:'',
          cgradeId:'',
          lclientId:'',
          ccsid:'',
          clientSaddress:'',
          postcode:'',
          clientSremark:'',
          clientSstate:'1',
          clientSlinkman:'',
          clientSphone:'',
          clientSpost:'',
          clientSemail:'',
        },
      };
    },
    mounted(){
        this.axios.get(this.$api+'/api/clientSupplierByid?id='+this.$route.query.id).then((res)=>{
            this.ruleForm.clientSnumber=res.data.clientSnumber
            this.ruleForm.clientSname=res.data.clientSname
            this.ruleForm.cgradeId=res.data.cgradeId
            this.ruleForm.lclientId=res.data.lclientId
            this.ruleForm.ccsid=res.data.ccsid
            this.ruleForm.clientSaddress=res.data.clientSaddress
            this.ruleForm.postcode=res.data.postcode
            this.ruleForm.clientSremark=res.data.clientSremark
            this.ruleForm.clientSstate=res.data.clientSstate
            this.ruleForm.clientSlinkman=res.data.clientSlinkman
            this.ruleForm.clientSphone=res.data.clientSphone
            this.ruleForm.clientSpost=res.data.clientSpost
            this.ruleForm.clientSemail=res.data.clientSemail
          })
        //仓库下拉
        this.axios.get(this.$api+'/api/SelectWare')
        .then(response=>{
          this.options=response.data;
            console.log('ok')
        })
        .catch(function(error){
            console.log(error);
          }),
           //客户级别
        this.axios.get(this.$api+'/api/ClientGradeSelect')
        .then(response=>{
          this.opn=response.data;
            console.log('ok')
        })
        .catch(function(error){
            console.log(error);
          })
           //客户标签
        this.axios.get(this.$api+'/api/LableClientSelct')
        .then(response=>{
          this.optio=response.data;
            console.log('ok')
        })
        .catch(function(error){
            console.log(error);
          })
           //客户分类
        this.axios.get(this.$api+'/api/ClientClassifySupp')
        .then(response=>{
          this.opti=response.data;
            console.log('ok')
        })
        .catch(function(error){
            console.log(error);
          })
        
      },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.axios.post(this.$api+"/api/clientSuppUpt",{
                clientSid:this.$route.query.id,
                clientSnumber:this.ruleForm.clientSnumber,
                clientSname:this.ruleForm.clientSname,
                aswid:Number(this.ruleForm.aswid),
                cgradeId:Number(this.ruleForm.cgradeId),
                lclientId:Number(this.ruleForm.lclientId),
                ccsid:Number(this.ruleForm.ccsid),
                clientSaddress:this.ruleForm.clientSaddress,
                postcode:this.ruleForm.postcode,
                clientSremark:this.ruleForm.clientSremark,
                clientSstate:Number(this.ruleForm.clientSstate),
                clientSlinkman:this.ruleForm.clientSlinkman,
                clientSphone:this.ruleForm.clientSphone,
                clientSpost:this.ruleForm.clientSpost,
                clientSemail:this.ruleForm.clientSemail,
            })
            this.$alert('添加成功','消息',{
                  confirmButtonText:'确定',
                  callback:action=>{
                    this.$router.push('/zclient');
                  }
                })
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
      
    }
    
  }
  
</script>