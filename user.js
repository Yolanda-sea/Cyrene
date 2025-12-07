//管理用户数据相关
import { defineStore } from "pinia";
import { loginAPI } from "@/apis/user";
import { ref } from "vue";
import { useCartStore } from "./cartStore";
import { mergecartAPI } from "@/apis/catr";
export const useUserStore = defineStore('user', () => {

  //1.定义管理用户数据的state
  const userInfo = ref({})
  //2.定义获取接口的action函数
  const getuserInfo = async ({ account, password }) => {
    const res = await loginAPI({ account, password })
    userInfo.value = res.result
    //合并购物车的操作
    const cartstore = useCartStore()
    await mergecartAPI(cartstore.cartList.map(item => {
      return {
        skuId: item.skuId,
        selected: item.selected,
        count: item.count
      }
    }))
    cartstore.updateCart()
  }
  const clearuser = () => {
    userInfo.value = {}
    const cartstore = useCartStore()
    cartstore.clearList()
  }
  //3.以对象的格式把state和action return出去
  return {
    userInfo,
    getuserInfo,
    clearuser
  }
},
  {
    persist: true,
  })