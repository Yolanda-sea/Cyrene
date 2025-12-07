// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
// 导入首页组件（如果没有这个文件，先在 src/views 下创建 HomeView.vue）

import Login from '@/views/Login/index.vue'
import Layout from '@/views/Layout/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import subCategoory from '@/views/subCategory/index.vue'
import Details from '@/views/Details/index.vue'
import CartList from '@/views/CartList/index.vue'
import checkOut from '@/views/checkOut/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          //默认渲染页就置空，访问/时候默认组件也会得到渲染
          component: Home
        },
        {
          path: 'Category/:id',
          component: Category
        },
        {
          path: 'Category/sub/:id',
          component: subCategoory
        },
        {
          path: 'detail/:id',
          component: Details
        },
        {
          path: 'cartlist',
          component: CartList
        },
        {
          path: 'checkout',
          component: checkOut
        },
        {
          path: 'pay',
          component: Pay
        },
        {
          path: 'paycallback',
          component: PayBack
        },
        {
          path: 'member',
          component: Member,
          children: [{
            path: '',
            component: UserInfo
          },
          {
            path: 'order',
            component: UserOrder
          }
          ]
        }
      ]
    },
    {
      path: '/Login',
      component: Login
    }
  ],
  //路由滚动行为定制
  scrollBehavior() {
    return {
      top: 0
    }
  }
})



export default router
