import Vue from 'vue'
import App from './App.vue'
import './assets/statics/site/css/style.css'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import axios from 'axios'
import moment from 'moment'
Vue.prototype.$axios=axios
axios.defaults.baseURL = 'http://111.230.232.110:8899/'
// 设置全局过滤器
Vue.filter("formatTime-g", function(value,formatTpl){
  if (formatTpl) {
    return moment(value).format(formatTpl)
    
  }else{
    return moment(value).format('MM-DD-YYYY')
  }
})

Vue.config.productionTip = false;
//导入组件
import index from "./components/index.vue"
import shoppingcar from "./components/shoppingcar.vue"
import details from "./components/details.vue"
let routes= [
  {path:'/index',component:index},
  {path:'/',component:index},
  {path:'/shoppingcar',component:shoppingcar},
  {path:'/details/:id',component:details},
  
];
let router=new VueRouter({
  routes
})


new Vue({
  el:'#app',
  render: h => h(App),
  router
})
