<template>
<div>
<el-button type="text" size="small" @click="upt()">编辑</el-button>
<el-dialog
  title="修改单位"
  :modal="false"
  :visible.sync="dialogFormVisible">
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
  <table style="marginLeft:5%">
    <tr>
      <td></td>
      <td>
        <el-form-item  label="单位名称"
        prop="unitName"
        :rules="[
      { required: true, message: '请输入单位名称', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
    ]"
        >
        <el-input v-model="ruleForm.unitName" placeholder="请输入名称"></el-input>
         </el-form-item>
      </td>
    </tr>
    <tr>
        <td>
            <el-checkbox v-model="ruleForm.checked">允许小数</el-checkbox>
        </td>
    </tr>
  </table>
   </el-form>
   <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
  </div>
</el-dialog>
</div>
 
</template>
<script>
  export default {
    data() {
      return {
        dialogVisible: false,
        reload: this.reload,
        dialogTableVisible: false,
        dialogFormVisible: false,
        di:this.id,
       ruleForm:{
           checked:false,
            unitName:''
        }
      };
    },
    props:{
        id:{
            type:Number,
            Request:true
        }
    },
    methods: {
    async upt(ss)
    {
        this.dialogFormVisible =true,
        await this.axios.get(this.$api+"/api/UnitSelctById?id="+this.di).then((res)=>{
            this.ruleForm.unitName=res.data.unitName
            this.ruleForm.checked=res.data.unitDecimals
        })
    },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
           this.axios.post(this.$api+"/api/UnitUpt",{
                unitId:this.di,
                unitName:this.ruleForm.unitName,
                unitDecimals:this.ruleForm.checked
            })
            this.$message({
                    message: '修改成功',
                   type: 'success',
                })
                this.dialogVisible =false,
            location.reload()
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      
    }
  };
</script>