//封装category业务相关的逻辑代码
import { ref, onMounted } from "vue"
import { useRoute } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';
import { getcaidanAPI } from '@/apis/category';
export function useCategory() {
  const categoryData = ref([])
  const route = useRoute()
  //如果下面getcategory(to.params.id)传过来参数 就是新的路由 如果没传就是默认
  const getcategory = async (id = route.params.id) => {
    const res = await getcaidanAPI(id)
    categoryData.value = res.result
  }
  onMounted(() => getcategory())

  //目标：路由参数变化时 可以把分类数据接口重新发送 而不用动banner
  onBeforeRouteUpdate((to) => {
    console.log("路由变化了")
    //存在问题：使用最新的路由参数请求最新的分类数据
    getcategory(to.params.id)
  })
  return {
    categoryData
  }
}