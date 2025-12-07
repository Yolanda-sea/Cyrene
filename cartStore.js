//封装购物车模块
import { defineStore } from "pinia";
import { ref } from "vue";
import { computed } from "vue";
import { useUserStore } from "./user";
import { FindNewCartAPI, InsertCartAPI, } from "@/apis/catr";
import { delCartAPI } from "@/apis/catr";

export const useCartStore = defineStore('cart', () => {
  const usestore = useUserStore()
  const islogin = usestore.userInfo.token
  //1.定义state-cartList
  const cartList = ref([])
  //2.定义acction-addcart
  const addCart = async (goods) => {
    const { skuId, count } = goods
    if (islogin) {
      //登陆之后的加入购物车逻辑
      await InsertCartAPI({ skuId, count })
      updateCart()
    } else {
      //添加购物车操作
      //已经添加 count+1
      //没有添加 直接push
      //思路:通过匹配传递过来的商品对象中的skuId能不能在Cartlist中找到,找到了就是添加过
      const item = cartList.value.find((item) => goods.skuId === item.skuId)
      if (item) {
        item.count++
      } else {
        cartList.value.push(goods)
      }
    }
  }

  //删除购物车
  const delCart = async (skuId) => {
    if (usestore.userInfo.token) {
      //调用接口实现接口购物车删除功能
      await delCartAPI([skuId])
      updateCart()
    } else {
      //思路:
      //1.找到要删除的下标值 splice
      //2.使用数组的过滤 filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }
  }

  //清除购物车
  const clearList = () => {
    cartList.value = []
  }

  //获取最新购物车列表函数action
  const updateCart = async () => {
    const res = await FindNewCartAPI()
    cartList.value = res.result
  }


  //单选功能
  const singleCheck = (skuId, selected) => {
    //通过skuId找到要修改的哪一项 把他的skuId修改成传过来的selected
    const item = cartList.value.find((item) => item.skuId === skuId)
    if (item) {
      item.selected = selected
    }
  }

  //全选功能
  const allcheck = (selected) => {
    cartList.value.forEach((item) => item.selected = selected)
  }

  //计算属性
  //1.计算商品总个数
  const allcount = computed(() => cartList.value.reduce((a, c) => a + c.count, 0))
  //2.计算商品总价格
  const allprice = computed(() => cartList.value.reduce((a, c) => a + c.count * c.price, 0))
  //3.已选择数量
  const selectedCount = computed(() => cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count, 0))
  //4.已选择商品合计
  const selectedPrice = computed(() => cartList.value.filter((item) => item.selected).reduce((a, c) => a + c.count * c.price, 0))
  //是否全选
  const isAll = computed(() => cartList.value.every((item) => item.selected))
  return {
    allcount,
    allprice,
    cartList,
    isAll,
    selectedCount,
    selectedPrice,
    updateCart,
    clearList,
    allcheck,
    addCart,
    delCart,
    singleCheck
  }
}, {
  persist: true
})