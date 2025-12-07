import httpInstance from "@/utils/http"


//获取详情模块
export const getcheckOutAPI = () => {
  return httpInstance({
    url: '/member/order/pre'
  })
}

//创建订单
export const createOrderAPI = (data) => {
  return httpInstance({
    url: '/member/order',
    method: 'POST',
    data
  })
}