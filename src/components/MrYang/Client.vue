<template>
  <div>
    <span style="marginleft: 3%; margintop: 20%">基础数据</span>
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <table>
        <tr>
          <td>
            <el-form-item label="客户代码">
              <el-input v-model="ruleForm.clientSnumber"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item
              label="客户名称"
              prop="clientSname"
            >
              <el-input v-model="ruleForm.clientSname"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item label="默认仓库">
              <el-cascader
                :v-model="ruleForm.aswid"
                :options="options"
                :props="{ expandTrigger: 'hover' }"
                @change="handleChange"
              ></el-cascader>
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
                  :value="item.cgradeId"
                >
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
                  :value="item.lclientId"
                >
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
                  :value="item.ccsid"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </td>
        </tr>
        <tr>
          <td>
            <el-form-item class="por" label="详细地址">
              <el-input
                style="width: 395%"
                v-model="ruleForm.clientSaddress"
              ></el-input>
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
              <el-input
                style="width: 250%"
                v-model="ruleForm.clientSremark"
              ></el-input>
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
                inactive-value="0"
              >
              </el-switch>
            </el-tooltip>
          </el-form-item>
        </tr>
      </table>
      <span style="marginleft: 3%; margintop: 20%">联系人信息</span>
      <table>
        <tr>
          <td>
            <el-form-item label="姓名" prop="clientSlinkman">
              <el-input v-model="ruleForm.clientSlinkman"></el-input>
            </el-form-item>
          </td>
          <td>
            <el-form-item prop="clientSphone" label="手机号">
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
            <el-form-item label="E-mail"
            prop="clientSemail"
            :rules="[
      { required: true, message: '请输入邮箱地址', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] }
    ]"
            >
              <el-input v-model="ruleForm.clientSemail"></el-input>
            </el-form-item>
          </td>
        </tr>
      </table>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >立即添加</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data() {
    var checkphone = (rule, value, callback) => {
		      // let phoneReg = /(^1[3|4|5|6|7|8|9]\d{9}$)|(^09\d{8}$)/;
		      if (value == "") {
		        callback(new Error("请输入手机号"));
		      } else if (!this.isCellPhone(value)) {//引入methods中封装的检查手机格式的方法
		        callback(new Error("请输入正确的手机号!"));
		      } else {
		        callback();
		      }
		    };
    return {
      options: [],
      optio: [],
      opti: [],
      opn: [],
      ruleForm: {
        clientSnumber: "",
        clientSname: "",
        aswid: "",
        cgradeId: "",
        lclientId: "",
        ccsid: "",
        clientSaddress: "",
        postcode: "",
        clientSremark: "",
        clientSstate: "1",
        clientSlinkman: "",
        clientSphone: "",
        clientSpost: "",
        clientSemail: "",
      },
      rules: {
          clientSname: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          clientSlinkman: [
            { required: true, message: '请输入联系人', trigger: 'blur' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
          ],
          clientSphone: [{ required: true, validator: checkphone, trigger: "blur" }],//validator: checkphone是验证手机的引入checkphone函数    
        }
    };
  },
  mounted() {
    //仓库下拉
    this.axios
      .get(this.$api + "/api/SelectWare")
      .then((response) => {
        this.options = response.data;
        console.log("ok");
      })
      .catch(function (error) {
        console.log(error);
      }),
      //客户级别
      this.axios
        .get(this.$api + "/api/ClientGradeSelect")
        .then((response) => {
          this.opn = response.data;
          console.log("ok");
        })
        .catch(function (error) {
          console.log(error);
        });
    //客户标签
    this.axios
      .get(this.$api + "/api/LableClientSelct")
      .then((response) => {
        this.optio = response.data;
        console.log("ok");
      })
      .catch(function (error) {
        console.log(error);
      });
    //客户分类
    this.axios
      .get(this.$api + "/api/ClientClassifySupp")
      .then((response) => {
        this.opti = response.data;
        console.log("ok");
      })
      .catch(function (error) {
        console.log(error);
      });
  },

  methods: {
    //检查手机号
	isCellPhone(val) {
	      if (!/^1(3|4|5|6|7|8)\d{9}$/.test(val)) {
	        return false;
	      } else {
	        return true;
	      }
	    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post(this.$api + "/api/ClientSupplierAdd", {
            clientSnumber: this.ruleForm.clientSnumber,
            clientSname: this.ruleForm.clientSname,
            aswid: Number(this.ruleForm.aswid),
            cgradeId: Number(this.ruleForm.cgradeId),
            lclientId: Number(this.ruleForm.lclientId),
            ccsid: Number(this.ruleForm.ccsid),
            clientSaddress: this.ruleForm.clientSaddress,
            postcode: this.ruleForm.postcode,
            clientSremark: this.ruleForm.clientSremark,
            clientSstate: Number(this.ruleForm.clientSstate),
            clientSlinkman: this.ruleForm.clientSlinkman,
            clientSphone: this.ruleForm.clientSphone,
            clientSpost: this.ruleForm.clientSpost,
            clientSemail: this.ruleForm.clientSemail,
          });
          this.$alert("添加成功", "消息", {
            confirmButtonText: "确定",
            callback: (action) => {
              this.$router.push("/zclient");
            },
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
<style>
</style>