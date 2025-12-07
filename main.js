import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

//引入初始化样式文件
import '@/styles/common.scss'
import { useIntersectionObserver } from '@vueuse/core'
//引入全局组件插件
import { componentPlugin } from './components'

//测试接口函数
import { getCategory } from '@/apis/testAPI'
getCategory().then(res => {
  console.log(res);
})

import { Logger } from 'sass'

const app = createApp(App)
const pinia = createPinia()
//注册持久化插件
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(componentPlugin)
app.mount('#app')


//定义全局指令 一会删
app.directive('img-lazy', {
  mounted(el, binding) {
    //el 指令绑定的那个元素  这里指img
    //binding binding.value指令等号后面绑定的表达式的值 这里指url
    console.log(el, binding)
    const { stop } = useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        console.log(isIntersecting)
        if (isIntersecting) {
          el.src = binding.value
          stop()
        }
      },
    )
  }
})