import Vue from 'vue';
import Router from 'vue-router';
// 导入组件，所有的import 都应该在文件最上面
import Login from '@/views/Login';
import Home from '@/views/Home';
import Users from '@/views/users/Users';
import Rights from '@/views/rights/Rights';
import Roles from '@/views/rights/Roles';
import Categories from '@/views/goods/Categories';
import Goods from '@/views/goods/Goods';
import GoodsAdd from '@/views/goods/GoodsAdd';
import Params from '@/views/goods/Params';
import Orders from '@/views/orders/Orders';
import Reports from '@/views/reports/Reports';

// 导入message
import { Message } from 'element-ui';

// @ 代表的是src的绝对路径
// @ 是在build/webpack.base.conf.js

// 为什么可以省略.vue  在build/webpack.base.conf.js 中配置了
// 模块省略后缀之后，加载的顺序  extensions: ['.js', '.vue', '.json'],
// import HelloWorld from '@/components/HelloWorld';

Vue.use(Router);

const router = new Router({
  routes: [
    { name: 'Login', path: '/login', component: Login },
    {
      name: 'Home',
      path: '/',
      component: Home,
      children: [
        { name: 'users', path: '/users', component: Users },
        { name: 'rights', path: '/rights', component: Rights },
        { name: 'roles', path: '/roles', component: Roles },
        { name: 'categories', path: '/categories', component: Categories },
        { name: 'goods', path: '/goods', component: Goods },
        { name: 'goodsadd', path: '/goods/add', component: GoodsAdd },
        { name: 'params', path: '/params', component: Params },
        { name: 'orders', path: '/orders', component: Orders },
        { name: 'reports', path: '/reports', component: Reports }
      ]
    }
  ]
});

// 路由的全局前置守卫 （拦截器）  -- 路由跳转之前执行
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(from);
  // next();
  // 如果是登录的时候不判断token ，不是登录才判断token
  // console.log(to);
  if (to.name && to.name.toLocaleLowerCase() !== 'login') {
    // 判断token
    const token = sessionStorage.getItem('token');
    if (!token) {
      // 没有token,跳转到登录页面
      // this.$router.push('/login')
      router.push('/login');
      // 提示
      // this.$message.warning('请先登录');
      Message.warning('请先登录');
      return;
    }
  }
  next();
});

export default router;
