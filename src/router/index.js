import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import shou from '@/components/shou'
import XX from '@/components/views/XX'
import XX2 from '@/components/views/XX2'
import XX3 from '@/components/views/XX3'
import sell from '@/components/views/sell'
import sellreturn from '@/components/views/sellreturn'
import receiptPayments from '@/components/ModelGuo/receiptPayments'
import payment from '@/components/ModelGuo/payment'
import SalesSingleShow from '@/components/ModelHan/SalesSingleShow'
import SellCollect from '@/components/ModelHan/SellCollect'
import inven from '@/components/Inventory/InventorySels'
import SLeiBie from '@/components/ModelHan/SLeiBie'
import SShangPin from '@/components/ModelHan/SShangPin'
import SKeHu from '@/components/ModelHan/SKeHu'
import BSalesSingleShow from '@/components/ModelHan/BSalesSingleShow'
import BuyerCollect from '@/components/ModelHan/BuyerCollect'
import BShangPin from '@/components/ModelHan/BShangPin'
import BSupplier from '@/components/ModelHan/BSupplier'


import ClientShow from '@/components/MrYang/ClientShow'
import Client from '@/components/MrYang/Client'
import ClientModify from '@/components/MrYang/ClientModify'
import CustomerClassShow from '@/components/MrYang/CustomerClassShow'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '首页',
      component: shou
    } ,
    {
      path: '/Stock',
      name: '库存',
      component: inven
    } ,
    {
      path: '/sellreturn',
      name: '销售退货申请单',
      component:sellreturn,
    },    
    {
      path: '/zreceipt',
      name: '收款单',
      component:receiptPayments,
    } ,    
    {
      path: '/zpayment',
      name: '付款单',
      component:payment,
    },
    {
      path: '/bdetail',
      name: '销售明细表',
      component:SalesSingleShow,
    },
    {
      path: '/bcollect',
      name: '销售汇总表',
      component:SellCollect,
    },
    {
      path: '/SLeiBie',
      name: '销售汇总表(按类别)',
      component:SLeiBie,
    },
    {
      path: '/SShangPin',
      name: '销售汇总表(按商品)',
      component:SShangPin,
    },
    {
      path: '/SKeHu',
      name: '销售汇总表(按客户)',
      component:SKeHu,
    },
    {
      path: '/zclient',
      name: '客户管理',
      component:ClientShow,
    } ,
    {
      path: '/zclientadd',
      name: '客户管理添加页面',
      component:Client,
    } ,
    {
      path: '/zclientmodify',
      name: '客户管理修改页面',
      component:ClientModify,
    } ,
    {
      path: '/zclassify',
      name: '客户分类',
      component:CustomerClassShow,
    },
    {
      path: '/bprocurement',
      name: '采购明细表',
      component:BSalesSingleShow,
    },
    {
      path: '/BuyerCollect',
      name: '采购汇总表',
      component:BuyerCollect,
    },
    {
      path: '/BShangPin',
      name: '采购汇总表(按商品)',
      component:BShangPin,
    },
    {
      path: '/BSupplier',
      name: '销售汇总表(按供应商)',
      component:BSupplier,
    },

    

  ]
})
